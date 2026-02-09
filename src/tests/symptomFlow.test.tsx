import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SymptomReportPage from '../pages/SymptomReportPage';

const renderPage = () => render(<SymptomReportPage />);

describe('SymptomReportPage', () => {
  it('advances to step 2 after valid symptom input', async () => {
    const user = userEvent.setup();
    renderPage();

    const textarea = screen.getByPlaceholderText(/share how you're feeling/i);
    await user.type(textarea, 'I have had a persistent headache for two days.');

    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(screen.getByText(/duration/i)).toBeInTheDocument();
  });
});
