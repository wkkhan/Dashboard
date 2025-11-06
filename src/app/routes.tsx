import { Navigate, createBrowserRouter } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import PublicLayout from './layout/PublicLayout';
import { LoginPage } from '../features/auth/components/LoginPage';
import { Dashboard } from '../features/dashboard/components/Dashboard';
import { RedirectIfAuthenticated, RequireAuth } from '../lib/guards';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  {
    element: <RedirectIfAuthenticated />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
