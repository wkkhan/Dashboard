import React, { Fragment, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { menuList, MenuItem } from '../../utils/menuList';
import { getIcon } from '@/utils/getIcon';

export const Menus: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  const [activeParent, setActiveParent] = useState('');
  const [activeChild, setActiveChild] = useState('');
  const pathName = useLocation().pathname;

  const handleMainMenu = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  const handleDropdownMenu = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    if (openSubDropdown === name) {
      setOpenSubDropdown(null);
    } else {
      setOpenSubDropdown(name);
    }
  };

  useEffect(() => {
    if (pathName !== '/') {
      const pathParts = pathName.split('/');
      const parent = pathParts[1] || 'app';
      const child = pathParts[2] || '';
      setActiveParent(parent);
      setActiveChild(child);
      setOpenDropdown(parent);
      if (child) {
        setOpenSubDropdown(child);
      }
    } else {
      setActiveParent('app');
      setOpenDropdown('app');
    }
  }, [pathName]);

  return (
    <>
      {menuList.map(({ dropdownMenu, id, name, path, icon }) => {
        return (
          <li
            key={id}
            onClick={(e) => handleMainMenu(e, name)}
            className={`nxl-item nxl-hasmenu ${activeParent === name ? 'active nxl-trigger' : ''}`}
          >
            <Link to={path} className="nxl-link text-capitalize">
              <span className="nxl-micon">{getIcon(icon)}</span>
              <span className="nxl-mtext" style={{ paddingLeft: '2.5px' }}>
                {name}
              </span>
              {dropdownMenu && dropdownMenu.length > 0 && (
                <span className="nxl-arrow fs-16">
                  <i>
                    <FiChevronRight />
                  </i>
                </span>
              )}
            </Link>
            {dropdownMenu && dropdownMenu.length > 0 && (
              <ul className={`nxl-submenu ${openDropdown === name ? 'nxl-menu-visible' : 'nxl-menu-hidden'}`}>
                {dropdownMenu.map(({ id: subId, name: subName, path: subPath, subdropdownMenu }) => {
                  const subMenuKey = subName;
                  return (
                    <Fragment key={subId}>
                      {subdropdownMenu && subdropdownMenu.length > 0 ? (
                        <li
                          className={`nxl-item nxl-hasmenu ${activeChild === subName ? 'active' : ''}`}
                          onClick={(e) => handleDropdownMenu(e, subMenuKey)}
                        >
                          <Link to={subPath} className="nxl-link text-capitalize">
                            <span className="nxl-mtext">{subName}</span>
                            <span className="nxl-arrow">
                              <i>
                                <FiChevronRight />
                              </i>
                            </span>
                          </Link>
                          {subdropdownMenu.map(({ id: subSubId, name: subSubName, path: subSubPath }) => {
                            return (
                              <ul
                                key={subSubId}
                                className={`nxl-submenu ${openSubDropdown === subMenuKey ? 'nxl-menu-visible' : 'nxl-menu-hidden'}`}
                              >
                                <li className={`nxl-item ${pathName === subSubPath ? 'active' : ''}`}>
                                  <Link className="nxl-link text-capitalize" to={subSubPath}>
                                    {subSubName}
                                  </Link>
                                </li>
                              </ul>
                            );
                          })}
                        </li>
                      ) : (
                        <li className={`nxl-item ${pathName === subPath ? 'active' : ''}`}>
                          <Link className="nxl-link" to={subPath}>
                            {subName}
                          </Link>
                        </li>
                      )}
                    </Fragment>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
};

