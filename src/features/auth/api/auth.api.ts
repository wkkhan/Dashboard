import httpClient from '../../../shared/services/httpClient';

export type MerchantAssignment = {
  merchantId: string;
  role: string;
  invitedBy?: string | null;
  createdAt: string;
};

export type MerchantProfile = {
  id: string;
  name: string;
  status?: string | null;
  logoUrl?: string | null;
  category?: string | null;
};

export type MerchantUser = {
  _id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  isActive: boolean;
  lastLoginAt?: string | null;
  isLocked?: boolean;
  failedLoginAttempts?: number;
};

export type AuthSessionPayload = {
  user: MerchantUser;
  assignments: MerchantAssignment[];
  assignment: MerchantAssignment | null;
  merchants: Record<string, MerchantProfile>;
  accessToken: string;
  refreshToken: string;
  needsMerchantSelection?: boolean;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

type LoginRequest = {
  email: string;
  password: string;
};

type SwitchMerchantRequest = {
  merchantId: string;
};

export async function login(payload: LoginRequest) {
  const response = await httpClient.post<ApiResponse<AuthSessionPayload>>(
    '/auth/merchant/login',
    payload
  );

  return response.data.data;
}

export async function refreshSession(refreshToken?: string) {
  const response = await httpClient.post<ApiResponse<AuthSessionPayload>>(
    '/auth/merchant/refresh',
    refreshToken ? { refreshToken } : undefined
  );

  return response.data.data;
}

export async function switchMerchant(payload: SwitchMerchantRequest) {
  const response = await httpClient.post<ApiResponse<AuthSessionPayload>>(
    '/auth/merchant/switch',
    payload
  );

  return response.data.data;
}

export async function getAssignments() {
  const response = await httpClient.get<
    ApiResponse<{
      user: MerchantUser;
      assignments: MerchantAssignment[];
      activeAssignment: MerchantAssignment | null;
      merchants: Record<string, MerchantProfile>;
    }>
  >('/auth/merchant/assignments');

  return response.data.data;
}

export async function logout() {
  const response = await httpClient.post<ApiResponse<{ loggedOut: boolean }>>(
    '/auth/merchant/logout'
  );

  return response.data.data;
}
