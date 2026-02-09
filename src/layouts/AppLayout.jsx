import React from 'react';
import Sidebar from '../components/Sidebar.jsx';
import TopBar from '../components/TopBar.jsx';

const AppLayout = ({ children }) => {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <TopBar />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
