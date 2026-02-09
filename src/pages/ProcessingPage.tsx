import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate('/patients/123/risk'), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 450);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-900 text-white">
      <header className="flex items-center justify-between px-10 py-6 text-sm text-slate-200">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-600">+</div>
          Health Intelligence
        </div>
        <div className="flex items-center gap-2">
          Session ID: #8821X <span className="rounded-full bg-white/10 px-2 py-1">🔒</span>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="relative mb-10 flex h-24 w-24 items-center justify-center">
          <div className="absolute h-full w-full rounded-full border border-cyan-700/50" />
          <div className="absolute h-16 w-16 rounded-full border border-cyan-500/40" />
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/80 text-lg">🧠</div>
        </div>
        <h1 className="text-2xl font-semibold">Analyzing your health profile securely...</h1>
        <p className="mt-3 max-w-xl text-sm text-slate-300">
          This may take a moment. We are carefully reviewing your uploaded reports and cross-referencing medical
          guidelines to provide accurate insights.
        </p>
        <div className="mt-8 w-full max-w-lg">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
            <span>PROCESSING DATA</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <div className="h-full rounded-full bg-cyan-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="mt-12 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-4 text-left text-sm">
          <p className="text-xs font-semibold text-cyan-200">DID YOU KNOW?</p>
          <p className="mt-2 text-slate-200">
            Regular hydration improves cognitive function and helps maintain consistent energy levels throughout
            the day.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ProcessingPage;
