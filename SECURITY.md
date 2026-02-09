# Security Notes

HealthIntel AI is a frontend-only MVP that models HIPAA-aware patterns for sensitive health workflows.

## Data Handling
- No PHI is stored in localStorage or sessionStorage. All data remains in memory only.
- Uploads are validated client-side for allowed formats and size limits (≤ 50MB).
- Files are treated as encrypted in transit and handled in-memory for preview.

## Session Safety
- Idle-timeout lock modal appears after inactivity to prevent shoulder surfing.
- Manual logout is available from secure views.

## Audit Events
- The UI emits mock audit events for `upload_started`, `report_viewed`, and `export_clicked`.
- Audit events are sent to a mock endpoint only; no real network integration is required.

## Logging
- Avoid logging sensitive values. Toasts and UI notices intentionally redact any PHI.
