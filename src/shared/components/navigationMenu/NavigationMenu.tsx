import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavigationContext } from '../../../app/providers/NavigationProvider';
import { Menus } from './Menus';

export const NavigationMenu: React.FC = () => {
  const navigationContext = useContext(NavigationContext);
  if (!navigationContext) {
    throw new Error('NavigationContext must be used within NavigationProvider');
  }
  const { navigationOpen, setNavigationOpen } = navigationContext;
  const pathName = useLocation().pathname;

  useEffect(() => {
    setNavigationOpen(false);
  }, [pathName, setNavigationOpen]);

  return (
    <>
      <nav className={`nxl-navigation ${navigationOpen ? 'mob-navigation-active' : ''}`}>
        <div className="navbar-wrapper">
          <div className="m-header">
            <Link to="/app" className="b-brand">
              <img src="/images/logo.png" alt="Essaly Logo" className="logo logo-lg" />
              <img src="/images/logo.png" alt="Essaly Logo" className="logo logo-sm" />
            </Link>
          </div>

          <div className="navbar-content">
            <PerfectScrollbar>
              <ul className="nxl-navbar">
                <li className="nxl-item nxl-caption">
                  <label>Navigation</label>
                </li>
                <Menus />
              </ul>
            </PerfectScrollbar>
          </div>
        </div>
        <div
          onClick={() => setNavigationOpen(false)}
          className={`${navigationOpen ? 'nxl-menu-overlay' : ''}`}
        ></div>
      </nav>
    </>
  );
};

