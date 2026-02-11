import { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Loader from '../components/Loader';
import { postQuickAssessment } from '../api/healthApi';

const initialForm = { symptoms: '', age: '', gender: '' };
const toPercent = (value = 0) => (value > 1 ? Math.round(value) : Math.round(value * 100));

const QuickHealthCheckPage = () => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const submit = async (event) => {
    event.preventDefault();
    if (!form.symptoms.trim() || !form.age || !form.gender) {
      setError('Symptoms, age, and gender are required.');
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
      const data = await postQuickAssessment(payload);
      setResult(data);
    } catch (err) {
      setError(err.response?.status === 400 ? 'Please review the submitted values.' : 'Unable to complete quick assessment right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="public-page">
      <Card title="Quick Health Check" subtitle="Anonymous informational assessment">
        <form className="form-grid" onSubmit={submit}>
          <div>
            <label htmlFor="symptoms">Symptoms (comma separated)</label>
            <input id="symptoms" value={form.symptoms} onChange={(e) => setForm((s) => ({ ...s, symptoms: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input id="age" type="number" min="0" value={form.age} onChange={(e) => setForm((s) => ({ ...s, age: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select id="gender" value={form.gender} onChange={(e) => setForm((s) => ({ ...s, gender: e.target.value }))}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {error && <p className="error-text">{error}</p>}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? <Loader label="Processing..." /> : 'Run Quick Check'}
          </button>
        </form>
      </Card>

      {result && (
        <Card title="Assessment Result" subtitle="Informational output only">
          <div className="grid two-col">
            <p><strong>Condition:</strong> {result.condition || result.predicted_condition || 'Unavailable'}</p>
            <p><strong>Risk:</strong> <Badge label={result.risk_level || 'Unknown'} /></p>
            <p><strong>Probability:</strong> {toPercent(result.probability || result.risk_probability || 0)}%</p>
          </div>
          <p className="disclaimer">This system provides informational support only and does not offer diagnosis.</p>
        </Card>
      )}
    </div>
  );
};

export default QuickHealthCheckPage;
