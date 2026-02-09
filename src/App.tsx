import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UploadRecordsPage from './pages/UploadRecordsPage';
import SymptomReportPage from './pages/SymptomReportPage';
import ProcessingPage from './pages/ProcessingPage';
import RiskPredictionPage from './pages/RiskPredictionPage';
import RiskExplanationPage from './pages/RiskExplanationPage';
import PatientRiskDashboard from './pages/PatientRiskDashboard';
import TreatmentLandscapePage from './pages/TreatmentLandscapePage';
import AppShell from './components/layout/AppShell';
import { useAuthStore } from './stores/useAuthStore';

const App: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route
        path="/cases/new/upload"
        element={
          <AppShell>
            <UploadRecordsPage />
          </AppShell>
        }
      />
      <Route
        path="/cases/new/symptoms"
        element={
          <AppShell>
            <SymptomReportPage />
          </AppShell>
        }
      />
      <Route path="/cases/new/processing" element={<ProcessingPage />} />
      <Route
        path="/patients/:id/risk"
        element={
          <AppShell>
            <RiskPredictionPage />
          </AppShell>
        }
      />
      <Route
        path="/patients/:id/risk/explain"
        element={
          <AppShell>
            <RiskExplanationPage />
          </AppShell>
        }
      />
      <Route
        path="/clinician/patients/:id"
        element={
          <AppShell>
            <PatientRiskDashboard />
          </AppShell>
        }
      />
      <Route
        path="/conditions/migraine"
        element={
          <AppShell>
            <TreatmentLandscapePage />
          </AppShell>
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Navigate to="/patients/123/risk" replace />
          ) : (
            <Navigate to="/auth/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
