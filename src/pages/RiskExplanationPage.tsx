import React from 'react';
import Card from '../components/ui/Card';
import InfoBanner from '../components/ui/InfoBanner';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const RiskExplanationPage: React.FC = () => (
  <div className="space-y-6">
    <InfoBanner />
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">AI Reasoning</h1>
        <p className="text-sm text-slate-600">Plain-language interpretation of the risk summary.</p>
      </div>
      <Link to="/patients/123/risk">
        <Button variant="outline">Back to summary</Button>
      </Link>
    </div>
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-700">Why this risk was predicted</h3>
        <p className="text-sm text-slate-600">
          The AI model identifies patterns in reported symptoms and lab markers that align with moderate risk
          indicators for metabolic conditions. Confidence reflects statistical likelihood rather than a
          definitive diagnosis.
        </p>
        <p className="text-sm text-slate-600">
          The explanation adapts to confidence levels, emphasizing proactive conversations and routine
          monitoring when moderate confidence is detected.
        </p>
      </Card>
      <Card className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-700">Key contributing factors</h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>Elevated HbA1c trend and fasting glucose markers.</li>
          <li>Reported fatigue combined with lifestyle indicators.</li>
          <li>Family history increases statistical weight.</li>
        </ul>
        <p className="text-xs text-slate-500">This interpretation is informational and not medical advice.</p>
      </Card>
    </div>
  </div>
);

export default RiskExplanationPage;
