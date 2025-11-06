# Merchant Dashboard Auth Overview

This document captures the backend changes required for merchant dashboard access and the contract you can share with the frontend team.

## Domain Changes

### Schema

`MerchantUser` now stores richer profile and security state:

| Field | Type | Notes |
| ----- | ---- | ----- |
| `email` | `string` | lowercased, unique login identifier |
| `passwordHash` | `string` | Argon2id hash |
| `firstName` / `lastName` | `string` | optional display name pieces |
| `isActive` / `isLocked` | `boolean` | lockout handling (locked after 5 failed logins) |
| `failedLoginAttempts` | `number` | incremented on failed login |
| `lastLoginAt` | `Date` | refreshed on successful login |
| `tokenVersion` | `number` | incremented on logout/forced revocation |
| `assignments[]` | `Array` | `{ merchantId, role, invitedBy?, createdAt }` |

### Passwords

All merchant passwords are hashed with Argon2id (`memoryCost=19456`, `timeCost=2`, `parallelism=1`). Hash and verify utilities live in `src/shared/utils/password.util.ts`.

### Token Strategy

- Access tokens: `aud = 'merchant'`, include `{ sub, email, merchantId, role, tokenVersion }`.
- Refresh tokens: same payload + longer expiry, rotated on every refresh/switch/login.
- `tokenVersion` is checked on refresh/access validation; incrementing it forces log out on all sessions.

## Environment Variables

Add these (values shown are development defaults):

```env
JWT_MERCHANT_ACCESS_SECRET=...
JWT_MERCHANT_ACCESS_EXPIRES_IN=30m
JWT_MERCHANT_REFRESH_SECRET=...
JWT_MERCHANT_REFRESH_EXPIRES_IN=14d
MERCHANT_ALLOWED_ORIGINS=https://dashboard.myapp.com,https://dashboard-staging.myapp.com
```

`MERCHANT_ALLOWED_ORIGINS` controls credentialed CORS for the browser dashboard.

## HTTP Endpoints

All endpoints live under `/auth/merchant`. Responses follow the `ApiResponse<T>` envelope.

### 1. `POST /auth/merchant/login`

Authenticates via email/password.

**Body**

```json
{
  "email": "admin@example.com",
  "password": "P@ssw0rd!"
}
```

**Success Response (`200`)**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "66e4...",
      "email": "admin@example.com",
      "firstName": "Sara",
      "lastName": "Merchant",
      "isActive": true,
      "lastLoginAt": "2024-10-02T08:15:30.123Z",
      "assignments": [
        {
          "merchantId": "66e4...",
          "role": "owner",
          "invitedBy": null,
          "createdAt": "2024-08-01T12:00:00.000Z"
        }
      ]
    },
    "assignments": [...],
    "assignment": {
      "merchantId": "66e4...",
      "role": "owner"
    },
    "merchants": {
      "66e4...": {
        "id": "66e4...",
        "name": "Coffee Corner",
        "status": "partner",
        "logoUrl": "https://cdn.example.com/logos/coffee-corner.png",
        "category": "Cafe"
      }
    },
    "accessToken": "<JWT access token>",
    "refreshToken": "<JWT refresh token>",
    "needsMerchantSelection": false
  }
}
```

- A secure, httpOnly cookie `merchant_refresh_token` (SameSite=Lax dev / None prod) is set alongside the response.
- `needsMerchantSelection` is `true` if the user has multiple assignments; the client should then call `GET /assignments` and present a picker, followed by `POST /switch`.

**Rate limit**: 5 attempts per minute per IP.

### 2. `POST /auth/merchant/refresh`

Rotates access/refresh tokens. The refresh token is read from the cookie but a `{"refreshToken": "..."}` body fallback is accepted.

**Success Response**

Same structure as login without `needsMerchantSelection`.

- `merchants` map is always returned so the UI can display names/logos without another request.

**Rate limit**: 10 per minute per IP.

### 3. `POST /auth/merchant/switch`

Switches the active merchant assignment and issues fresh tokens.

**Headers**: `Authorization: Bearer <access token>`

**Body**

```json
{ "merchantId": "66e4..." }
```

**Response**: Same as refresh. Refresh cookie is rotated.

### 4. `GET /auth/merchant/assignments`

Returns the user profile, all assignments, and the currently active assignment.

**Headers**: `Authorization: Bearer <access token>`

```json
{
  "success": true,
  "data": {
    "user": { ... },
    "assignments": [...],
    "activeAssignment": { "merchantId": "66e4...", "role": "owner" },
    "merchants": {
      "66e4...": {
        "id": "66e4...",
        "name": "Coffee Corner",
        "status": "partner",
        "logoUrl": "https://cdn.example.com/logos/coffee-corner.png",
        "category": "Cafe"
      }
    }
  }
}
```

### 5. `POST /auth/merchant/logout`

Clears the refresh cookie and increments `tokenVersion`, invalidating all existing tokens.

**Headers**: `Authorization: Bearer <access token>`

```json
{
  "success": true,
  "data": { "loggedOut": true }
}
```

**Rate limit**: 20 per minute per IP.

## Frontend Notes

- All requests must include `credentials: 'include'` so the refresh cookie travels across domains.
- Access token is still Bearer-auth in headers for protected routes. The frontend should store it in memory and refresh upon 401s.
- When `needsMerchantSelection` is true, show a merchant picker using the `merchants` map for display metadata; after selecting, call `/switch` with the desired `merchantId`.
- Handle logout by calling `/logout`; afterwards clear any locally stored tokens and redirect to the login screen.
- If the backend returns 401 with message `Merchant token revoked`, force re-login—the tokenVersion check rejected the token (e.g., after logout in another tab).

## Migration Steps

1. Update the secrets and CORS env vars in each environment.
2. Recreate or migrate existing merchant user passwords to Argon2id hashes (old PBKDF2 hashes will fail verification).
3. Deploy backend + env changes.
4. Update the dashboard frontend to follow the endpoint contract and cookie-based refresh policy.
