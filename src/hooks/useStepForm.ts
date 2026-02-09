import { useState } from 'react';

export const useStepForm = (totalSteps: number) => {
  const [step, setStep] = useState(1);

  const next = () => setStep((prev) => Math.min(totalSteps, prev + 1));
  const back = () => setStep((prev) => Math.max(1, prev - 1));
  const goTo = (value: number) => setStep(Math.min(totalSteps, Math.max(1, value)));

  return { step, next, back, goTo, totalSteps };
};
