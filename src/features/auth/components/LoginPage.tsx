import { isAxiosError } from 'axios';
import { useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../app/providers/AuthProvider';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe?: boolean;
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
      rememberMe: false,
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

  /* OLD CODE - Simple Bootstrap Card Layout (Before Duralux Integration)
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
  */

  // NEW CODE - Duralux Minimal Login Design
  return (
    <main className="auth-minimal-wrapper">
      <div className="auth-minimal-inner">
        <div className="minimal-card-wrapper">
          {/* Card with logo positioned at top center */}
          <div className="card mb-4 mt-5 mx-4 mx-sm-0 position-relative">
            {/* Logo circle badge */}
            <div className="wd-50 bg-white p-2 rounded-circle shadow-lg position-absolute translate-middle top-0 start-50">
              <img src="/images/logo.png" alt="Logo" className="img-fluid" />
            </div>
            <div className="card-body p-sm-5">
              {/* Header section */}
              <h2 className="fs-20 fw-bolder mb-4">Login</h2>
              <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
              <p className="fs-12 fw-medium text-muted">
                Thank you for getting back to <strong>Essaly</strong> web applications, let's access our the best recommendation for you.
              </p>
              
              {/* Login form */}
              <form onSubmit={onSubmit} className="w-100 mt-4 pt-2" noValidate>
                <div className="mb-4">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email or Username"
                    autoComplete="email"
                    {...register('email', { required: 'Email is required' })}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    autoComplete="current-password"
                    {...register('password', { required: 'Password is required' })}
                  />
                </div>
                
                {errorMessage ? (
                  <div className="alert alert-danger mb-3" role="alert">
                    {errorMessage}
                  </div>
                ) : null}

                {/* Remember me and forgot password */}
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="rememberMe"
                        {...register('rememberMe')}
                      />
                      <label className="custom-control-label c-pointer" htmlFor="rememberMe">
                        Remember Me
                      </label>
                    </div>
                  </div>
                  <div>
                    <Link to="/auth/reset" className="fs-11 text-primary">
                      Forget password?
                    </Link>
                  </div>
                </div>
                
                {/* Submit button */}
                <div className="mt-5">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Signing in…' : 'Login'}
                  </button>
                </div>
              </form>

              {/* Social login section */}
              <div className="w-100 mt-5 text-center mx-auto">
                <div className="mb-4 border-bottom position-relative">
                  <span className="small py-1 px-3 text-uppercase text-muted bg-white position-absolute translate-middle">
                    or
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <a
                    href="https://www.facebook.com/Essaly.SA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-light-brand flex-fill"
                    data-bs-toggle="tooltip"
                    data-bs-trigger="hover"
                    title="Facebook"
                  >
                    <FiFacebook size={16} />
                  </a>
                  <a
                    href="https://x.com/Essaly_SA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-light-brand flex-fill"
                    data-bs-toggle="tooltip"
                    data-bs-trigger="hover"
                    title="Twitter"
                  >
                    <FiTwitter size={16} />
                  </a>
                  <a
                    href="https://www.instagram.com/essaly.sa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-light-brand flex-fill"
                    data-bs-toggle="tooltip"
                    data-bs-trigger="hover" 
                    title="Instagram"
                  >
                    <FiInstagram size={16} />
                  </a>
                </div>
              </div>

              {/* Registration link */}
              <div className="mt-5 text-muted">
                <span>Don't have an account?</span>
                <Link to="/auth/register" className="fw-bold ms-1">
                  Create an Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
