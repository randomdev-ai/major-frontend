import React from 'react';
import { cn } from '../../utils/styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, ...props }) => {
  const base =
    'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500';
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    secondary: 'bg-slate-900 text-white hover:bg-slate-800',
    ghost: 'bg-primary-50 text-primary-700 hover:bg-primary-100',
    outline: 'border border-slate-200 text-slate-900 hover:bg-slate-50',
  };
  return <button className={cn(base, variants[variant], className)} {...props} />;
};

export default Button;
