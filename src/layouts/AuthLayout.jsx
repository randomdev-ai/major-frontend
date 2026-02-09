import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ title, subtitle, children, footer }) => {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="brand-link">
            HealthIntel AI
          </Link>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {children}
        {footer && <div className="auth-footer">{footer}</div>}
        <div className="auth-note">For informational use only.</div>
      </div>
    </div>
  );
};

export default AuthLayout;
