import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiAlignRight, FiArrowLeft } from 'react-icons/fi';

interface PageHeaderProps {
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const pathName = useLocation().pathname;
  let folderName = '';
  let fileName = '';
  
  if (pathName === '/' || pathName === '/app' || pathName === '/app/') {
    folderName = 'Dashboard';
    fileName = 'Dashboard';
  } else {
    const parts = pathName.split('/').filter(Boolean);
    folderName = parts[0] || 'Dashboard';
    fileName = parts[1] || folderName;
  }

  return (
    <div className="page-header">
      <div className="page-header-left d-flex align-items-center">
        <div className="page-header-title">
          <h5 className="m-b-10 text-capitalize">{folderName}</h5>
        </div>
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/app">Home</Link>
          </li>
          <li className="breadcrumb-item text-capitalize">{fileName}</li>
        </ul>
      </div>
      <div className="page-header-right ms-auto">
        <div className={`page-header-right-items ${openSidebar ? 'page-header-right-open' : ''}`}>
          <div className="d-flex d-md-none">
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                setOpenSidebar(false);
              }}
              className="page-header-right-close-toggle"
            >
              <FiArrowLeft size={16} className="me-2" />
              <span>Back</span>
            </Link>
          </div>
          {children}
        </div>
        <div className="d-md-none d-flex align-items-center">
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              setOpenSidebar(true);
            }}
            className="page-header-right-open-toggle"
          >
            <FiAlignRight className="fs-20" />
          </Link>
        </div>
      </div>
    </div>
  );
};

