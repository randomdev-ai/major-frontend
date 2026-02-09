import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import InfoBanner from '../components/ui/InfoBanner';

const logs = [
  { id: 'HX-2041', time: '2024-08-18 10:24 AM', risk: 'Moderate' },
  { id: 'HX-1994', time: '2024-08-12 08:14 AM', risk: 'Low' },
  { id: 'HX-1920', time: '2024-07-30 03:02 PM', risk: 'High' },
  { id: 'HX-1870', time: '2024-07-16 09:47 AM', risk: 'Moderate' },
];

const HistoryLogsPage: React.FC = () => (
  <div className="space-y-6">
    <InfoBanner />
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">History & Logs</h1>
      <p className="text-sm text-slate-500">Review past analyses and audit-friendly summaries.</p>
    </div>
    <Card className="space-y-4">
      {logs.map((log) => (
        <div key={log.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">{log.id}</p>
            <p className="text-xs text-slate-500">{log.time}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {log.risk}
            </span>
            <Button variant="outline">View details</Button>
          </div>
        </div>
      ))}
    </Card>
  </div>
);

export default HistoryLogsPage;
