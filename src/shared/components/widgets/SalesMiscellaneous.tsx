import React, { Fragment } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { estimateAreaChartOptions } from '@/utils/chartsLogic/estimateAreaChartOptions';

interface SalesItem {
  image: string;
  price: string;
  name: string;
  sold: string;
}

const salesData: SalesItem[] = [
  {
    image: '/images/logo.png',
    price: '$1,250',
    name: 'Product A',
    sold: '125',
  },
  {
    image: '/images/logo.png',
    price: '$2,450',
    name: 'Product B',
    sold: '89',
  },
  {
    image: '/images/logo.png',
    price: '$3,200',
    name: 'Product C',
    sold: '156',
  },
];

interface SalesMiscellaneousProps {
  isFooterShow?: boolean;
  dataList?: SalesItem[];
}

export const SalesMiscellaneous: React.FC<SalesMiscellaneousProps> = ({ isFooterShow, dataList = salesData }) => {
  const chartOption = estimateAreaChartOptions();
  const data = [20, 10, 18, 12, 25, 10, 20];

  return (
    <div className="col-xxl-4">
      <div className="card stretch stretch-full overflow-hidden">
        <div className="bg-primary text-white">
          <div className="p-4">
            <span className="badge bg-light text-primary text-dark float-end">12%</span>
            <div className="text-start">
              <h4 className="text-reset">30,569</h4>
              <p className="text-reset m-0">Total Sales</p>
            </div>
          </div>
          <ReactApexChart
            options={{ ...chartOption, colors: ['#93a9ff'] }}
            series={[{ name: 'Total Sales', data }]}
            type="area"
            height={150}
          />
        </div>
        <div className="card-body">
          {dataList.slice(0, 3).map(({ image, price, name, sold }, index) => (
            <Fragment key={index}>
              {index !== 0 && <hr className="border-dashed my-3"></hr>}
              <div className="d-flex align-items-center justify-content-between">
                <div className="hstack gap-3">
                  <div className="avatar-image avatar-lg rounded">
                    <img className="img-fluid" src={image} alt="img" />
                  </div>
                  <div>
                    <Link to="#" className="d-block" onClick={(e) => e.preventDefault()}>
                      {name}
                    </Link>
                    <span className="fs-12 text-muted">Electronics</span>
                  </div>
                </div>
                <div>
                  <div className="fw-bold text-dark">{price}</div>
                  <div className="fs-12 text-end">{sold} sold</div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        {isFooterShow && (
          <Link to="#" className="card-footer fs-11 fw-bold text-uppercase text-center py-4" onClick={(e) => e.preventDefault()}>
            Full Details
          </Link>
        )}
      </div>
    </div>
  );
};

