import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-dot" />
        <div>
          <p className="brand-title">HealthIntel AI</p>
          <p className="brand-subtitle">Decision Support</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/risk-analysis">Risk Analysis</NavLink>
        <NavLink to="/history">History & Logs</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
      <div className="sidebar-footer">
        <p>For informational use only.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
