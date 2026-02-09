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
import { riskDrivers } from '../data/mockData';

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
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Risk Assessment</h1>
        <p className="text-sm text-slate-500">AI-powered insights for clinical support</p>
      </div>
      <Card className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-slate-100" />
          <div>
            <h2 className="text-lg font-semibold">John Doe</h2>
            <p className="text-xs text-slate-500">Male, 54 Years · ID: #839210 · Blood: O+</p>
            <p className="text-xs text-slate-400">Last Visit: Oct 24, 2023</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">Update Vitals</Button>
          <Button>View History</Button>
        </div>
      </Card>
      <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Predicted Health Risks</h3>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600">
              <Download size={16} /> Download Report
            </button>
          </div>
          <Card className="space-y-6">
            {isLoading && <Skeleton height={120} />}
            {isError && <p className="text-sm text-red-500">Unable to load risk prediction.</p>}
            {data && (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-amber-50 p-3 text-amber-600">🖐️</div>
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{data.condition}</p>
                      <p className="text-sm text-slate-500">Metabolic condition affecting blood sugar.</p>
                    </div>
                  </div>
                  <span className="mt-3 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    Moderate Risk
                  </span>
                </div>
                <DonutChart value={data.confidence} />
              </div>
            )}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm">
              <div className="mb-2 font-semibold text-slate-700">AI Reasoning</div>
              Prediction based on elevated HbA1c levels (6.1%) trending upwards over last 6 months, combined with
              recent BMI increase (+1.2) and sedentary lifestyle markers. Family history contributes 15% to this
              risk score.
            </div>
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                Treatment & Management Approaches
              </div>
              <TreatmentTabs />
            </div>
          </Card>
          <Card className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-700">Key Risk Drivers</h3>
            <div className="space-y-3">
              {riskDrivers.map((driver) => (
                <RiskDriverBar
                  key={driver.label}
                  label={driver.label}
                  value={driver.value}
                  emphasis={driver.emphasis}
                />
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <VitalsSnapshot />
          <Card className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-700">Recommended Actions</h3>
            <div className="space-y-3">
              <div className="rounded-xl bg-amber-50 p-4 text-sm">
                <p className="font-semibold text-slate-900">Schedule Annual Checkup</p>
                <p className="text-xs text-slate-500">Due in 5 days. Early detection improves outcomes.</p>
              </div>
              <div className="rounded-xl border border-slate-100 p-4 text-sm">Book Lab Tests</div>
              <div className="rounded-xl border border-slate-100 p-4 text-sm">Dietary Plan Update</div>
            </div>
            <Button className="w-full">Consult a Specialist</Button>
          </Card>
        </div>
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
