import React from 'react';
import Progress from './Progress';
import { cn } from '../../utils/styles';

interface RiskDriverBarProps {
  label: string;
  value: number;
  emphasis: 'primary' | 'secondary';
}

const RiskDriverBar: React.FC<RiskDriverBarProps> = ({ label, value, emphasis }) => (
  <div className={cn('rounded-xl border p-3', emphasis === 'primary' ? 'border-primary-200' : 'border-slate-200')}>
    <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-600">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <Progress value={value} />
  </div>
);

export default RiskDriverBar;
