import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { treatmentTabs } from '../../data/mockData';

const TreatmentTabs: React.FC = () => (
  <Tabs.Root defaultValue={treatmentTabs[0].id} className="space-y-4">
    <Tabs.List className="flex flex-wrap gap-2">
      {treatmentTabs.map((tab) => (
        <Tabs.Trigger
          key={tab.id}
          value={tab.id}
          className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 data-[state=active]:border-transparent data-[state=active]:bg-primary-500 data-[state=active]:text-white"
        >
          {tab.label}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
    {treatmentTabs.map((tab) => (
      <Tabs.Content key={tab.id} value={tab.id} className="space-y-2 text-sm text-slate-600">
        {tab.points.map((point) => (
          <p key={point}>• {point}</p>
        ))}
      </Tabs.Content>
    ))}
    <div className="text-xs text-slate-500">Disclaimer: Informational only, not medical advice.</div>
  </Tabs.Root>
);

export default TreatmentTabs;
