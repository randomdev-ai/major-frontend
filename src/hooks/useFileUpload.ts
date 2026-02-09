import { useCallback } from 'react';
import { toast } from 'sonner';
import { useUploadStore } from '../stores/useUploadStore';
import { validateMedicalFile } from '../utils/fileValidation';
import { emitAuditEvent } from '../mocks/audit';

export const useFileUpload = () => {
  const { setStatus, setProgress, setFile } = useUploadStore();

  const handleFiles = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file) return;

      const result = validateMedicalFile(file);
      if (!result.valid) {
        setStatus('error');
        toast.error(result.message);
        return;
      }

      setStatus('uploading');
      setFile(file);
      emitAuditEvent('upload_started');

      for (let value = 10; value <= 100; value += 10) {
        await new Promise((resolve) => setTimeout(resolve, 120));
        setProgress(value);
      }

      setStatus('validated');
      toast.success('File validated and ready to process.');
    },
    [setFile, setProgress, setStatus]
  );

  return { handleFiles };
};
