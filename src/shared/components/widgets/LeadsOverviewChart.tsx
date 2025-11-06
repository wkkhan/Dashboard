import React from 'react';
import { Link } from 'react-router-dom';
import { FiRefreshCw, FiMaximize2, FiX } from 'react-icons/fi';

interface LeadsUserOverview {
  id: number;
  number: string;
  title: string;
}

const leadsUserOverview: LeadsUserOverview[] = [
  { id: 1, number: '12', title: 'New' },
  { id: 2, number: '8', title: 'Contacted' },
  { id: 3, number: '15', title: 'Qualified' },
];

interface LeadsOverviewChartProps {
  chartHeight?: number;
  isFooterShow?: boolean;
}

export const LeadsOverviewChart: React.FC<LeadsOverviewChartProps> = ({ chartHeight = 315, isFooterShow }) => {
  return (
    <div className="col-xxl-4">
      <div className="card stretch stretch-full leads-overview">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h5 className="mb-0">Leads Overview</h5>
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
          <div style={{ height: `${chartHeight}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa', borderRadius: '8px', marginBottom: '16px' }}>
            <div className="text-center">
              <div className="mb-2">
                <div className="d-inline-block wd-100 ht-100 rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center">
                  <span className="fs-24 fw-bold text-primary">65%</span>
                </div>
              </div>
              <p className="text-muted mb-0">Total Leads</p>
            </div>
          </div>
          <div className="row g-2 pt-2">
            {leadsUserOverview.map(({ id, number, title }) => (
              <div key={id} className="col-4">
                <Link to="#" className="p-2 hstack gap-2 rounded border border-dashed border-gray-5" onClick={(e) => e.preventDefault()}>
                  <span className={`wd-7 ht-7 rounded-circle d-inline-block circle-${id}`} style={{ background: id === 1 ? '#4F1D8C' : id === 2 ? '#25b865' : '#d13b4c' }}></span>
                  <span>
                    {title}
                    <span className="fs-10 text-muted ms-1">({number}K)</span>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {isFooterShow && (
          <Link to="#" className="card-footer fs-11 fw-bold text-uppercase text-center" onClick={(e) => e.preventDefault()}>
            Update: 50 Min Ago
          </Link>
        )}
      </div>
    </div>
  );
};

