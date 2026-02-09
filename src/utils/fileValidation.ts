const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/dicom'];
const maxBytes = 50 * 1024 * 1024;

export const validateMedicalFile = (file: File) => {
  if (!allowedTypes.includes(file.type) && !file.name.endsWith('.dcm')) {
    return { valid: false, message: 'Unsupported format. Please upload PDF, JPG, PNG, or DICOM files.' };
  }
  if (file.size > maxBytes) {
    return { valid: false, message: 'File exceeds the 50MB limit.' };
  }
  return { valid: true, message: 'Validated' };
};
