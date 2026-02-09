import React from 'react';
import { cn } from '../../utils/styles';

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('rounded-2xl bg-white p-6 shadow-card', className)} {...props} />
);

export default Card;
