import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InfoBanner from '../components/ui/InfoBanner';

const ProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate('/patients/123/risk'), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-6 text-center text-white">
      <div className="mb-6 w-full max-w-md">
        <InfoBanner />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-6 rounded-2xl bg-white/10 p-8"
      >
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-white/20 border-t-primary-500" />
        <h1 className="text-2xl font-semibold">Analyzing your health profile securely...</h1>
        <p className="text-sm text-slate-200">Session ID: HX-2041</p>
        <div>
          <div className="mb-2 flex items-center justify-between text-xs text-slate-200">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/20">
            <div className="h-full rounded-full bg-primary-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="rounded-xl bg-white/10 p-4 text-left text-sm">
          <p className="font-semibold">Health tip</p>
          <p className="text-slate-200">Regular hydration and balanced meals can support stable energy levels.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProcessingPage;
