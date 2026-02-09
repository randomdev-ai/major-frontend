# HealthIntel AI

A production-ready React 18 + Vite + TypeScript frontend for the HealthIntel AI decision-support MVP.

## Features
- End-to-end frontend experience for symptom intake, lab upload, AI processing, and risk insights.
- Tailwind CSS styling with modern healthcare UI layout.
- Multi-step symptom wizard with React Hook Form + Zod validation.
- Mock API responses with React Query for risk prediction.
- Drag-and-drop uploads with validation, progress, and previews.
- Accessibility-friendly UI, WCAG AA focus rings, and responsive layouts.

## Routes
- `/` → Landing page
- `/auth/register` | `/auth/login` → Authentication
- `/cases/new/upload` → Upload medical reports
- `/cases/new/symptoms` → Symptom intake
- `/cases/new/processing` → Processing state
- `/patients/:id/risk` → Risk prediction dashboard
- `/patients/:id/risk/explain` → AI reasoning view
- `/clinician/patients/:id` → Clinician dashboard
- `/conditions/migraine` → Treatment awareness

## Getting Started
```bash
npm install
npm run dev
```

## Testing
```bash
npm run test
```
