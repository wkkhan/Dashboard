import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const PageHeaderDate: React.FC = () => {
  return (
    <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
      <div className="filter-dropdown">
        <Link
          className="btn btn-md btn-light-brand"
          to="#"
          data-bs-toggle="dropdown"
          data-bs-offset="0, 10"
          data-bs-auto-close="outside"
          onClick={(e) => e.preventDefault()}
        >
          <i className="me-2">
            <FiFilter />
          </i>
          <span>Filter</span>
        </Link>
        <div className="dropdown-menu dropdown-menu-end">
          <Link to="#" className="dropdown-item" onClick={(e) => e.preventDefault()}>
            <FiFilter size={16} className="me-3" />
            <span>Manage Filter</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

