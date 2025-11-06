import { Outlet } from 'react-router-dom';

function PublicLayout() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container" style={{ maxWidth: '420px' }}>
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicLayout;
