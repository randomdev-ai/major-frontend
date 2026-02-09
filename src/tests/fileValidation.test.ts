import { describe, expect, it } from 'vitest';
import { validateMedicalFile } from '../utils/fileValidation';

const createFile = (name: string, type: string, size = 1024) => new File([new ArrayBuffer(size)], name, { type });

describe('validateMedicalFile', () => {
  it('accepts valid pdf file', () => {
    const file = createFile('report.pdf', 'application/pdf');
    const result = validateMedicalFile(file);
    expect(result.valid).toBe(true);
  });

  it('rejects unsupported file types', () => {
    const file = createFile('malware.exe', 'application/octet-stream');
    const result = validateMedicalFile(file);
    expect(result.valid).toBe(false);
  });
});
