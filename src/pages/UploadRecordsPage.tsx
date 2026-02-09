import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Progress from '../components/ui/Progress';
import UploadZone from '../components/features/UploadZone';
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
