import React from 'react';

interface StepperProps {
  current: number;
  total: number;
}

const Stepper: React.FC<StepperProps> = ({ current, total }) => (
  <div className="space-y-2">
    <div className="text-sm font-semibold text-slate-700">
      Step {current} of {total}
    </div>
    <div className="h-2 w-full rounded-full bg-slate-100">
      <div className="h-full rounded-full bg-primary-500" style={{ width: `${(current / total) * 100}%` }} />
    </div>
  </div>
);

export default Stepper;
