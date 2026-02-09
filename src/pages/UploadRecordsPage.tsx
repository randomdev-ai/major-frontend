import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Progress from '../components/ui/Progress';
import UploadZone from '../components/features/UploadZone';
import InfoBanner from '../components/ui/InfoBanner';
import { useUploadStore } from '../stores/useUploadStore';

const uploadedFiles = [
  {
    name: 'Blood_Test_Results_Jan2024.pdf',
    size: '2.4 MB',
    status: 'Validated',
    icon: 'PDF',
  },
  {
    name: 'MRI_Scan_Spine_v2.dcm',
    size: 'Uploading... 75%',
    status: 'Uploading',
    icon: 'DICOM',
  },
  {
    name: 'patient_notes.exe',
    size: 'File format not supported',
    status: 'Error',
    icon: 'EXE',
  },
];

const UploadRecordsPage: React.FC = () => {
  const { progress } = useUploadStore();
import MedicalFilePreview from '../components/features/MedicalFilePreview';
import { useUploadStore } from '../stores/useUploadStore';
import InfoBanner from '../components/ui/InfoBanner';
import { useNavigate } from 'react-router-dom';

const UploadRecordsPage: React.FC = () => {
  const navigate = useNavigate();
  const { status, progress, file } = useUploadStore();

  return (
    <div className="space-y-6">
      <InfoBanner />
      <div>
        <p className="text-xs text-slate-400">Home / New Case / Upload Reports</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Upload Medical Records</h1>
        <p className="text-sm text-slate-500">
          Securely upload patient history, lab results, or imaging for AI analysis.
        </p>
      </div>
      <Card className="space-y-6">
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center">
          <div className="rounded-full bg-cyan-50 p-3 text-cyan-600">
            <UploadCloud />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Drag & drop files here</p>
            <p className="text-xs text-slate-500">Supports PDF, JPG, PNG, and DICOM (Max 50MB per file).</p>
          </div>
          <Button variant="outline">Browse Files</Button>
        </div>
        <UploadZone />
        <div>
          <h3 className="text-sm font-semibold text-slate-700">Uploaded Files</h3>
          <div className="mt-3 space-y-3">
            {uploadedFiles.map((file) => (
              <div
                key={file.name}
                className={`flex items-center justify-between rounded-xl border p-4 text-sm ${
                  file.status === 'Error' ? 'border-red-200 bg-red-50' : 'border-slate-100 bg-white'
                }`}
              >
                <div>
                  <p className="font-semibold text-slate-900">{file.name}</p>
                  <p className="text-xs text-slate-500">{file.size}</p>
                </div>
                <div className="flex items-center gap-3">
                  {file.status === 'Validated' && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <CheckCircle2 size={14} /> Validated
                    </span>
                  )}
                  {file.status === 'Uploading' && (
                    <div className="w-40">
                      <Progress value={75} />
                    </div>
                  )}
                  {file.status === 'Error' && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                      <FileWarning size={14} /> Error
                    </span>
                  )}
                  <button type="button" className="text-slate-400">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <div className="text-xs text-slate-400">
            Your data is encrypted end-to-end. We adhere to strict HIPAA privacy standards.
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Process Reports</Button>
          </div>
        </div>
      </Card>
      <div className="text-xs text-slate-400">Processing status: {progress}%</div>
        <h1 className="text-2xl font-semibold text-slate-900">Upload Medical Reports</h1>
        <p className="text-sm text-slate-600">End-to-end encrypted uploads with format validation.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card className="space-y-6">
          <UploadZone />
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>Upload progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-slate-100 px-3 py-1">PDF</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">JPG</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">PNG</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">DICOM</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Status:{' '}
              <span className="font-semibold text-slate-900">{status === 'idle' ? 'Awaiting file' : status}</span>
            </div>
            <Button onClick={() => navigate('/cases/new/processing')}>Process Reports</Button>
          </div>
        </Card>
        <Card className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Preview</h3>
          <MedicalFilePreview file={file} />
          <p className="text-xs text-slate-500">Files are encrypted in transit and validated before analysis.</p>
        </Card>
      </div>
    </div>
  );
};

export default UploadRecordsPage;
