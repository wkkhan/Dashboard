import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { Header } from '../../shared/components/header/Header';
import { NavigationMenu } from '../../shared/components/navigationMenu/NavigationMenu';
import { useBootstrapUtils } from '../../shared/hooks/useBootstrapUtils';

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  // Initialize Bootstrap utilities (tooltips, popovers, dropdowns)
  useBootstrapUtils(location.pathname);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  /* OLD CODE - Simple Bootstrap Layout (Before Duralux Integration)
  import { Outlet, useNavigate } from 'react-router-dom';
  import { useAuth } from '../providers/AuthProvider';
  import { useMerchants } from '../providers/MerchantProvider';
  import { MerchantSwitcher } from '../../features/merchants/components/MerchantSwitcher';

  function AppLayout() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { activeMerchant } = useMerchants();

    const handleLogout = async () => {
      await logout();
      navigate('/login');
    };

    return (
      <div className="d-flex flex-column min-vh-100 bg-light waleed">
        <header className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <span className="navbar-brand fw-semibold d-flex align-items-center gap-2">
              <img src="/images/logo.png" alt="Essaly" className="d-inline-block" style={{ height: '32px' }} />
              Essaly Merchant Console
            </span>
            <div className="d-flex align-items-center gap-3 ms-auto">
              <div className="text-white small text-end">
                <div>{user?.email ?? 'Unknown user'}</div>
                <div className="text-opacity-75">
                  {activeMerchant
                    ? `Active: ${activeMerchant.profile?.name ?? activeMerchant.merchantId} (${
                        activeMerchant.role
                      })`
                    : 'No merchant selected'}
                </div>
              </div>
              <MerchantSwitcher />
              <button type="button" className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="container-fluid flex-grow-1 py-4">
          <Outlet />
        </main>

        <footer className="bg-white border-top py-3 text-center small text-muted">
          &copy; {new Date().getFullYear()} Essaly. All rights reserved.
        </footer>
      </div>
    );
  }
  */

  // NEW CODE - Duralux Header and Sidebar Navigation
  return (
    <>
      <Header onLogout={handleLogout} />
      <NavigationMenu />
      <main className="nxl-container">
        <div className="nxl-content">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default AppLayout;
