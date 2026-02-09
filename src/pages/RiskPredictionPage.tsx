import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import DonutChart from '../components/ui/DonutChart';
import RiskDriverBar from '../components/ui/RiskDriverBar';
import VitalsSnapshot from '../components/features/VitalsSnapshot';
import TreatmentTabs from '../components/features/TreatmentTabs';
import InfoBanner from '../components/ui/InfoBanner';
import { fetchRiskPrediction } from '../mocks/api';
import { emitAuditEvent } from '../mocks/audit';
import { usePatientStore } from '../stores/usePatientStore';

const RiskPredictionPage: React.FC = () => {
  const patient = usePatientStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['riskPrediction'],
    queryFn: fetchRiskPrediction,
  });

  useEffect(() => {
    emitAuditEvent('report_viewed');
  }, []);

  return (
    <div className="space-y-6">
      <InfoBanner />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Risk Assessment Summary</h1>
          <p className="text-sm text-slate-600">AI-generated insights to support informed medical conversations.</p>
        </div>
        <Link to="/patients/123/risk/explain">
          <Button variant="outline">Why this result?</Button>
        </Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="text-sm font-semibold text-slate-700">Patient Summary</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-slate-500">Name</p>
              <p className="font-semibold text-slate-900">{patient.name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Age</p>
              <p className="font-semibold text-slate-900">{patient.age}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Gender</p>
              <p className="font-semibold text-slate-900">{patient.gender}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Blood Group</p>
              <p className="font-semibold text-slate-900">{patient.bloodGroup}</p>
            </div>
          </div>
        </Card>
        <Card className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Predicted Health Risks</h3>
          {isLoading && <Skeleton height={120} />}
          {isError && <p className="text-sm text-red-500">Unable to load risk prediction.</p>}
          {data && (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-slate-900">{data.condition}</p>
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  {data.riskLevel}
                </span>
              </div>
              <DonutChart value={data.confidence} />
            </div>
          )}
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <VitalsSnapshot />
        <Card className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">AI Interpretation</h3>
          <p className="text-sm text-slate-600">
            The model indicates a moderate risk profile. Confidence reflects statistical likelihood, not a
            diagnosis. Please review these signals with a licensed professional for clinical decisions.
          </p>
          <p className="text-sm text-slate-600">
            Key contributors include elevated glucose indicators and family history patterns. With moderate
            confidence, the tone emphasizes proactive monitoring.
          </p>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Key Risk Drivers</h3>
          {isLoading && <Skeleton height={120} />}
          {data && (
            <div className="space-y-3">
              {data.factors.map((factor, index) => (
                <RiskDriverBar
                  key={factor.label}
                  label={factor.label}
                  value={factor.value}
                  emphasis={index < 2 ? 'primary' : 'secondary'}
                />
              ))}
            </div>
          )}
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-slate-700">Treatment Awareness</h3>
          <div className="mt-4">
            <TreatmentTabs />
          </div>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">Recommended Next Steps</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Schedule annual checkup with your primary care provider.</li>
            <li>Book lab tests to confirm key markers.</li>
            <li>Review dietary plan updates with a specialist.</li>
          </ul>
          <div className="flex flex-wrap gap-2">
            <Button>Consult a Specialist</Button>
            <Button variant="ghost">Dismiss</Button>
          </div>
        </Card>
        <Card className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">Data handling</h3>
          <p className="text-sm text-slate-600">
            Data is processed in-memory. No PHI is stored in local or session storage. Audit events are logged
            to a mock endpoint for transparency.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default RiskPredictionPage;
