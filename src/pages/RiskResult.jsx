import React from 'react';
import AppLayout from '../layouts/AppLayout.jsx';
import Card from '../components/Card.jsx';
import Badge from '../components/Badge.jsx';
import Button from '../components/Button.jsx';
import DisclaimerBanner from '../components/DisclaimerBanner.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import Tabs from '../components/Tabs.jsx';
import { patientSummary, riskDrivers, treatmentTabs, vitalsSnapshot } from '../utils/mockData.js';

const RiskResult = () => {
  return (
    <AppLayout>
      <DisclaimerBanner />
      <div className="page-header">
        <h1>Risk Assessment Summary</h1>
        <p>AI-generated insights to support informed medical conversations.</p>
      </div>
      <section className="grid-two">
        <Card>
          <h3>Patient Summary</h3>
          <div className="summary-grid">
            <div>
              <span>Name</span>
              <strong>{patientSummary.name}</strong>
            </div>
            <div>
              <span>Age</span>
              <strong>{patientSummary.age}</strong>
            </div>
            <div>
              <span>Gender</span>
              <strong>{patientSummary.gender}</strong>
            </div>
            <div>
              <span>Blood Group</span>
              <strong>{patientSummary.bloodGroup}</strong>
            </div>
          </div>
        </Card>
        <Card>
          <h3>Predicted Health Risks</h3>
          <div className="risk-card">
            <div>
              <p className="risk-title">Type 2 Diabetes</p>
              <Badge tone="warning">Moderate</Badge>
            </div>
            <div className="confidence">
              <svg viewBox="0 0 120 120" role="img" aria-label="Confidence score 82%">
                <circle cx="60" cy="60" r="52" className="confidence-track" />
                <circle cx="60" cy="60" r="52" className="confidence-fill" />
              </svg>
              <div>
                <strong>82%</strong>
                <p>Confidence</p>
              </div>
            </div>
          </div>
        </Card>
      </section>
      <section className="grid-two">
        <Card>
          <h3>Vitals Snapshot</h3>
          <div className="summary-grid">
            {vitalsSnapshot.map((vital) => (
              <div key={vital.label}>
                <span>{vital.label}</span>
                <strong>{vital.value}</strong>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3>AI Interpretation</h3>
          <p className="muted">
            Based on the submitted symptoms and historical markers, the AI model highlights a moderate risk
            profile. The confidence indicates statistical likelihood, not a diagnosis. Please review these
            signals with a licensed professional for clinical decisions.
          </p>
          <p className="muted">
            Key contributors include elevated glucose indicators and family history patterns. The tone adapts
            with confidence to encourage proactive monitoring.
          </p>
        </Card>
      </section>
      <section className="grid-two">
        <Card>
          <h3>Key Risk Drivers</h3>
          <div className="driver-list">
            {riskDrivers.map((driver) => (
              <div key={driver.label} className={`driver ${driver.emphasis}`}>
                <ProgressBar value={driver.value} label={driver.label} />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3>Treatment Awareness</h3>
          <Tabs tabs={treatmentTabs} />
        </Card>
      </section>
      <section className="grid-two">
        <Card>
          <h3>Recommended Next Steps</h3>
          <div className="next-steps">
            <div>
              <h4>Schedule Annual Checkup</h4>
              <p>Book a routine review with your primary care provider.</p>
            </div>
            <div>
              <h4>Book Lab Tests</h4>
              <p>Consider confirming markers with a clinician-led lab panel.</p>
            </div>
            <div>
              <h4>Dietary Plan Update</h4>
              <p>Review nutrition goals with a certified specialist.</p>
            </div>
          </div>
        </Card>
        <Card>
          <h3>Actions</h3>
          <p className="muted">Navigate to supporting resources or dismiss this panel.</p>
          <div className="button-row">
            <Button>Consult a Specialist</Button>
            <Button variant="ghost">Dismiss</Button>
          </div>
          <p className="disclaimer-text">
            Disclaimer: These next steps are informational only and not medical advice.
          </p>
        </Card>
      </section>
    </AppLayout>
  );
};

export default RiskResult;
