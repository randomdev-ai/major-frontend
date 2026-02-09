import { apiClient } from './api';

export type AuditEvent = 'upload_started' | 'report_viewed' | 'export_clicked';

export const emitAuditEvent = async (event: AuditEvent) => {
  await apiClient.post('/audit', {
    event,
    timestamp: new Date().toISOString(),
  });
};
