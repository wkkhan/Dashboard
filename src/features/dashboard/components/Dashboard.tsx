import { useMerchants } from '../../../app/providers/MerchantProvider';

export function Dashboard() {
  const { activeMerchant } = useMerchants();
  const merchantName = activeMerchant?.profile?.name ?? activeMerchant?.merchantId ?? 'merchant';
  const merchantStatus = activeMerchant?.profile?.status;

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
}

export default Dashboard;
