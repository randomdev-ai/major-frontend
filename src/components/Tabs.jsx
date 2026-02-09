import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [active, setActive] = useState(tabs[0]?.id);
  const activeTab = tabs.find((tab) => tab.id === active);

  return (
    <div className="tabs">
      <div className="tab-list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            className={`tab-btn ${active === tab.id ? 'active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-panel" role="tabpanel">
        <ul>
          {activeTab?.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p className="tab-disclaimer">These options are informational only and not medical advice.</p>
      </div>
    </div>
  );
};

export default Tabs;
