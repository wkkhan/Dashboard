import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FiRefreshCw, FiMaximize2, FiX } from 'react-icons/fi';

interface ProjectItem {
  id: number;
  project_name: string;
  project_category: string;
  project_logo: string;
  progress: number;
  progress_color: string;
}

const projectsData: ProjectItem[] = [
  {
    id: 1,
    project_name: 'Dashboard Redesign',
    project_category: 'Web Development',
    project_logo: '/images/logo.png',
    progress: 75,
    progress_color: 'bg-primary',
  },
  {
    id: 2,
    project_name: 'API Integration',
    project_category: 'Backend',
    project_logo: '/images/logo.png',
    progress: 60,
    progress_color: 'bg-success',
  },
  {
    id: 3,
    project_name: 'Mobile App',
    project_category: 'Mobile Development',
    project_logo: '/images/logo.png',
    progress: 45,
    progress_color: 'bg-warning',
  },
];

interface ProjectProps {
  cardYSpaceClass?: string;
  borderShow?: boolean;
  title?: string;
}

export const Project: React.FC<ProjectProps> = ({ cardYSpaceClass = '', borderShow = false, title = 'Project Status' }) => {
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

        <div className="card-body custom-card-action project-status">
          <div className="mb-3">
            {projectsData.map(({ id, progress, project_category, project_logo, project_name, progress_color }, index) => (
              <Fragment key={id}>
                {borderShow && index !== 0 && <hr className="border-dashed my-3" />}
                <div className={`d-flex ${index === projectsData.length - 1 ? 'mb-0' : cardYSpaceClass || 'mb-3'}`}>
                  <div className="d-flex w-50 align-items-center me-3">
                    <img src={project_logo} alt="project-logo" className="me-3" width="35" />
                    <div>
                      <Link to="#" className="text-truncate-1-line d-block" onClick={(e) => e.preventDefault()}>
                        {project_name}
                      </Link>
                      <div className="fs-11 text-muted">{project_category}</div>
                    </div>
                  </div>
                  <div className="d-flex flex-grow-1 align-items-center">
                    <div className="progress w-100 me-3 ht-5">
                      <div className={`progress-bar ${progress_color}`} role="progressbar" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="text-muted">{progress}%</span>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <Link to="#" className="card-footer fs-11 fw-bold text-uppercase text-center" onClick={(e) => e.preventDefault()}>
          Upcoming Projects
        </Link>
      </div>
    </div>
  );
};

