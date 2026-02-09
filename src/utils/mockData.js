export const suggestedReadings = [
  {
    title: 'Understanding AI in Preventive Care',
    description: 'How decision-support systems summarize patterns without diagnosing.',
  },
  {
    title: 'Interpreting Lab Results Safely',
    description: 'Learn what typical ranges mean before speaking with a clinician.',
  },
  {
    title: 'Daily Habits for Long-Term Health',
    description: 'Simple routines that can support wellness goals and checkups.',
  },
];

export const recentAnalyses = [
  {
    id: 'HX-2041',
    title: 'Metabolic risk screening',
    date: 'Aug 18, 2024',
    risk: 'Moderate',
  },
  {
    id: 'HX-1994',
    title: 'Cardiovascular baseline',
    date: 'Aug 12, 2024',
    risk: 'Low',
  },
  {
    id: 'HX-1920',
    title: 'Lifestyle impact review',
    date: 'Jul 30, 2024',
    risk: 'High',
  },
];

export const historyLogs = [
  {
    id: 'HX-2041',
    timestamp: '2024-08-18 10:24 AM',
    risk: 'Moderate',
  },
  {
    id: 'HX-1994',
    timestamp: '2024-08-12 08:14 AM',
    risk: 'Low',
  },
  {
    id: 'HX-1920',
    timestamp: '2024-07-30 03:02 PM',
    risk: 'High',
  },
  {
    id: 'HX-1870',
    timestamp: '2024-07-16 09:47 AM',
    risk: 'Moderate',
  },
];

export const riskDrivers = [
  { label: 'HbA1c', value: 78, emphasis: 'primary' },
  { label: 'Fasting Glucose Trend', value: 66, emphasis: 'primary' },
  { label: 'BMI', value: 52, emphasis: 'secondary' },
  { label: 'Family History', value: 38, emphasis: 'secondary' },
];

export const treatmentTabs = [
  {
    id: 'modern',
    label: 'Modern Medicine (Allopathy)',
    points: [
      'Focuses on evidence-based screenings and clinician-guided care plans.',
      'May include lab monitoring schedules and follow-up assessments.',
      'Always discuss any medication considerations with a licensed provider.',
    ],
  },
  {
    id: 'ayurveda',
    label: 'Ayurveda',
    points: [
      'Emphasizes balance, nutrition, and daily routines aligned with wellness.',
      'Practices vary and should be discussed with qualified practitioners.',
      'Use as complementary context, not a substitute for medical advice.',
    ],
  },
  {
    id: 'homeopathy',
    label: 'Homeopathy',
    points: [
      'Centered on individualized wellness approaches and reported symptom patterns.',
      'Evidence levels vary; consult healthcare professionals for guidance.',
      'Should not delay or replace conventional medical evaluation.',
    ],
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle',
    points: [
      'Highlights nutrition, movement, sleep, and stress support habits.',
      'Small incremental changes can complement clinician-led care.',
      'Consider professional advice before major lifestyle changes.',
    ],
  },
];

export const patientSummary = {
  name: 'Jordan Blake',
  age: 42,
  gender: 'Female',
  bloodGroup: 'O+',
};

export const vitalsSnapshot = [
  { label: 'Heart Rate', value: '78 bpm' },
  { label: 'Blood Pressure', value: '128/84 mmHg' },
  { label: 'Weight', value: '74 kg' },
  { label: 'Temperature', value: '98.6°F' },
];
