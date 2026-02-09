import React from 'react';

const Stepper = ({ current = 1, total = 3 }) => {
  return (
    <div className="stepper">
      <div className="stepper-info">
        Step {current} of {total}
      </div>
      <div className="stepper-track">
        <div className="stepper-progress" style={{ width: `${(current / total) * 100}%` }} />
      </div>
    </div>
  );
};

export default Stepper;
