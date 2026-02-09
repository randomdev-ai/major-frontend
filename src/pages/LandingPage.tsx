import React from 'react';
import { Link } from 'react-router-dom';
import { Search, UploadCloud, UserCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { suggestedReadings } from '../data/mockData';

const LandingPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-cyan-50">
    <header className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
      <div className="flex items-center gap-3 text-sm font-semibold text-slate-900">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">+</div>
        HealthIntel AI
      </div>
      <UserCircle className="text-slate-500" />
    </header>

    <main className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-16 text-center">
      <span className="rounded-full bg-cyan-100 px-4 py-1 text-xs font-semibold text-cyan-600">
        AI-Powered Decision Support
      </span>
      <h1 className="mt-6 text-4xl font-semibold text-slate-900 md:text-5xl">Clarity for your health journey.</h1>
      <p className="mt-4 max-w-2xl text-base text-slate-600">
        An intelligent partner to help you understand risks and explore options. We provide guidance and
        support, helping you make sense of your health data with confidence.
      </p>

      <div className="mt-12 grid w-full gap-6 md:grid-cols-2">
        <Card className="space-y-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-cyan-50 p-3 text-cyan-600">
              <Search size={20} />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold">Describe How You Feel</h3>
              <p className="text-sm text-slate-500">
                Start a guided symptom check to understand potential causes and health risks in a calm
                environment.
              </p>
            </div>
          </div>
          <Link to="/cases/new/symptoms">
            <Button className="w-full">Start Symptom Check →</Button>
          </Link>
        </Card>
        <Card className="space-y-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-cyan-50 p-3 text-cyan-600">
              <UploadCloud size={20} />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold">Analyze Lab Results</h3>
              <p className="text-sm text-slate-500">
                Upload your PDF or image medical reports. Our AI will help interpret complex medical jargon
                into clear insights.
              </p>
            </div>
          </div>
          <Link to="/cases/new/upload">
            <Button variant="outline" className="w-full">
              Upload File
            </Button>
          </Link>
        </Card>
      </div>

      <section className="mt-16 w-full">
        <div className="mb-4 text-left text-xs font-semibold uppercase tracking-widest text-slate-400">
          Suggested Reading
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {suggestedReadings.map((item) => (
            <Card key={item.title} className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-100 to-slate-100" />
              <div className="text-left">
                <p className="text-xs font-semibold text-cyan-600">{item.description}</p>
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>

    <footer className="mt-10 border-t border-slate-100 bg-white px-6 py-4 text-xs text-slate-500">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <span>© 2024 HealthIntel AI. All rights reserved.</span>
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-amber-700">
          For informational purposes only. Always consult a healthcare professional for diagnosis.
        </span>
      </div>
    </footer>
  </div>
);

export default LandingPage;
