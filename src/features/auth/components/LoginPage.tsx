import { isAxiosError } from 'axios';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../app/providers/AuthProvider';

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginPage() {
  const location = useLocation();
  const { login, isAuthenticated, isInitializing } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const redirectPath =
    (location.state as { from?: { pathname?: string } } | undefined)?.from?.pathname ?? '/app';

  if (!isInitializing && isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  const onSubmit = handleSubmit(async (values) => {
    try {
      setErrorMessage(null);
      await login(values);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        setErrorMessage(apiMessage ?? 'Unable to sign in. Please check your credentials.');
      } else {
        console.error(error);
        setErrorMessage('Unable to sign in. Please try again.');
      }
    }
  });

  return (
    <>
      <div className="text-center mb-4">
        <h1 className="h4">Welcome back</h1>
        <p className="text-muted mb-0">Sign in to manage your Essaly merchants.</p>
      </div>
      <form onSubmit={onSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="you@example.com"
            autoComplete="email"
            {...register('email', { required: true })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter your password"
            autoComplete="current-password"
            {...register('password', { required: true })}
          />
        </div>

        {errorMessage ? (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        ) : null}

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
