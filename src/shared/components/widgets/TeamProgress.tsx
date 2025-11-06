import React from 'react';
import { Link } from 'react-router-dom';
import { FiRefreshCw, FiMaximize2, FiX } from 'react-icons/fi';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  progress: number;
  thumbnail?: string;
  color: string;
}

const teamMembersList: TeamMember[] = [
  {
    id: 1,
    name: 'Alexandra Della',
    position: 'Project Manager',
    progress: 85,
    thumbnail: '/images/avatar/1.png',
    color: 'primary',
  },
  {
    id: 2,
    name: 'Green Cute',
    position: 'Developer',
    progress: 72,
    thumbnail: '/images/avatar/2.png',
    color: 'success',
  },
  {
    id: 3,
    name: 'Valentine Maton',
    position: 'Designer',
    progress: 68,
    thumbnail: '/images/avatar/3.png',
    color: 'warning',
  },
  {
    id: 4,
    name: 'Archie Cantones',
    position: 'QA Engineer',
    progress: 90,
    thumbnail: '/images/avatar/4.png',
    color: 'danger',
  },
];

interface TeamProgressProps {
  footerShow?: boolean;
  title?: string;
}

export const TeamProgress: React.FC<TeamProgressProps> = ({ footerShow, title = 'Team Progress' }) => {
  return (
    <div className="col-xxl-4">
      <div className="card stretch stretch-full">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h5 className="mb-0">{title}</h5>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-light" title="Refresh">
              <FiRefreshCw size={16} />
            </button>
            <button className="btn btn-sm btn-light" title="Expand">
              <FiMaximize2 size={16} />
            </button>
            <button className="btn btn-sm btn-light" title="Remove">
              <FiX size={16} />
            </button>
          </div>
        </div>

        <div className="card-body custom-card-action">
          {teamMembersList.map(({ id, name, position, progress, thumbnail, color }) => (
            <div key={id} className="hstack justify-content-between border border-dashed rounded-3 p-3 team-card chat-single-item mb-3">
              <div className="hstack gap-3">
                {thumbnail ? (
                  <div className="avatar-image">
                    <img src={thumbnail} alt="img" className="img-fluid" />
                  </div>
                ) : (
                  <div className="text-white avatar-text user-avatar-text">{name.substring(0, 1)}</div>
                )}
                <div>
                  <Link to="#" onClick={(e) => e.preventDefault()}>
                    {name}
                  </Link>
                  <div className="fs-11 text-muted">{position}</div>
                </div>
              </div>
              <div className="team-progress">
                <div className="d-flex align-items-center">
                  <div className="wd-50 ht-50 rounded-circle border border-3 d-flex align-items-center justify-content-center" style={{ borderColor: `var(--bs-${color})`, color: `var(--bs-${color})` }}>
                    <span className="fs-12 fw-bold">{progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {footerShow && (
          <Link to="#" className="card-footer fs-11 fw-bold text-uppercase text-center" onClick={(e) => e.preventDefault()}>
            Update 30 Min Ago
          </Link>
        )}
      </div>
    </div>
  );
};

