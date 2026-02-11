import { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import CircularMeter from '../components/CircularMeter';
import Loader from '../components/Loader';
import { postFullAnalysis } from '../api/healthApi';

const tabs = ['Modern Medicine', 'Ayurveda', 'Homeopathy', 'Lifestyle'];

const FullAnalysisPage = () => {
  const [form, setForm] = useState({ symptoms: '', age: '', gender: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const runAnalysis = async (event) => {
    event.preventDefault();
    if (!form.symptoms.trim() || !form.age || !form.gender) {
      setError('All fields are required for full analysis.');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);
    try {
      const payload = {
        symptoms: form.symptoms.split(',').map((item) => item.trim()).filter(Boolean),
        age: Number(form.age),
        gender: form.gender,
      };
      const data = await postFullAnalysis(payload);
      setResult(data);
    } catch (err) {
      setError(err.response?.status === 400 ? 'Form validation failed. Please review the values.' : 'Unable to complete secure analysis right now.');
    } finally {
      setLoading(false);
    }
  };

  const insightText = (confidence = 0) => {
    if (confidence > 80) return 'The submitted profile produced strong signal alignment. Please use this insight to discuss next steps with a clinician.';
    if (confidence > 50) return 'The analysis found moderate signal alignment. Additional context may improve certainty in future assessments.';
    return 'The analysis indicates low signal certainty. Consider adding more complete symptom and history context.';
  };

  return (
    <div className="grid">
      <Card title="New Full Health Analysis" subtitle="Secure, authenticated analysis workflow">
        <form className="form-grid" onSubmit={runAnalysis}>
          <div>
            <label>Symptoms</label>
            <input value={form.symptoms} onChange={(e) => setForm((s) => ({ ...s, symptoms: e.target.value }))} />
          </div>
          <div>
            <label>Age</label>
            <input type="number" min="0" value={form.age} onChange={(e) => setForm((s) => ({ ...s, age: e.target.value }))} />
          </div>
          <div>
            <label>Gender</label>
            <select value={form.gender} onChange={(e) => setForm((s) => ({ ...s, gender: e.target.value }))}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {error && <p className="error-text">{error}</p>}
          <button className="btn" type="submit">Run Secure Analysis</button>
        </form>
      </Card>

      {loading && (
        <div className="overlay" role="status" aria-live="polite">
          <Loader label="Analyzing securely..." />
          <ProgressBar value={66} label="Analysis progress" />
        </div>
      )}

      {result && (
        <>
          <Card title="Risk Summary" subtitle="Structured interpretation">
            <div className="grid two-col">
              <p><strong>Condition:</strong> {result.condition || result.predicted_condition || 'N/A'}</p>
              <p><strong>Risk Level:</strong> <Badge label={result.risk_level || 'Unknown'} /></p>
              <p><strong>Risk Probability:</strong> {Math.round((result.risk_probability || result.probability || 0) * 100)}%</p>
              <p><strong>Data Quality:</strong> {result.data_quality || 'Moderate'}</p>
            </div>
            <CircularMeter value={Math.round((result.confidence_score || 0.65) * 100)} label="Confidence Score" />
          </Card>

          <Card title="AI Interpretation">
            <p>{insightText(Math.round((result.confidence_score || 0.65) * 100))}</p>
          </Card>

          <Card title="Key Risk Drivers">
            {(result.risk_drivers || [{ label: 'Symptom intensity', value: 72 }, { label: 'Age pattern', value: 42 }]).map((driver, index) => (
              <div key={driver.label || index} className="driver-row">
                <span>{driver.label || driver.factor || `Driver ${index + 1}`}</span>
                <ProgressBar value={driver.value || driver.contribution || 0} label={driver.label} />
              </div>
            ))}
          </Card>

          <Card title="Treatment Awareness">
            <div className="tabs" role="tablist" aria-label="Treatment awareness tabs">
              {tabs.map((tab) => (
                <button key={tab} type="button" role="tab" className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                  {tab}
                </button>
              ))}
            </div>
            <ul>
              {(result.treatment_awareness?.[activeTab] || ['Educational information should be reviewed with qualified clinicians.', 'Do not self-initiate any protocol without professional review.', 'Use this section only as informational context.']).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card title="Recommended Next Steps">
            <div className="grid two-col">
              {(result.next_steps || ['Schedule professional consultation', 'Track symptom changes daily', 'Gather prior records before follow-up']).map((step, idx) => (
                <article key={idx} className="next-step-card">
                  <h3>Step {idx + 1}</h3>
                  <p>{step}</p>
                </article>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default FullAnalysisPage;
