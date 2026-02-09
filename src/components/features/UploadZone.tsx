import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useFileUpload } from '../../hooks/useFileUpload';

const UploadZone: React.FC = () => {
  const { handleFiles } = useFileUpload();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFiles,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-8 text-sm transition ${
        isDragActive ? 'border-primary-500 bg-primary-50' : 'border-slate-200 bg-white'
      }`}
    >
      <input {...getInputProps()} aria-label="Upload medical files" />
      <p className="font-semibold text-slate-800">Drag & drop medical files</p>
      <p className="text-slate-500">PDF, JPG, PNG, DICOM up to 50 MB</p>
    </div>
  );
};

export default UploadZone;
