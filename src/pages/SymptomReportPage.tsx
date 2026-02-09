import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mic, UploadCloud } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Stepper from '../components/ui/Stepper';
import Chip from '../components/ui/Chip';
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
    reset,
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
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
          <span>STEP {step} OF {totalSteps}: SYMPTOM REPORTING</span>
          <span>{Math.round((step / totalSteps) * 100)}% Completed</span>
        </div>
        <div className="mt-3">
          <Stepper current={step} total={totalSteps} />
        </div>
      </div>
      <Card className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">What brings you here today?</h1>
          <p className="text-sm text-slate-500">
            Our AI system will analyze your input to suggest next steps. Please be as descriptive as possible.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold">Symptom Description</label>
                <div className="relative mt-2">
                  <textarea
                    {...register('symptoms')}
                    rows={4}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm"
                    placeholder="Describe your symptoms here (e.g., I've had a throbbing headache and fever for 2 days...)."
                  />
                  <div className="absolute bottom-3 right-3 rounded-full border border-slate-200 bg-white p-2 text-slate-400">
                    <Mic size={16} />
                  </div>
                </div>
                {errors.symptoms && <p className="mt-1 text-xs text-red-500">{errors.symptoms.message}</p>}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Common Suggestions:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {chips.map((chip) => (
                    <Chip key={chip} label={chip} active={selectedChips.includes(chip)} onClick={() => toggleChip(chip)} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-700">Additional Vitals</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500">Duration</label>
                  <input
                    {...register('duration')}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm"
                    placeholder="e.g. 2 days"
                  />
                  {errors.duration && <p className="mt-1 text-xs text-red-500">{errors.duration.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500">Temperature</label>
                  <input
                    {...register('temperature')}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm"
                    placeholder="e.g. 38.5°C"
                  />
                  {errors.temperature && <p className="mt-1 text-xs text-red-500">{errors.temperature.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500">Pain Severity</label>
                  <input
                    {...register('pain', { valueAsNumber: true })}
                    type="range"
                    min={0}
                    max={10}
                    className="mt-3 w-full"
                  />
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Attachments</span>
                <span>Optional: Images or PDF reports</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                <UploadCloud className="text-slate-400" />
                Click to upload or drag and drop
                <span className="text-xs">SVG, PNG, JPG or GIF (max 800x400px)</span>
              </div>
              <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-4 text-xs text-cyan-700">
                ✨ AI Ready to Analyze
                <p className="mt-1 text-slate-500">
                  Once you submit, our health intelligence engine will cross-reference your symptoms with over 10,000
                  medical profiles to suggest next steps.
                </p>
              </div>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <div className="text-xs text-slate-400">🔒 Your health data is end-to-end encrypted.</div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="ghost" onClick={() => reset()}>
                Reset Form
              </Button>
              <Button type="button" variant="ghost" onClick={back} disabled={step === 1}>
                Back
              </Button>
              {step < 3 && (
                <Button type="button" onClick={step === 1 ? handleNext : handleSecondNext}>
                  Continue
                </Button>
              )}
              {step === 3 && <Button type="submit">Submit Symptoms →</Button>}
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SymptomReportPage;
