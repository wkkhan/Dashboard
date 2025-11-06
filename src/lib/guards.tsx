import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../app/providers/AuthProvider';
import LoadingState from '../shared/components/LoadingState';

type RequireAuthProps = {
  redirectTo?: string;
};

type RedirectIfAuthenticatedProps = {
  redirectTo?: string;
};

export function RequireAuth({ redirectTo = '/login' }: RequireAuthProps) {
  const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();

  if (isInitializing) {
    return <LoadingState label="Preparing your workspace…" />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export function RedirectIfAuthenticated({ redirectTo = '/' }: RedirectIfAuthenticatedProps) {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <LoadingState label="Preparing your workspace…" />;
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
