import React from 'react';

interface ProgressProps {
  value: number;
}

const Progress: React.FC<ProgressProps> = ({ value }) => (
  <div className="h-2 w-full rounded-full bg-slate-100">
    <div
      className="h-full rounded-full bg-primary-500 transition-all"
      style={{ width: `${value}%` }}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      role="progressbar"
    />
  </div>
);

export default Progress;
