import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Stepper from '../components/ui/Stepper';
import Chip from '../components/ui/Chip';
import VoiceInput from '../components/features/VoiceInput';
import InfoBanner from '../components/ui/InfoBanner';
import { useStepForm } from '../hooks/useStepForm';
import { submitSymptomReport } from '../mocks/api';

const schema = z.object({
  symptoms: z.string().min(10, 'Please provide more detail.'),
  duration: z.string().min(1, 'Duration is required.'),
  temperature: z.string().min(1, 'Temperature is required.'),
  pain: z.number().min(0).max(10),
});

type FormValues = z.infer<typeof schema>;

const chips = ['Headache', 'Fever', 'Nausea', 'Fatigue'];

const SymptomReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { step, next, back, totalSteps } = useStepForm(3);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { symptoms: '', duration: '', temperature: '', pain: 4 },
  });

  const toggleChip = (chip: string) => {
    setSelectedChips((prev) => (prev.includes(chip) ? prev.filter((item) => item !== chip) : [...prev, chip]));
  };

  const handleNext = async () => {
    const valid = await trigger(['symptoms']);
    if (valid) next();
  };

  const handleSecondNext = async () => {
    const valid = await trigger(['duration', 'temperature', 'pain']);
    if (valid) next();
  };

  const onSubmit = async () => {
    await submitSymptomReport();
    navigate('/cases/new/processing');
  };

  return (
    <div className="space-y-6">
      <InfoBanner />
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Symptom Report</h1>
        <p className="text-sm text-slate-600">Structured intake with validation and privacy-first handling.</p>
      </div>
      <Card className="space-y-6">
        <Stepper current={step} total={totalSteps} />
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold">Describe your symptoms</label>
                <textarea
                  {...register('symptoms')}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"
                  placeholder="Share how you're feeling, when it started, and anything notable."
                />
                {errors.symptoms && <p className="mt-1 text-xs text-red-500">{errors.symptoms.message}</p>}
              </div>
              <VoiceInput onTranscript={(value) => setValue('symptoms', value)} />
              <div>
                <p className="text-sm font-semibold">Quick symptoms</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {chips.map((chip) => (
                    <Chip key={chip} label={chip} active={selectedChips.includes(chip)} onClick={() => toggleChip(chip)} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold">Duration</label>
                <input
                  {...register('duration')}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm"
                  placeholder="e.g., 3 days"
                />
                {errors.duration && <p className="mt-1 text-xs text-red-500">{errors.duration.message}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold">Temperature</label>
                <input
                  {...register('temperature')}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm"
                  placeholder="e.g., 99.8°F"
                />
                {errors.temperature && <p className="mt-1 text-xs text-red-500">{errors.temperature.message}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold">Pain severity</label>
                <input
                  {...register('pain', { valueAsNumber: true })}
                  type="range"
                  min={0}
                  max={10}
                  className="mt-2 w-full"
                />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm">
                Optional file upload area (UI only)
              </div>
              <p className="text-xs text-slate-500">End-to-end encrypted. Your data stays private and secure.</p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <Button type="button" variant="ghost" onClick={back} disabled={step === 1}>
              Back
            </Button>
            {step < 3 && (
              <Button type="button" onClick={step === 1 ? handleNext : handleSecondNext}>
                Continue
              </Button>
            )}
            {step === 3 && <Button type="submit">Submit for analysis</Button>}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SymptomReportPage;
