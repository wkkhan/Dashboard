import React from 'react';
import { FiBell, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface Notification {
  id: number;
  src: string;
  time: string;
  titleFirst: string;
  titleSecond: string;
}

const notificationsList: Notification[] = [
  {
    id: 1,
    src: '/images/avatar/2.png',
    time: '2',
    titleFirst: 'System',
    titleSecond: 'New transaction received',
  },
  {
    id: 2,
    src: '/images/avatar/3.png',
    time: '36',
    titleFirst: 'Merchant',
    titleSecond: 'Merchant profile updated',
  },
  {
    id: 3,
    src: '/images/avatar/4.png',
    time: '53',
    titleFirst: 'Webhook',
    titleSecond: 'Webhook delivery failed',
  },
];

export const NotificationsModal: React.FC = () => {
  return (
    <div className="dropdown nxl-h-item">
      <div className="nxl-head-link me-3" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
        <FiBell size={20} />
        <span className="badge bg-danger nxl-h-badge">{notificationsList.length}</span>
      </div>
      <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-notifications-menu">
        <div className="d-flex justify-content-between align-items-center notifications-head">
          <h6 className="fw-bold text-dark mb-0">Notifications</h6>
          <Link to="#" className="fs-11 text-success text-end ms-auto" data-bs-toggle="tooltip" title="Mark as Read">
            <FiCheck size={16} />
          </Link>
        </div>
        <div className="notifications-body">
          {notificationsList.map((notification) => (
            <Link key={notification.id} to="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img src={notification.src} alt="avatar" className="avatar-image avatar-sm me-3" />
                <div className="flex-fill">
                  <h6 className="mb-0 fs-13 fw-semibold text-dark">
                    {notification.titleFirst}
                  </h6>
                  <p className="mb-0 fs-11 text-muted">{notification.titleSecond}</p>
                  <span className="fs-10 text-muted">{notification.time} min ago</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="notifications-footer">
          <Link to="#" className="btn btn-primary btn-sm w-100">
            View All Notifications
          </Link>
        </div>
      </div>
    </div>
  );
};

