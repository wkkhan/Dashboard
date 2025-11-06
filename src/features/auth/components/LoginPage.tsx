import { isAxiosError } from 'axios';
import { useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../app/providers/AuthProvider';
import { FiFacebook, FiGithub, FiTwitter } from 'react-icons/fi';

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

  return (
    <main className="auth-minimal-wrapper">
      <div className="auth-minimal-inner">
        <div className="minimal-card-wrapper">
          <div className="card mb-4 mt-5 mx-4 mx-sm-0 position-relative">
            <div className="wd-50 bg-white p-2 rounded-circle shadow-lg position-absolute translate-middle top-0 start-50">
              <img src="/images/logo-abbr.png" alt="Logo" className="img-fluid" />
            </div>
            <div className="card-body p-sm-5">
              <h2 className="fs-20 fw-bolder mb-4">Login</h2>
              <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
              <p className="fs-12 fw-medium text-muted">
                Thank you for getting back to <strong>Essaly</strong> web applications, let's access our the best recommendation for you.
              </p>
              
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

              <div className="w-100 mt-5 text-center mx-auto">
                <div className="mb-4 border-bottom position-relative">
                  <span className="small py-1 px-3 text-uppercase text-muted bg-white position-absolute translate-middle">
                    or
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <a
                    href="#"
                    className="btn btn-light-brand flex-fill"
                    data-bs-toggle="tooltip"
                    data-bs-trigger="hover"
                    title="Login with Facebook"
                    onClick={(e) => e.preventDefault()}
                  >
                    <FiFacebook size={16} />
                  </a>
                  <a
                    href="#"
                    className="btn btn-light-brand flex-fill"
                    data-bs-toggle="tooltip"
                    data-bs-trigger="hover"
                    title="Login with Twitter"
                    onClick={(e) => e.preventDefault()}
                  >
                    <FiTwitter size={16} />
                  </a>
                  <a
                    href="#"
                    className="btn btn-light-brand flex-fill"
                    data-bs-toggle="tooltip"
                    data-bs-trigger="hover"
                    title="Login with Github"
                    onClick={(e) => e.preventDefault()}
                  >
                    <FiGithub size={16} />
                  </a>
                </div>
              </div>

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
