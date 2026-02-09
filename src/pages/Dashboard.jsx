import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import { recentAnalyses } from '../utils/mockData.js';

const Dashboard = () => {
  return (
    <AppLayout>
      <section className="dashboard-hero">
        <div>
          <h1>Welcome back</h1>
          <p>Start a new analysis or review previous insights.</p>
        </div>
        <div className="dashboard-actions">
          <Link to="/symptom-check">
            <Button>New Symptom Check</Button>
          </Link>
          <Link to="/upload-reports">
            <Button variant="ghost">Upload Reports</Button>
          </Link>
        </div>
      </section>
      <section className="dashboard-grid">
        <Card className="dashboard-card">
          <h3>Entry Points</h3>
          <p>Begin structured intake for symptoms or lab uploads.</p>
          <div className="chip-group">
            <span className="chip">Symptom Intake</span>
            <span className="chip">Lab Report Review</span>
            <span className="chip">Vitals Snapshot</span>
          </div>
        </Card>
        <Card className="dashboard-card">
          <h3>Recent Analyses</h3>
          <ul className="list">
            {recentAnalyses.map((analysis) => (
              <li key={analysis.id}>
                <div>
                  <strong>{analysis.title}</strong>
                  <p>{analysis.date}</p>
                </div>
                <span className={`risk-pill ${analysis.risk.toLowerCase()}`}>{analysis.risk}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </AppLayout>
  );
};

export default Dashboard;
