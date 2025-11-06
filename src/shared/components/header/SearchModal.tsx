import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export const SearchModal: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="dropdown nxl-h-item">
      <div className="nxl-head-link me-3" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
        <FiSearch size={20} />
      </div>
      <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-search-menu">
        <div className="search-input-outer">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="search-results">
          <p className="text-muted text-center p-3 mb-0">Start typing to search...</p>
        </div>
      </div>
    </div>
  );
};

