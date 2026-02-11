import apiClient from './client';

export const getSystemStatus = async () => {
  const { data } = await apiClient.get('/api/status/');
  return data;
};

export const getDiseases = async () => {
  const { data } = await apiClient.get('/api/diseases/');
  return data;
};

export const postQuickAssessment = async (payload) => {
  const { data } = await apiClient.post('/api/assess/', payload);
  return data;
};

export const postFullAnalysis = async (payload) => {
  const { data } = await apiClient.post('/api/health/analyze/', payload);
  return data;
};

export const getProfile = async () => {
  const { data } = await apiClient.get('/api/user/profile/');
  return data;
};

export const getAssessments = async () => {
  const { data } = await apiClient.get('/api/user/assessments/');
  return data;
};
