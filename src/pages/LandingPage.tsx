import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { suggestedReadings } from '../data/mockData';

const LandingPage: React.FC = () => (
  <div className="flex min-h-screen flex-col bg-gradient-to-b from-primary-50 via-white to-slate-50">
    <header className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center">
      <div className="flex-1 space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">HealthIntel AI</p>
        <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">
          Clarity for your health journey
        </h1>
        <p className="max-w-xl text-base text-slate-600">
          A non-clinical, AI-powered decision support interface that summarizes health signals and highlights
          potential risks for informed conversations with professionals.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/cases/new/symptoms">
            <Card className="space-y-3 border border-primary-100 bg-white">
              <h3 className="text-lg font-semibold">Describe How You Feel</h3>
              <p className="text-sm text-slate-600">Start Symptom Check</p>
              <Button>Begin</Button>
            </Card>
          </Link>
          <Link to="/cases/new/upload">
            <Card className="space-y-3 border border-slate-200 bg-slate-50">
              <h3 className="text-lg font-semibold">Analyze Lab Results</h3>
              <p className="text-sm text-slate-600">Upload Medical Reports</p>
              <Button variant="ghost">Upload</Button>
            </Card>
          </Link>
        </div>
        <Link to="/auth/register">
          <Button variant="outline">Create Account</Button>
        </Link>
      </div>
      <Card className="flex-1 space-y-4 border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">AI Summary Preview</h3>
        <p className="text-sm text-slate-600">
          Securely interpret symptom inputs and lab snapshots with privacy-first analysis.
        </p>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• Risk confidence with clear explanations</li>
          <li>• Educational treatment awareness</li>
          <li>• Non-prescriptive next steps</li>
        </ul>
      </Card>
    </header>
    <section className="mx-auto w-full max-w-6xl px-6 pb-16">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Suggested Reading</h2>
        <p className="text-sm text-slate-600">Understand how to use AI insights responsibly.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {suggestedReadings.map((item) => (
          <Card key={item.title} className="space-y-2">
            <h4 className="text-base font-semibold">{item.title}</h4>
            <p className="text-sm text-slate-600">{item.description}</p>
            <button type="button" className="text-sm font-semibold text-primary-600">
              Read more
            </button>
          </Card>
        ))}
      </div>
    </section>
    <footer className="mt-auto bg-slate-900 px-6 py-4 text-xs text-slate-200">
      Medical Disclaimer: HealthIntel AI provides informational insights only and does not diagnose, prescribe,
      or replace licensed medical professionals.
    </footer>
  </div>
);

export default LandingPage;
