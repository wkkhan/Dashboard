import PerfectScrollbar from 'react-perfect-scrollbar';
import React, { useEffect, useState } from 'react';
import { FiSettings, FiX } from 'react-icons/fi';

interface FontFamily {
  isChecked: boolean;
  value: string;
  label: string;
}

const fontFamily: FontFamily[] = [
  { isChecked: false, value: 'app-font-family-lato', label: 'Lato' },
  { isChecked: false, value: 'app-font-family-rubik', label: 'Rubik' },
  { isChecked: true, value: 'app-font-family-inter', label: 'Inter' },
  { isChecked: false, value: 'app-font-family-cinzel', label: 'Cinzel' },
  { isChecked: false, value: 'app-font-family-nunito', label: 'Nunito' },
  { isChecked: false, value: 'app-font-family-roboto', label: 'Roboto' },
  { isChecked: false, value: 'app-font-family-ubuntu', label: 'Ubuntu' },
  { isChecked: false, value: 'app-font-family-poppins', label: 'Poppins' },
  { isChecked: false, value: 'app-font-family-raleway', label: 'Raleway' },
  { isChecked: false, value: 'app-font-family-system-ui', label: 'System UI' },
  { isChecked: false, value: 'app-font-family-noto-sans', label: 'Noto Sans' },
  { isChecked: false, value: 'app-font-family-fira-sans', label: 'Fira Sans' },
  { isChecked: false, value: 'app-font-family-work-sans', label: 'Work Sans' },
  { isChecked: false, value: 'app-font-family-open-sans', label: 'Open Sans' },
  { isChecked: false, value: 'app-font-family-maven-pro', label: 'Maven Pro' },
  { isChecked: false, value: 'app-font-family-quicksand', label: 'Quicksand' },
  { isChecked: false, value: 'app-font-family-montserrat', label: 'Montserrat' },
  { isChecked: false, value: 'app-font-family-josefin-sans', label: 'Josefin Sans' },
  { isChecked: false, value: 'app-font-family-ibm-plex-sans', label: 'Ibm Plex Sans' },
  { isChecked: false, value: 'app-font-family-source-sans-pro', label: 'Source Sans Pro' },
  { isChecked: false, value: 'app-font-family-montserrat-alt', label: 'Montserrat Alt' },
  { isChecked: false, value: 'app-font-family-roboto-slab', label: 'Roboto Slab' },
];

export const ThemeCustomizer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleNavigationTheme = (type: 'dark' | 'light') => {
    if (type === 'dark') {
      document.documentElement.classList.add('app-navigation-dark');
      localStorage.setItem('navigationTheme', 'dark');
      const darkRadio = document.getElementById('app-navigation-dark') as HTMLInputElement;
      const lightRadio = document.getElementById('app-navigation-light') as HTMLInputElement;
      if (darkRadio) darkRadio.checked = true;
      if (lightRadio) lightRadio.checked = false;
    } else {
      document.documentElement.classList.remove('app-navigation-dark');
      localStorage.setItem('navigationTheme', 'light');
      const darkRadio = document.getElementById('app-navigation-dark') as HTMLInputElement;
      const lightRadio = document.getElementById('app-navigation-light') as HTMLInputElement;
      if (darkRadio) darkRadio.checked = false;
      if (lightRadio) lightRadio.checked = true;
    }
  };

  const handleHeaderTheme = (type: 'dark' | 'light') => {
    if (type === 'dark') {
      document.documentElement.classList.add('app-header-dark');
      localStorage.setItem('headerTheme', 'dark');
      const darkRadio = document.getElementById('app-header-dark') as HTMLInputElement;
      const lightRadio = document.getElementById('app-header-light') as HTMLInputElement;
      if (darkRadio) darkRadio.checked = true;
      if (lightRadio) lightRadio.checked = false;
    } else {
      document.documentElement.classList.remove('app-header-dark');
      localStorage.setItem('headerTheme', 'light');
      const darkRadio = document.getElementById('app-header-dark') as HTMLInputElement;
      const lightRadio = document.getElementById('app-header-light') as HTMLInputElement;
      if (darkRadio) darkRadio.checked = false;
      if (lightRadio) lightRadio.checked = true;
    }
  };

  const handleSkinTheme = (type: 'dark' | 'light') => {
    if (type === 'dark') {
      document.documentElement.classList.add('app-skin-dark');
      localStorage.setItem('skinTheme', 'dark');
      const darkRadio = document.getElementById('app-skin-dark') as HTMLInputElement;
      const lightRadio = document.getElementById('app-skin-light') as HTMLInputElement;
      if (darkRadio) darkRadio.checked = true;
      if (lightRadio) lightRadio.checked = false;
    } else {
      document.documentElement.classList.remove('app-skin-dark');
      localStorage.setItem('skinTheme', 'light');
      const darkRadio = document.getElementById('app-skin-dark') as HTMLInputElement;
      const lightRadio = document.getElementById('app-skin-light') as HTMLInputElement;
      if (darkRadio) darkRadio.checked = false;
      if (lightRadio) lightRadio.checked = true;
    }
  };

  const handleFontFamily = (font: string) => {
    const existingFontClass = document.documentElement.classList.value.match(/app-font-family-\w+/);
    if (existingFontClass) {
      document.documentElement.classList.remove(existingFontClass[0]);
    }
    const fontRadio = document.getElementById(font) as HTMLInputElement;
    if (fontRadio) fontRadio.checked = true;
    document.documentElement.classList.add(font);
    localStorage.setItem('fontFamily', font);
  };

  const handleResetAll = () => {
    const classes = Array.from(document.documentElement.classList);
    document.documentElement.classList.remove(...classes);
    const navLight = document.getElementById('app-navigation-light') as HTMLInputElement;
    const headerLight = document.getElementById('app-header-light') as HTMLInputElement;
    const skinLight = document.getElementById('app-skin-light') as HTMLInputElement;
    const fontInter = document.getElementById('app-font-family-inter') as HTMLInputElement;
    if (navLight) navLight.checked = true;
    if (headerLight) headerLight.checked = true;
    if (skinLight) skinLight.checked = true;
    if (fontInter) fontInter.checked = true;
    localStorage.clear();
    setOpen(false);
  };

  // Load saved themes from localStorage on page load
  const loadSavedThemes = () => {
    const savedNavigationTheme = localStorage.getItem('navigationTheme');
    const savedHeaderTheme = localStorage.getItem('headerTheme');
    const savedSkinTheme = localStorage.getItem('skinTheme');
    const savedFontFamily = localStorage.getItem('fontFamily');

    if (savedNavigationTheme) {
      handleNavigationTheme(savedNavigationTheme as 'dark' | 'light');
    }
    if (savedHeaderTheme) {
      handleHeaderTheme(savedHeaderTheme as 'dark' | 'light');
    }
    if (savedSkinTheme) {
      handleSkinTheme(savedSkinTheme as 'dark' | 'light');
    }
    if (savedFontFamily) {
      handleFontFamily(savedFontFamily);
    }
  };

  useEffect(() => {
    loadSavedThemes();
  }, []);

  return (
    <div className={`theme-customizer ${open ? 'theme-customizer-open' : ''}`}>
      <div className="customizer-handle">
        <a
          href="#"
          className="cutomizer-open-trigger bg-primary"
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          <i className="lh-1">
            <FiSettings size={16} />
          </i>
        </a>
      </div>
      <div className="customizer-sidebar-wrapper">
        <div className="customizer-sidebar-header px-4 ht-80 border-bottom d-flex align-items-center justify-content-between">
          <h5 className="mb-0">Theme Settings</h5>
          <a
            href="#"
            className="cutomizer-close-trigger d-flex"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
          >
            <FiX size={16} />
          </a>
        </div>
        <div className="customizer-sidebar-body position-relative p-4">
          <PerfectScrollbar>
            {/*! BEGIN: [Navigation] !*/}
            <div className="position-relative px-3 pb-3 pt-4 mt-3 mb-5 border border-gray-2 theme-options-set">
              <label
                className="py-1 px-2 fs-8 fw-bold text-uppercase text-muted text-spacing-2 bg-white border border-gray-2 position-absolute rounded-2 options-label"
                style={{ top: '-12px' }}
              >
                Navigation
              </label>
              <div className="row g-2 theme-options-items app-navigation" id="appNavigationList">
                <div className="col-6 text-center single-option" onClick={() => handleNavigationTheme('light')}>
                  <input
                    type="radio"
                    className="btn-check"
                    name="app-navigation"
                    id="app-navigation-light"
                    defaultValue={1}
                    data-app-navigation="app-navigation-light"
                    defaultChecked
                  />
                  <label
                    className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label"
                    htmlFor="app-navigation-light"
                  >
                    Light
                  </label>
                </div>
                <div className="col-6 text-center single-option" onClick={() => handleNavigationTheme('dark')}>
                  <input
                    type="radio"
                    className="btn-check"
                    name="app-navigation"
                    id="app-navigation-dark"
                    defaultValue={2}
                    data-app-navigation="app-navigation-dark"
                  />
                  <label
                    className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label"
                    htmlFor="app-navigation-dark"
                  >
                    Dark
                  </label>
                </div>
              </div>
            </div>
            {/*! END: [Navigation] !*/}
            {/*! BEGIN: [Header] !*/}
            <div className="position-relative px-3 pb-3 pt-4 mt-3 mb-5 border border-gray-2 theme-options-set mt-5">
              <label
                className="py-1 px-2 fs-8 fw-bold text-uppercase text-muted text-spacing-2 bg-white border border-gray-2 position-absolute rounded-2 options-label"
                style={{ top: '-12px' }}
              >
                Header
              </label>
              <div className="row g-2 theme-options-items app-header" id="appHeaderList">
                <div className="col-6 text-center single-option" onClick={() => handleHeaderTheme('light')}>
                  <input
                    type="radio"
                    className="btn-check"
                    name="app-header"
                    id="app-header-light"
                    defaultValue={1}
                    data-app-header="app-header-light"
                    defaultChecked
                  />
                  <label
                    className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label"
                    htmlFor="app-header-light"
                  >
                    Light
                  </label>
                </div>
                <div className="col-6 text-center single-option" onClick={() => handleHeaderTheme('dark')}>
                  <input
                    type="radio"
                    className="btn-check"
                    name="app-header"
                    id="app-header-dark"
                    defaultValue={2}
                    data-app-header="app-header-dark"
                  />
                  <label
                    className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label"
                    htmlFor="app-header-dark"
                  >
                    Dark
                  </label>
                </div>
              </div>
            </div>
            {/*! END: [Header] !*/}
            {/*! BEGIN: [Skins] !*/}
            <div className="position-relative px-3 pb-3 pt-4 mt-3 mb-5 border border-gray-2 theme-options-set">
              <label
                className="py-1 px-2 fs-8 fw-bold text-uppercase text-muted text-spacing-2 bg-white border border-gray-2 position-absolute rounded-2 options-label"
                style={{ top: '-12px' }}
              >
                Skins
              </label>
              <div className="row g-2 theme-options-items app-skin" id="appSkinList">
                <div className="col-6 text-center position-relative single-option light-button" onClick={() => handleSkinTheme('light')}>
                  <input
                    type="radio"
                    className="btn-check"
                    id="app-skin-light"
                    name="app-skin"
                    defaultValue={1}
                    data-app-skin="app-skin-light"
                    defaultChecked
                  />
                  <label
                    className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label"
                    htmlFor="app-skin-light"
                  >
                    Light
                  </label>
                </div>
                <div className="col-6 text-center position-relative single-option dark-button" onClick={() => handleSkinTheme('dark')}>
                  <input
                    type="radio"
                    className="btn-check"
                    id="app-skin-dark"
                    name="app-skin"
                    defaultValue={2}
                    data-app-skin="app-skin-dark"
                  />
                  <label
                    className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label"
                    htmlFor="app-skin-dark"
                  >
                    Dark
                  </label>
                </div>
              </div>
            </div>
            {/*! END: [Skins] !*/}
            {/*! BEGIN: [Typography] !*/}
            <div className="position-relative px-3 pb-3 pt-4 mt-3 mb-0 border border-gray-2 theme-options-set">
              <label
                className="py-1 px-2 fs-8 fw-bold text-uppercase text-muted text-spacing-2 bg-white border border-gray-2 position-absolute rounded-2 options-label"
                style={{ top: '-12px' }}
              >
                Typography
              </label>
              <div className="row g-2 theme-options-items font-family" id="fontFamilyList">
                {fontFamily.map(({ label, value, isChecked }, index) => {
                  return (
                    <div key={index} className="col-6 text-center single-option" onClick={() => handleFontFamily(value)}>
                      <input
                        type="radio"
                        className="btn-check"
                        id={value}
                        name="font-family"
                        defaultValue={index + 1}
                        data-font-family={value}
                        defaultChecked={isChecked}
                      />
                      <label
                        className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative options-label"
                        htmlFor={value}
                      >
                        {label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </PerfectScrollbar>
        </div>
        <div className="customizer-sidebar-footer px-4 ht-60 border-top d-flex align-items-center gap-2">
          <div className="flex-fill w-50">
            <a
              href="#"
              className="btn btn-danger"
              data-style="reset-all-common-style"
              onClick={(e) => {
                e.preventDefault();
                handleResetAll();
              }}
            >
              Reset
            </a>
          </div>
          <div className="flex-fill w-50">
            <a
              href="#"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

