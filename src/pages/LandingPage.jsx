import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Badge from '../components/Badge';
import Card from '../components/Card';
import { getSystemStatus } from '../api/healthApi';

const LandingPage = () => {
  const [status, setStatus] = useState({ loading: true, ok: false });

  useEffect(() => {
    const loadStatus = async () => {
      try {
        await getSystemStatus();
        setStatus({ loading: false, ok: true });
      } catch {
        setStatus({ loading: false, ok: false });
      }
    };

    loadStatus();
  }, []);

  return (
    <div className="landing-wrapper">
      <header className="hero card">
        <p className="eyebrow">Clinical Decision Support Interface</p>
        <h1>AI-Powered Health Intelligence</h1>
        <p>
          Delivering structured, non-clinical health insights for early awareness and informed follow-up conversations with qualified professionals.
        </p>
        <div className="status-row">
          <span>System status:</span>
          {status.loading ? <Badge label="Checking" type="neutral" /> : <Badge label={status.ok ? 'Healthy' : 'Unavailable'} type={status.ok ? 'healthy' : 'high'} />}
        </div>
      </header>

      <section className="grid two-col">
        <Card title="Quick Health Check" subtitle="Anonymous access for early insight">
          <p className="card-subtitle">Use symptoms, age, and gender to receive a structured risk overview.</p>
          <Link className="btn" to="/quick-check">
            Start Quick Check
          </Link>
        </Card>
        <Card title="Full Health Analysis" subtitle="Secure, authenticated experience">
          <p className="card-subtitle">Includes confidence scoring, risk drivers, and comprehensive educational context.</p>
          <Link className="btn" to="/login">
            Login to Continue
          </Link>
        </Card>
      </section>

      <footer className="disclaimer-footer">This system provides informational support only.</footer>
    </div>
  );
};

export default LandingPage;
