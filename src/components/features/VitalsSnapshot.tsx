import React from 'react';
import Card from '../ui/Card';
import { vitalsSnapshot } from '../../data/mockData';

const VitalsSnapshot: React.FC = () => (
  <Card>
    <h3 className="text-sm font-semibold text-slate-700">Vitals Snapshot</h3>
    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
      {vitalsSnapshot.map((vital) => (
        <div key={vital.label}>
          <p className="text-xs text-slate-500">{vital.label}</p>
          <p className="font-semibold text-slate-900">{vital.value}</p>
        </div>
      ))}
    </div>
  </Card>
);

export default VitalsSnapshot;
