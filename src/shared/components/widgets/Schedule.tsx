import React from 'react';
import { Link } from 'react-router-dom';
import { FiRefreshCw, FiMaximize2, FiX } from 'react-icons/fi';

interface ScheduleItem {
  id: number;
  schedule_name: string;
  date: {
    day: string;
    month: string;
    time: string;
  };
  team_members: string[];
  color: string;
}

const upcomingScheduleList: ScheduleItem[] = [
  {
    id: 1,
    schedule_name: 'Team Meeting',
    date: { day: '15', month: 'Jan', time: '10:00 AM' },
    team_members: ['/images/avatar/1.png', '/images/avatar/2.png'],
    color: 'primary',
  },
  {
    id: 2,
    schedule_name: 'Client Presentation',
    date: { day: '18', month: 'Jan', time: '02:00 PM' },
    team_members: ['/images/avatar/3.png', '/images/avatar/4.png'],
    color: 'success',
  },
  {
    id: 3,
    schedule_name: 'Project Review',
    date: { day: '20', month: 'Jan', time: '11:00 AM' },
    team_members: ['/images/avatar/1.png'],
    color: 'warning',
  },
];

interface ScheduleProps {
  title?: string;
}

export const Schedule: React.FC<ScheduleProps> = ({ title = 'Upcoming Schedule' }) => {
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

        <div className="card-body">
          {upcomingScheduleList.map(({ date, id, schedule_name, team_members, color }) => (
            <div key={id} className="p-3 border border-dashed rounded-3 schedule-card mb-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <div className={`wd-50 ht-50 lh-1 d-flex align-items-center justify-content-center flex-column rounded-2 bg-soft-${color} text-${color} schedule-date`}>
                    <span className="fs-18 fw-bold mb-1 d-block">{date.day}</span>
                    <span className="fs-10 fw-semibold text-uppercase d-block">{date.month}</span>
                  </div>
                  <div className="text-dark">
                    <Link to="#" className="fw-bold mb-2 text-truncate-1-line d-block" onClick={(e) => e.preventDefault()}>
                      {schedule_name}
                    </Link>
                    <span className="fs-11 fw-normal text-muted text-truncate-1-line">{date.time}</span>
                  </div>
                </div>
                <div className="img-group lh-0 ms-3 justify-content-start d-none d-sm-flex">
                  {team_members.map((img, idx) => (
                    <div key={idx} className="avatar-image avatar-md" style={{ marginLeft: idx > 0 ? '-10px' : '0' }}>
                      <img src={img} alt="team-member" className="img-fluid" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link to="#" className="card-footer fs-11 fw-bold text-uppercase text-center py-4" onClick={(e) => e.preventDefault()}>
          Upcoming Schedule
        </Link>
      </div>
    </div>
  );
};

