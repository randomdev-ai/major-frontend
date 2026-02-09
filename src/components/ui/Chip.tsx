import React from 'react';
import { cn } from '../../utils/styles';

interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'rounded-full border px-3 py-1 text-xs font-semibold transition',
      active ? 'border-primary-500 bg-primary-500 text-white' : 'border-slate-200 bg-slate-50 text-slate-700'
    )}
  >
    {label}
  </button>
);

export default Chip;
