import React from 'react';
import { Link } from 'react-router-dom';
import { FiMoreVertical, FiDollarSign, FiBriefcase, FiActivity, FiUsers } from 'react-icons/fi';
import { getIcon } from '@/utils/getIcon';

interface StatisticItem {
  id: number;
  title: string;
  total_number: string;
  completed_number?: string;
  progress: string;
  progress_info: string;
  icon: string;
}

const statisticsData: StatisticItem[] = [
  {
    id: 1,
    title: 'Total Transactions',
    total_number: '1,245',
    completed_number: '856',
    progress: '68%',
    progress_info: '$125,450',
    icon: 'feather-dollar-sign',
  },
  {
    id: 2,
    title: 'Active Merchants',
    total_number: '86',
    completed_number: '48',
    progress: '56%',
    progress_info: '48 Active',
    icon: 'feather-briefcase',
  },
  {
    id: 3,
    title: 'Webhooks',
    total_number: '120',
    completed_number: '95',
    progress: '79%',
    progress_info: '95 Configured',
    icon: 'feather-activity',
  },
  {
    id: 4,
    title: 'Success Rate',
    total_number: '94.5%',
    completed_number: '',
    progress: '94%',
    progress_info: '$2,254',
    icon: 'feather-activity',
  },
];

export const SiteOverviewStatistics: React.FC = () => {
  return (
    <>
      {statisticsData.map(({ id, completed_number, progress, progress_info, title, total_number, icon }) => (
        <div key={id} className="col-xxl-3 col-md-6">
          <div className="card stretch stretch-full short-info-card">
            <div className="card-body">
              <div className="d-flex align-items-start justify-content-between mb-4">
                <div className="d-flex gap-4 align-items-center">
                  <div className="avatar-text avatar-lg bg-gray-200 icon">
                    {getIcon(icon)}
                  </div>
                  <div>
                    <div className="fs-4 fw-bold text-dark">
                      <span className="counter">{completed_number ? completed_number + '/' : ''}</span>
                      <span className="counter">{total_number}</span>
                    </div>
                    <h3 className="fs-13 fw-semibold text-truncate-1-line">{title}</h3>
                  </div>
                </div>
                <Link to="#" className="lh-1" onClick={(e) => e.preventDefault()}>
                  <FiMoreVertical className="fs-16" />
                </Link>
              </div>
              <div className="pt-4">
                <div className="d-flex align-items-center justify-content-between">
                  <Link to="#" className="fs-12 fw-medium text-muted text-truncate-1-line" onClick={(e) => e.preventDefault()}>
                    {title}
                  </Link>
                  <div className="w-100 text-end">
                    <span className="fs-12 text-dark">{progress_info}</span>{' '}
                    <span className="fs-11 text-muted">({progress})</span>
                  </div>
                </div>
                <div className="progress mt-2 ht-3">
                  <div className={`progress-bar progress-${id}`} role="progressbar" style={{ width: progress }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

