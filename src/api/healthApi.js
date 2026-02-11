import apiClient from './client';

const pickArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.assessments)) return data.assessments;
  return [];
};

const normalizeAssessment = (item = {}) => ({
  id: item.id ?? item.assessment_id ?? item.pk ?? null,
  createdAt: item.created_at ?? item.timestamp ?? item.date ?? null,
  condition: item.condition ?? item.predicted_condition ?? item.label ?? 'N/A',
  riskLevel: item.risk_level ?? item.risk ?? 'Unknown',
  probability: item.risk_probability ?? item.probability ?? item.score ?? 0,
  confidenceScore: item.confidence_score ?? item.confidence ?? 0,
  dataQuality: item.data_quality ?? item.quality ?? 'N/A',
  raw: item,
});

export const getSystemStatus = async () => {
  const { data } = await apiClient.get('/api/status/');
  return data;
};

export const getDiseases = async () => {
  const { data } = await apiClient.get('/api/diseases/');
  return pickArray(data);
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
  return pickArray(data).map(normalizeAssessment);
};

export const getAssessmentDetails = async (assessmentId) => {
  const records = await getAssessments();
  const matched = records.find((record) => String(record.id) === String(assessmentId));
  return matched || null;
};
