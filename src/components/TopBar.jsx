import React from 'react';

const TopBar = () => {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <input type="search" placeholder="Search health profiles, reports..." aria-label="Search" />
      </div>
      <div className="topbar-actions">
        <button className="icon-btn" type="button" aria-label="Notifications">
          🔔
        </button>
        <div className="avatar" aria-label="User avatar">
          JB
        </div>
      </div>
    </header>
  );
};

export default TopBar;
