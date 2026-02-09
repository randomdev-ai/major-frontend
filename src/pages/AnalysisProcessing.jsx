import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DisclaimerBanner from '../components/DisclaimerBanner.jsx';

const AnalysisProcessing = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate('/risk-analysis'), 700);
          return 100;
        }
        return prev + 10;
      });
    }, 600);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="analysis-screen">
      <DisclaimerBanner />
      <div className="analysis-card">
        <div className="spinner" aria-hidden="true" />
        <h1>Analyzing your health profile securely...</h1>
        <p>Session ID: HX-2041</p>
        <div className="analysis-progress">
          <div className="analysis-bar">
            <div className="analysis-fill" style={{ width: `${progress}%` }} />
          </div>
          <span>{progress}%</span>
        </div>
        <div className="tip-card">
          <h4>Health tip</h4>
          <p>Regular hydration and balanced meals can support stable energy levels.</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisProcessing;
