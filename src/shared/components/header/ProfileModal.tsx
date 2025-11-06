import React from 'react';
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import { useAuth } from '../../../app/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

interface ProfileModalProps {
  onLogout: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onLogout }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="dropdown nxl-h-item">
      <a href="#" className="nxl-head-link" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
        <img src="/images/avatar/1.png" alt="user-image" className="img-fluid user-avtar me-0" />
      </a>
      <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown">
        <div className="dropdown-header">
          <div className="d-flex align-items-center">
            <img src="/images/avatar/1.png" alt="user-image" className="img-fluid user-avtar" />
            <div>
              <h6 className="text-dark mb-0">{user?.email?.split('@')[0] ?? 'User'}</h6>
              <span className="fs-12 fw-medium text-muted">{user?.email ?? 'No email'}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-divider"></div>
        <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); navigate('/app/settings/profile'); }}>
          <i className="me-2">
            <FiUser size={16} />
          </i>
          <span>Profile Details</span>
        </a>
        <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); navigate('/app/settings'); }}>
          <i className="me-2">
            <FiSettings size={16} />
          </i>
          <span>Account Settings</span>
        </a>
        <div className="dropdown-divider"></div>
        <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); onLogout(); }}>
          <i className="me-2">
            <FiLogOut size={16} />
          </i>
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

