import React from 'react';
import { Link } from 'react-router-dom';
import { FiMoreVertical, FiRefreshCw, FiMaximize2, FiX } from 'react-icons/fi';

interface UserItem {
  id: number;
  user_name: string;
  user_email: string;
  user_img?: string;
  proposal: string;
  date: string;
  user_status: string;
  color: string;
}

const userList: UserItem[] = [
  {
    id: 1,
    user_name: 'Alexandra Della',
    user_email: 'alex.della@outlook.com',
    user_img: '/images/avatar/1.png',
    proposal: '$2,450',
    date: '12 Jan 2024',
    user_status: 'Active',
    color: 'success',
  },
  {
    id: 2,
    user_name: 'Green Cute',
    user_email: 'green.cute@outlook.com',
    user_img: '/images/avatar/2.png',
    proposal: '$1,850',
    date: '10 Jan 2024',
    user_status: 'Pending',
    color: 'warning',
  },
  {
    id: 3,
    user_name: 'Valentine Maton',
    user_email: 'valentine.maton@outlook.com',
    user_img: '/images/avatar/3.png',
    proposal: '$3,200',
    date: '08 Jan 2024',
    user_status: 'Active',
    color: 'success',
  },
  {
    id: 4,
    user_name: 'Archie Cantones',
    user_email: 'archie.cantones@outlook.com',
    user_img: '/images/avatar/4.png',
    proposal: '$1,250',
    date: '05 Jan 2024',
    user_status: 'Inactive',
    color: 'danger',
  },
  {
    id: 5,
    user_name: 'John Doe',
    user_email: 'john.doe@outlook.com',
    proposal: '$4,500',
    date: '03 Jan 2024',
    user_status: 'Active',
    color: 'success',
  },
];

interface LatestLeadsProps {
  title?: string;
}

export const LatestLeads: React.FC<LatestLeadsProps> = ({ title = 'Latest Leads' }) => {
  return (
    <div className="col-xxl-8">
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

        <div className="card-body custom-card-action p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr className="border-b">
                  <th scope="row">Users</th>
                  <th>Proposal</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userList.map(({ date, id, proposal, user_email, user_img, user_name, user_status, color }) => (
                  <tr key={id} className="chat-single-item">
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        {user_img ? (
                          <div className="avatar-image">
                            <img src={user_img} alt="user-img" className="img-fluid" />
                          </div>
                        ) : (
                          <div className="text-white avatar-text user-avatar-text">{user_name.substring(0, 1)}</div>
                        )}
                        <Link to="#" onClick={(e) => e.preventDefault()}>
                          <span className="d-block">{user_name}</span>
                          <span className="fs-12 d-block fw-normal text-muted">{user_email}</span>
                        </Link>
                      </div>
                    </td>
                    <td>
                      <span className="fw-semibold text-dark">{proposal}</span>
                    </td>
                    <td>
                      <span className="fs-12 text-muted">{date}</span>
                    </td>
                    <td>
                      <span className={`badge bg-soft-${color} text-${color}`}>{user_status}</span>
                    </td>
                    <td className="text-end">
                      <Link to="#" className="lh-1" onClick={(e) => e.preventDefault()}>
                        <FiMoreVertical className="fs-16" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

