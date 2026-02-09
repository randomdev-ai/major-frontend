import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import InfoBanner from '../components/ui/InfoBanner';

const PatientProfilePage: React.FC = () => (
  <div className="space-y-6">
    <InfoBanner />
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Patient Profile</h1>
      <p className="text-sm text-slate-500">Reference demographics and recent visits.</p>
    </div>
    <Card className="flex flex-wrap items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-slate-100" />
        <div>
          <h2 className="text-lg font-semibold text-slate-900">John Doe</h2>
          <p className="text-xs text-slate-500">Male, 54 Years · ID: #839210 · Blood: O+</p>
          <p className="text-xs text-slate-400">Last Visit: Oct 24, 2023</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline">Update details</Button>
        <Button>Start new case</Button>
      </div>
    </Card>
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-700">Care Team Notes</h3>
        <p className="text-sm text-slate-500">
          Patient prefers morning appointments. Monitoring metabolic risk indicators and family history notes.
        </p>
      </Card>
      <Card className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-700">Recent Activity</h3>
        <ul className="space-y-2 text-sm text-slate-500">
          <li>• Uploaded lab results (Aug 18, 2024)</li>
          <li>• Completed symptom intake (Aug 18, 2024)</li>
          <li>• Risk report generated (Aug 18, 2024)</li>
        </ul>
      </Card>
    </div>
  </div>
);

export default PatientProfilePage;
