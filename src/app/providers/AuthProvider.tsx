import type { PropsWithChildren } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  AuthSessionPayload,
  MerchantAssignment,
  MerchantProfile,
  MerchantUser,
} from '../../features/auth/api/auth.api';
import {
  getAssignments as getAssignmentsRequest,
  login as loginRequest,
  logout as logoutRequest,
  refreshSession as refreshSessionRequest,
  switchMerchant as switchMerchantRequest,
} from '../../features/auth/api/auth.api';
import { clearAccessToken, setAccessToken } from '../../shared/services/authTokenStore';

type LoginPayload = {
  email: string;
  password: string;
};

type AuthContextValue = {
  user: MerchantUser | null;
  assignments: MerchantAssignment[];
  activeAssignment: MerchantAssignment | null;
  merchantDirectory: Record<string, MerchantProfile>;
  needsMerchantSelection: boolean;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  switchMerchant: (merchantId: string) => Promise<void>;
  fetchAssignments: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthState = {
  user: MerchantUser | null;
  assignments: MerchantAssignment[];
  activeAssignment: MerchantAssignment | null;
  merchantDirectory: Record<string, MerchantProfile>;
  needsMerchantSelection: boolean;
};

const initialState: AuthState = {
  user: null,
  assignments: [],
  activeAssignment: null,
  merchantDirectory: {},
  needsMerchantSelection: false,
};

function AuthProviderComponent({ children }: PropsWithChildren) {
  const [state, setState] = useState<AuthState>(initialState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const hasBootstrappedRef = useRef(false);
  const isMountedRef = useRef(false);

  const applySession = useCallback((payload: AuthSessionPayload) => {
    setAccessToken(payload.accessToken);
    setState({
      user: payload.user,
      assignments: payload.assignments ?? [],
      activeAssignment: payload.assignment ?? null,
      merchantDirectory: payload.merchants ?? {},
      needsMerchantSelection:
        payload.needsMerchantSelection ?? !(payload.assignment ?? null),
    });
    setIsAuthenticated(true);
  }, []);

  const clearSession = useCallback(() => {
    clearAccessToken();
    setState(initialState);
    setIsAuthenticated(false);
  }, []);

  const login = useCallback(
    async (payload: LoginPayload) => {
      const session = await loginRequest(payload);
      applySession(session);
    },
    [applySession]
  );

  const refreshSession = useCallback(async () => {
    try {
      const session = await refreshSessionRequest();
      applySession(session);
    } catch (error) {
      clearSession();
      throw error;
    }
  }, [applySession, clearSession]);

  const switchMerchant = useCallback(
    async (merchantId: string) => {
      const session = await switchMerchantRequest({ merchantId });
      applySession(session);
    },
    [applySession]
  );

  const fetchAssignments = useCallback(async () => {
    const data = await getAssignmentsRequest();
    setState((prev) => ({
      ...prev,
      user: data.user,
      assignments: data.assignments ?? [],
      activeAssignment: data.activeAssignment ?? prev.activeAssignment,
      merchantDirectory: data.merchants ?? prev.merchantDirectory,
      needsMerchantSelection: !data.activeAssignment,
    }));
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch (error) {
      // Backend errors shouldn't prevent local logout cleanup.
      console.error(error);
    } finally {
      clearSession();
    }
  }, [clearSession]);

  useEffect(() => {
    isMountedRef.current = true;

    const bootstrap = async () => {
      if (hasBootstrappedRef.current) {
        if (isMountedRef.current) {
          setIsInitializing(false);
        }
        return;
      }

      hasBootstrappedRef.current = true;

      try {
        await refreshSession();
      } catch {
        // refreshSession already clears the session and rethrows on failure.
      } finally {
        if (isMountedRef.current) {
          setIsInitializing(false);
        }
      }
    };

    bootstrap();

    return () => {
      isMountedRef.current = false;
    };
  }, [refreshSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: state.user,
      assignments: state.assignments,
      activeAssignment: state.activeAssignment,
      merchantDirectory: state.merchantDirectory,
      needsMerchantSelection: state.needsMerchantSelection,
      isAuthenticated,
      isInitializing,
      login,
      logout,
      refreshSession,
      switchMerchant,
      fetchAssignments,
    }),
    [
      isAuthenticated,
      isInitializing,
      login,
      logout,
      refreshSession,
      state.activeAssignment,
      state.assignments,
      state.merchantDirectory,
      state.needsMerchantSelection,
      state.user,
      switchMerchant,
      fetchAssignments,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export const AuthProvider = AuthProviderComponent;
export const useAuth = useAuthContext;
