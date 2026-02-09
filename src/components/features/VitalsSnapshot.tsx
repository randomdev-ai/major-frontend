import React from 'react';
import Card from '../ui/Card';
import { vitalsSnapshot } from '../../data/mockData';

const VitalsSnapshot: React.FC = () => (
  <Card className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold text-slate-700">Vitals Snapshot</h3>
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">Today, 09:00 AM</span>
    </div>
    <div className="grid grid-cols-2 gap-3">
      {vitalsSnapshot.map((vital) => (
        <div key={vital.label} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
          <div className="text-lg">{vital.icon}</div>
          <p className="mt-1 text-xs text-slate-500">{vital.label}</p>
          <p className="text-sm font-semibold text-slate-900">{vital.value}</p>
        </div>
      ))}
    </div>
  </Card>
);

export default VitalsSnapshot;
