import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import InfoBanner from '../components/ui/InfoBanner';
import VitalsSnapshot from '../components/features/VitalsSnapshot';
import { emitAuditEvent } from '../mocks/audit';

const PatientRiskDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <InfoBanner />
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Patient Risk Dashboard</h1>
        <p className="text-sm text-slate-600">Clinician view with vitals and recent analyses.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
        <Card className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Recent analyses</h3>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">Metabolic risk screening</p>
                <p className="text-xs text-slate-500">Aug 18, 2024 · HX-2041</p>
              </div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                Moderate
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="font-semibold text-slate-900">Cardiovascular baseline</p>
                <p className="text-xs text-slate-500">Aug 12, 2024 · HX-1994</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Low
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">Lifestyle impact review</p>
                <p className="text-xs text-slate-500">Jul 30, 2024 · HX-1920</p>
              </div>
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">High</span>
            </div>
          </div>
        </Card>
        <div className="space-y-6">
          <VitalsSnapshot />
          <Card className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Exports</h3>
            <p className="text-sm text-slate-600">Export summary for clinician review (mock).</p>
            <Button
              onClick={() => {
                emitAuditEvent('export_clicked');
              }}
            >
              Export report
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientRiskDashboard;
