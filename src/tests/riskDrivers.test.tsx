import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RiskPredictionPage from '../pages/RiskPredictionPage';

vi.mock('../mocks/api', () => ({
  fetchRiskPrediction: async () => ({
    condition: 'Type 2 Diabetes',
    riskLevel: 'Moderate',
    confidence: 87,
    factors: [
      { label: 'Elevated HbA1c', value: 78 },
      { label: 'HbA1c', value: 78 },
      { label: 'Fasting Glucose Trend', value: 64 },
    ],
  }),
}));

const renderPage = () => {
  const client = new QueryClient();
  return render(
    <QueryClientProvider client={client}>
      <RiskPredictionPage />
    </QueryClientProvider>
  );
};

describe('RiskPredictionPage', () => {
  it('renders risk driver labels', async () => {
    renderPage();
    expect(await screen.findByText('HbA1c')).toBeInTheDocument();
    expect(await screen.findByText('Fasting Glucose Trend')).toBeInTheDocument();
  });
});
