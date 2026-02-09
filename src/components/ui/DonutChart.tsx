import React from 'react';
import { Pie, PieChart, Cell } from 'recharts';
import { motion } from 'framer-motion';

interface DonutChartProps {
  value: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ value }) => {
  const data = [
    { name: 'confidence', value },
    { name: 'rest', value: 100 - value },
  ];

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
      <PieChart width={140} height={140}>
        <Pie data={data} innerRadius={48} outerRadius={64} dataKey="value" startAngle={90} endAngle={-270}>
          <Cell fill="#2aa1b3" />
          <Cell fill="#e5eef2" />
        </Pie>
      </PieChart>
      <div className="-mt-20 text-center">
        <div className="text-xl font-semibold text-slate-900">{value}%</div>
        <div className="text-xs text-slate-500">Confidence</div>
      </div>
    </motion.div>
  );
};

export default DonutChart;
