import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0 text-muted">
              &copy; {new Date().getFullYear()} Essaly. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-end">
            <p className="mb-0 text-muted">
              Version 1.0.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

