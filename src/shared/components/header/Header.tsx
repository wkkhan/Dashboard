import React, { useContext, useEffect, useRef, useState } from 'react';
import { FiAlignLeft, FiArrowRight, FiMaximize, FiMinimize, FiMoon, FiSun } from 'react-icons/fi';
import { NavigationContext } from '../../../app/providers/NavigationProvider';
import { SearchModal } from './SearchModal';
import { NotificationsModal } from './NotificationsModal';
import { ProfileModal } from './ProfileModal';
import { MerchantSwitcher } from '../../../features/merchants/components/MerchantSwitcher';

interface HeaderProps {
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const navigationContext = useContext(NavigationContext);
  if (!navigationContext) {
    throw new Error('NavigationContext must be used within NavigationProvider');
  }
  const { navigationOpen, setNavigationOpen, navigationExpend, setNavigationExpend } = navigationContext;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const miniButtonRef = useRef<HTMLAnchorElement>(null);
  const expendButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const savedSkinTheme = localStorage.getItem('skinTheme');
    if (savedSkinTheme === 'dark') {
      handleThemeMode('dark');
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      const navigationUp1600 = document.querySelector('.navigation-up-1600') as HTMLElement;
      const navigationDown1600 = document.querySelector('.navigation-down-1600') as HTMLElement;

      if (newWindowWidth <= 1024) {
        document.documentElement.classList.remove('minimenu');
        if (navigationDown1600) navigationDown1600.style.display = 'none';
        if (navigationUp1600) navigationUp1600.style.display = 'none';
      } else if (newWindowWidth >= 1025 && newWindowWidth <= 1400) {
        document.documentElement.classList.add('minimenu');
        if (navigationUp1600) navigationUp1600.style.display = 'none';
        if (navigationDown1600) navigationDown1600.style.display = 'block';
      } else {
        document.documentElement.classList.remove('minimenu');
        if (navigationUp1600) navigationUp1600.style.display = 'block';
        if (navigationDown1600) navigationDown1600.style.display = 'none';
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleThemeMode = (type: 'dark' | 'light') => {
    if (type === 'dark') {
      document.documentElement.classList.add('app-skin-dark');
      localStorage.setItem('skinTheme', 'dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('app-skin-dark');
      localStorage.setItem('skinTheme', 'light');
      setIsDarkMode(false);
    }
  };

  const handleNavigationExpendUp = (e: React.MouseEvent, param: 'show' | 'hide') => {
    e.preventDefault();
    if (param === 'show') {
      setNavigationExpend(true);
      document.documentElement.classList.add('minimenu');
    } else {
      setNavigationExpend(false);
      document.documentElement.classList.remove('minimenu');
    }
  };

  const handleNavigationExpendDown = (e: React.MouseEvent, param: 'show' | 'hide') => {
    e.preventDefault();
    if (param === 'show') {
      setNavigationExpend(true);
      document.documentElement.classList.remove('minimenu');
    } else {
      setNavigationExpend(false);
      document.documentElement.classList.add('minimenu');
    }
  };

  const fullScreenMaximize = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as any).mozRequestFullScreen) {
      (elem as any).mozRequestFullScreen();
    } else if ((elem as any).webkitRequestFullscreen) {
      (elem as any).webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) {
      (elem as any).msRequestFullscreen();
    }
    document.documentElement.classList.add('fsh-infullscreen');
    document.body.classList.add('full-screen-helper');
    setIsFullscreen(true);
  };

  const fullScreenMinimize = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
    document.documentElement.classList.remove('fsh-infullscreen');
    document.body.classList.remove('full-screen-helper');
    setIsFullscreen(false);
  };

  return (
    <header className="nxl-header">
      <div className="header-wrapper">
        {/* Header Left */}
        <div className="header-left d-flex align-items-center gap-4">
          {/* Mobile Toggler */}
          <a
            href="#"
            className="nxl-head-mobile-toggler"
            onClick={(e) => {
              e.preventDefault();
              setNavigationOpen(true);
            }}
            id="mobile-collapse"
          >
            <div className={`hamburger hamburger--arrowturn ${navigationOpen ? 'is-active' : ''}`}>
              <div className="hamburger-box">
                <div className="hamburger-inner"></div>
              </div>
            </div>
          </a>

          {/* Navigation Toggle - Desktop */}
          <div className="nxl-navigation-toggle navigation-up-1600">
            <a
              href="#"
              onClick={(e) => handleNavigationExpendUp(e, 'show')}
              id="menu-mini-button"
              ref={miniButtonRef}
              style={{ display: navigationExpend ? 'none' : 'block' }}
            >
              <FiAlignLeft size={24} />
            </a>
            <a
              href="#"
              onClick={(e) => handleNavigationExpendUp(e, 'hide')}
              id="menu-expend-button"
              ref={expendButtonRef}
              style={{ display: navigationExpend ? 'block' : 'none' }}
            >
              <FiArrowRight size={24} />
            </a>
          </div>
          <div className="nxl-navigation-toggle navigation-down-1600">
            <a
              href="#"
              onClick={(e) => handleNavigationExpendDown(e, 'hide')}
              id="menu-mini-button"
              ref={miniButtonRef}
              style={{ display: navigationExpend ? 'block' : 'none' }}
            >
              <FiAlignLeft size={24} />
            </a>
            <a
              href="#"
              onClick={(e) => handleNavigationExpendDown(e, 'show')}
              id="menu-expend-button"
              ref={expendButtonRef}
              style={{ display: navigationExpend ? 'none' : 'block' }}
            >
              <FiArrowRight size={24} />
            </a>
          </div>
        </div>

        {/* Header Right */}
        <div className="header-right ms-auto">
          <div className="d-flex align-items-center">
            <div className="me-3 d-none d-lg-block">
              <div className="d-flex align-items-center">
                <MerchantSwitcher />
              </div>
            </div>
            <SearchModal />
            <div className="nxl-h-item d-none d-sm-flex">
              <div className="full-screen-switcher">
                <span className="nxl-head-link me-0">
                  {isFullscreen ? (
                    <FiMinimize size={20} className="minimize" onClick={fullScreenMinimize} />
                  ) : (
                    <FiMaximize size={20} className="maximize" onClick={fullScreenMaximize} />
                  )}
                </span>
              </div>
            </div>
            <div className="nxl-h-item dark-light-theme">
              <div
                className="nxl-head-link me-0 dark-button"
                onClick={() => handleThemeMode('dark')}
                style={{ display: isDarkMode ? 'none' : 'block' }}
              >
                <FiMoon size={20} />
              </div>
              <div
                className="nxl-head-link me-0 light-button"
                onClick={() => handleThemeMode('light')}
                style={{ display: isDarkMode ? 'block' : 'none' }}
              >
                <FiSun size={20} />
              </div>
            </div>
            <NotificationsModal />
            <ProfileModal onLogout={onLogout} />
          </div>
        </div>
      </div>
    </header>
  );
};

