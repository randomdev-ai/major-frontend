import React from 'react';

const ProgressBar = ({ value = 0, label }) => {
  return (
    <div className="progress">
      <div className="progress-meta">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
