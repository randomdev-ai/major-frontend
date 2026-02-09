import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import { suggestedReadings } from '../utils/mockData.js';

const Landing = () => {
  return (
    <div className="landing">
      <header className="landing-hero">
        <div className="hero-content">
          <span className="eyebrow">HealthIntel AI</span>
          <h1>Clarity for your health journey</h1>
          <p>
            A non-clinical, AI-powered decision support interface that summarizes health signals
            and highlights potential risks for informed conversations with professionals.
          </p>
          <div className="hero-actions">
            <Link to="/symptom-check" className="cta-link">
              <Card className="cta-card">
                <h3>Describe How You Feel</h3>
                <p>Start Symptom Check</p>
                <Button>Begin</Button>
              </Card>
            </Link>
            <Link to="/upload-reports" className="cta-link">
              <Card className="cta-card secondary">
                <h3>Analyze Lab Results</h3>
                <p>Upload Medical Reports</p>
                <Button variant="ghost">Upload</Button>
              </Card>
            </Link>
          </div>
        </div>
        <div className="hero-panel">
          <Card className="hero-card">
            <h4>AI Summary Preview</h4>
            <p>Securely interpret symptom inputs and lab snapshots with privacy-first analysis.</p>
            <ul>
              <li>Risk confidence with clear explanations</li>
              <li>Educational treatment awareness</li>
              <li>Non-prescriptive next steps</li>
            </ul>
            <Link to="/register">
              <Button variant="light">Create Account</Button>
            </Link>
          </Card>
        </div>
      </header>
      <section className="landing-reading">
        <div className="section-title">
          <h2>Suggested Reading</h2>
          <p>Understand how to use AI insights responsibly.</p>
        </div>
        <div className="reading-grid">
          {suggestedReadings.map((item) => (
            <Card key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <button type="button" className="text-link">
                Read more
              </button>
            </Card>
          ))}
        </div>
      </section>
      <footer className="landing-footer">
        <p>
          Medical Disclaimer: HealthIntel AI provides informational insights only and does not diagnose,
          prescribe, or replace licensed medical professionals. Always consult a clinician for care.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
