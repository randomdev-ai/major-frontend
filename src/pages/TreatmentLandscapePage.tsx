import React from 'react';
import Card from '../components/ui/Card';
import InfoBanner from '../components/ui/InfoBanner';
import TreatmentTabs from '../components/features/TreatmentTabs';

const TreatmentLandscapePage: React.FC = () => (
  <div className="space-y-6">
    <InfoBanner />
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Treatment Landscape: Migraine</h1>
      <p className="text-sm text-slate-600">Explore informational treatment approaches with clear disclaimers.</p>
    </div>
    <Card>
      <TreatmentTabs />
    </Card>
  </div>
);

export default TreatmentLandscapePage;
