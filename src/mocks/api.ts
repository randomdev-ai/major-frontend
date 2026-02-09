import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/mock-api',
  timeout: 800,
});

export const fetchRiskPrediction = async () => {
  return {
    condition: 'Type 2 Diabetes',
    riskLevel: 'Moderate',
    confidence: 87,
    factors: [
      { label: 'HbA1c', value: 78 },
      { label: 'Fasting Glucose Trend', value: 64 },
      { label: 'BMI', value: 52 },
      { label: 'Family History', value: 38 },
    ],
  };
};

export const submitSymptomReport = async () => {
  return { sessionId: 'HX-2041', status: 'processing' };
};
