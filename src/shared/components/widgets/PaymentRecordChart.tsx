import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { FiRefreshCw, FiMaximize2, FiX } from 'react-icons/fi';
import { paymentRecordChartOption } from '@/utils/chartsLogic/paymentRecordChartOption';

export const PaymentRecordChart: React.FC = () => {
  const chartOptions = paymentRecordChartOption();

  return (
    <div className="col-xxl-8">
      <div className="card stretch stretch-full">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h5 className="mb-0">Payment Record</h5>
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
          <ReactApexChart options={chartOptions} series={chartOptions.series} height={377} />
        </div>
        <div className="card-footer">
          <div className="row g-4">
            <div className="col-lg-3">
              <div className="p-3 border border-dashed rounded">
                <div className="fs-12 text-muted mb-1">Awaiting</div>
                <h6 className="fw-bold text-dark">$5,486</h6>
                <div className="progress mt-2 ht-3">
                  <div className="progress-bar bg-primary" role="progressbar" style={{ width: '81%' }}></div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="p-3 border border-dashed rounded">
                <div className="fs-12 text-muted mb-1">Completed</div>
                <h6 className="fw-bold text-dark">$9,275</h6>
                <div className="progress mt-2 ht-3">
                  <div className="progress-bar bg-success" role="progressbar" style={{ width: '81%' }}></div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="p-3 border border-dashed rounded">
                <div className="fs-12 text-muted mb-1">Rejected</div>
                <h6 className="fw-bold text-dark">$3,868</h6>
                <div className="progress mt-2 ht-3">
                  <div className="progress-bar bg-danger" role="progressbar" style={{ width: '81%' }}></div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="p-3 border border-dashed rounded">
                <div className="fs-12 text-muted mb-1">Revenue</div>
                <h6 className="fw-bold text-dark">$50,668</h6>
                <div className="progress mt-2 ht-3">
                  <div className="progress-bar bg-dark" role="progressbar" style={{ width: '81%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

