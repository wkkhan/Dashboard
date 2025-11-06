import { useMerchants } from '../../../app/providers/MerchantProvider';
import { PageHeader } from '../../../shared/components/pageHeader/PageHeader';
import { PageHeaderDate } from '../../../shared/components/pageHeader/PageHeaderDate';
import { SiteOverviewStatistics } from '../../../shared/components/widgets/SiteOverviewStatistics';
import { PaymentRecordChart } from '../../../shared/components/widgets/PaymentRecordChart';
import { SalesMiscellaneous } from '../../../shared/components/widgets/SalesMiscellaneous';
import { TasksOverviewChart } from '../../../shared/components/widgets/TasksOverviewChart';
import { LeadsOverviewChart } from '../../../shared/components/widgets/LeadsOverviewChart';
import { LatestLeads } from '../../../shared/components/widgets/LatestLeads';
import { Schedule } from '../../../shared/components/widgets/Schedule';
import { Project } from '../../../shared/components/widgets/Project';
import { TeamProgress } from '../../../shared/components/widgets/TeamProgress';
import { Footer } from '../../../shared/components/Footer';

export function Dashboard() {
  const { activeMerchant } = useMerchants();
  const merchantName = activeMerchant?.profile?.name ?? activeMerchant?.merchantId ?? 'merchant';
  const merchantStatus = activeMerchant?.profile?.status;

  /* OLD CODE - Simple Bootstrap Layout
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h2 className="h5 mb-3">Overview</h2>
              <p className="text-muted mb-0">
                {activeMerchant
                  ? `You are viewing data for ${merchantName}${
                      merchantStatus ? ` (${merchantStatus})` : ''
                    }.`
                  : 'Select a merchant to begin exploring dashboard insights.'}
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h3 className="h6 text-uppercase text-muted">Next Steps</h3>
              <ul className="list-unstyled small mb-0">
                <li className="mb-2">Connect API credentials for live data.</li>
                <li className="mb-2">Review webhook statuses under Webhooks.</li>
                <li>Configure reporting preferences in Settings.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  */

  // NEW CODE - Duralux Dashboard Layout
  return (
    <>
      <PageHeader>
        <PageHeaderDate />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          {/* Merchant Overview Card - Using existing functionality */}
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <h2 className="h5 mb-3">Overview</h2>
                <p className="text-muted mb-0">
                  {activeMerchant
                    ? `You are viewing data for ${merchantName}${
                        merchantStatus ? ` (${merchantStatus})` : ''
                      }.`
                    : 'Select a merchant to begin exploring dashboard insights.'}
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps Card - Using existing functionality */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h3 className="h6 text-uppercase text-muted">Next Steps</h3>
                <ul className="list-unstyled small mb-0">
                  <li className="mb-2">Connect API credentials for live data.</li>
                  <li className="mb-2">Review webhook statuses under Webhooks.</li>
                  <li>Configure reporting preferences in Settings.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Duralux Statistics Cards */}
          <SiteOverviewStatistics />
          
          {/* Payment Record Chart */}
          <PaymentRecordChart />
          
          {/* Sales Miscellaneous */}
          <SalesMiscellaneous isFooterShow={true} />
          
          {/* Tasks Overview Chart */}
          <TasksOverviewChart />
          
          {/* Leads Overview Chart */}
          <LeadsOverviewChart chartHeight={315} />
          
          {/* Latest Leads Table */}
          <LatestLeads title="Latest Leads" />
          
          {/* Schedule */}
          <Schedule title="Upcoming Schedule" />
          
          {/* Project Status */}
          <Project cardYSpaceClass="hrozintioal-card" borderShow={true} title="Project Status" />
          
          {/* Team Progress */}
          <TeamProgress title="Team Progress" footerShow={true} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
