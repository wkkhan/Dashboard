# Essaly Merchant Dashboard – Frontend Plan

## Goals & Constraints
- Deliver a responsive merchant-facing dashboard that surfaces real-time business data, webhooks health, and management tooling.
- Integrate with the existing Essaly backend over REST APIs, using JWT access + refresh tokens.
- Support multi-merchant users with seamless context switching.
- Use React 19 with plain CSS, leveraging Bootstrap for layout and components while allowing custom styling for brand alignment.

## Technology Stack
- **Runtime & Build**: Vite, React 19, TypeScript.
- **Routing**: `react-router-dom` for nested routes and protected areas.
- **Data Fetching & Caching**: `@tanstack/react-query` for REST integration, cache invalidation, and background refresh.
- **HTTP Client**: Axios instance configured with interceptors to inject auth headers and handle refresh flows.
- **State Management**: React Query + lightweight context providers (auth, active merchant, UI preferences).
- **Styling**: Bootstrap (installed via npm) + scoped plain CSS modules/utility classes; central theme variables in `src/styles/`.
- **Charts & Data Viz**: Recharts or Victory for KPI visualizations (select when implementing overview dashboard).
- **Forms & Validation**: React Hook Form + Zod for schema validation (optional but recommended).

## Project Structure
```
src/
  app/
    App.tsx                # App shell & router host
    routes.tsx             # Route definitions and lazy imports
    providers/             # Query client, auth, theming providers
    layout/
      AppLayout.tsx        # Protected layout with nav + merchant switcher
      PublicLayout.tsx
  features/
    auth/
      api/
        auth.api.ts        # login/logout/refresh calls
      components/
        LoginForm.tsx
        LogoutButton.tsx
      hooks/
        useAuth.ts
      utils/
        tokenStorage.ts
    merchants/
      api/
        merchants.api.ts   # fetch merchants, switch contexts
      components/
        MerchantSwitcher.tsx
      hooks/
        useActiveMerchant.ts
    dashboard/
      api/
        dashboard.api.ts   # summary metrics, charts
      components/
        KPIGroup.tsx
        TrendChart.tsx
    transactions/
      api/
        transactions.api.ts
      components/
        TransactionTable.tsx
        TransactionDrawer.tsx
      hooks/
        useTransactionFilters.ts
    reports/
      api/
        reports.api.ts
      components/
        ReportSchedulerForm.tsx
    webhooks/
      api/
        webhooks.api.ts
      components/
        WebhookStatusTable.tsx
    settings/
      components/
        ProfileForm.tsx
        PreferencesForm.tsx
  shared/
    components/
      LoadingState.tsx
      ErrorState.tsx
      DataCard.tsx
      Modal.tsx
      Toast.tsx
    hooks/
      usePolling.ts
      useToast.ts
    services/
      httpClient.ts        # fetch wrapper with interceptors
      queryKeys.ts         # central cache keys
    utils/
      formatters.ts        # currency/date helpers
      constants.ts
  lib/
    config.ts              # env vars, API base URL
    auth.ts                # token helpers, refresh workflow
    guards.tsx             # route guards (RequireAuth, RequireMerchant)
  styles/
    bootstrap-overrides.css
    globals.css
  main.tsx
public/
  index.html
```

## Authentication & Session Flow
- Store access tokens in memory (React state) and persist refresh tokens via HTTP-only cookies (preferred) or secure storage per backend contract.
- On app init, run `bootstrapAuth()`:
  1. Attempt refresh token exchange to obtain new access token.
  2. Fetch user profile and merchant assignments.
  3. Restore previously selected merchant (from local storage) if still valid.
- Provide `RequireAuth` route guard that redirects to `/login` when unauthenticated.
- Handle token expiration by intercepting 401 responses, triggering a refresh flow; logout user if refresh fails.
- Offer manual logout and automatic invalidation on suspicious activity (e.g., concurrent session detection if backend supports).

## Merchant Switching
- Maintain active merchant ID in context + React Query key namespace to scope cached data.
- On switch:
  1. Update active merchant context.
  2. Persist selection to local storage for continuity.
  3. Invalidate queries tied to previous merchant to refetch data.
- Update `httpClient` to inject `X-Merchant-ID` (or equivalent header) when present.

## Feature Breakdown
- **Auth & Onboarding**: Login page, forgot password link (if backend provides), onboarding checklist for new merchants.
- **Overview Dashboard**: KPI cards (orders, revenue, avg order value), trend charts (daily/weekly), top products, recent activity feed.
- **Transactions Explorer**: Table with search, date/status filters, pagination, export to CSV; detail drawer showing order payload and receipt.
- **Reports**: Pre-built report list, generation/download actions, scheduled report setup UI (phase 2 priority).
- **Webhooks Health**: Delivery log table, status badges, retry action, failure rate chart, guidance for troubleshooting.
- **Settings**: User profile, password update, notification preferences, merchant branding options, API keys display/regenerate.
- **Notifications & Alerts**: Toasts for inline feedback; notification center for webhook failures or data anomalies.

## Real-Time & Data Freshness
- Begin with smart polling via React Query (`refetchInterval` tuned per endpoint, e.g., 30s for dashboard metrics, 10s for webhook incidents).
- Expose helper hook `usePolling` to abstract jitter, pause on tab hidden, and manual refresh.
- Prepare interfaces for future SSE/WebSocket integration without major refactors (e.g., central event bus).

## Error Handling & UX
- Global error boundary for catastrophic failures.
- Consistent inline empty/loading/error states via shared components.
- Toast notifications for transient success/failure messages; modal dialogs for destructive actions.
- Logging: client-side event logger to capture API errors with merchant context for support diagnostics.

## Styling Strategy
- Install Bootstrap (`npm install bootstrap`) and import base CSS in `main.tsx`.
- Maintain overrides in `bootstrap-overrides.css` for brand colors, typography, button variants.
- Use CSS modules or scoped styles per component for custom layouts; share variables through `globals.css`.
- Ensure responsive breakpoints align with merchant device usage (desktop-first, degrade gracefully to tablet/mobile).

## API Integration
- Define central Axios instance (`httpClient`) with:
  - Automatic base URL and default timeouts.
  - Request interceptors for auth header injection and merchant context headers.
  - Response interceptors for error normalization and refresh token flow.
  - Optional retry helper for idempotent GETs (limited attempts).
- Organize per-feature API modules that return typed promises and expose React Query hooks, e.g., `useDashboardSummary()`, `useTransactions(params)`.
- Document REST endpoints consumed, expected payloads, and query parameters under `docs/api-contract.md` (future task).

## Testing Strategy
- **Unit Tests**: Vitest + Testing Library for components, hooks, and utils.
- **Integration Tests**: Component-level tests simulating common flows (login, merchant switch, transaction filters).
- **E2E (Phase 3+)**: Playwright or Cypress targeting staging environment with mocked backend.
- Include contract tests for API client using MSW to mock REST responses.
- Add linting (`eslint`) and formatting (Prettier optional) integrated into CI.

## Delivery Phases
1. **Foundation**: Bootstrap install, global styles, router, layouts, auth context, login flow, merchant switcher stub.
2. **Data Layer**: API client scaffolding, React Query providers, fetch merchants and dashboard summary, seed sample components.
3. **Core Dashboards**: Overview page with metrics and charts, transactions table with filters and detail view.
4. **Supporting Tools**: Reports interface, webhook monitoring, settings pages, notification center.
5. **Polish & Real-Time Enhancements**: Optimize polling, add manual refresh controls, performance tuning, accessibility review.
6. **Hardening & Launch**: QA, documentation updates, deploy pipeline verification, user acceptance.

## Documentation & Collaboration
- Maintain `/docs/` directory for API contracts, UX flows, and release notes.
- Use GitHub issues or Linear for backlog tracking aligned to delivery phases.
- Document environment variables (`.env.example`) and backend URL requirements.
- Provide onboarding guide for new contributors (tooling, scripts, coding standards).

## Next Steps
1. Install base dependencies (`react-router-dom`, `@tanstack/react-query`, `axios`, `bootstrap`, optional `react-hook-form`, `zod`).
2. Scaffold providers (`QueryClientProvider`, `AuthProvider`, `MerchantProvider`) and global styles import.
3. Implement login screen and authenticated layout to unlock feature development.
