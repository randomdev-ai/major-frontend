import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import ProgressBar from '../components/ProgressBar.jsx';

const FileUpload = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('uploading');

  const handleProcess = () => {
    setStatus('validated');
    setTimeout(() => navigate('/analysis'), 800);
  };

  return (
    <AppLayout>
      <div className="page-header">
        <h1>Medical Reports</h1>
        <p>Securely upload lab results for AI summarization.</p>
      </div>
      <Card>
        <div className="upload-area large">
          <p>Drag & drop files here</p>
          <span>Supported formats: PDF, JPG, PNG, DICOM</span>
        </div>
        <div className="upload-status">
          <div className={`status-pill ${status}`}>
            {status === 'uploading' && 'Uploading'}
            {status === 'validated' && 'Validated'}
            {status === 'error' && 'Unsupported format'}
          </div>
          <ProgressBar value={status === 'uploading' ? 64 : 100} label="Upload progress" />
        </div>
        <div className="form-actions">
          <Button type="button" onClick={() => setStatus('error')} variant="ghost">
            Simulate Error
          </Button>
          <Button type="button" onClick={handleProcess}>
            Process Reports
          </Button>
        </div>
      </Card>
    </AppLayout>
  );
};

export default FileUpload;
