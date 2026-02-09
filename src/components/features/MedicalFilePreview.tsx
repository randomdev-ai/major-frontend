import React, { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import cornerstone from 'cornerstonejs';

interface MedicalFilePreviewProps {
  file?: File;
}

const MedicalFilePreview: React.FC<MedicalFilePreviewProps> = ({ file }) => {
  const [numPages, setNumPages] = useState(0);
  const dicomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!file || !file.name.endsWith('.dcm') || !dicomRef.current) return;
    cornerstone.enable(dicomRef.current);
  }, [file]);

  if (!file) {
    return <div className="text-sm text-slate-500">No preview available.</div>;
  }

  if (file.type === 'application/pdf') {
    return (
      <Document file={file} onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}>
        <Page pageNumber={1} width={320} />
        <p className="mt-2 text-xs text-slate-500">{numPages} pages detected.</p>
      </Document>
    );
  }

  if (file.name.endsWith('.dcm')) {
    return <div ref={dicomRef} className="h-64 w-full rounded-xl bg-slate-100" />;
  }

  if (file.type.startsWith('image/')) {
    return <img src={URL.createObjectURL(file)} alt="Medical preview" className="rounded-xl" />;
  }

  return <div className="text-sm text-slate-500">Preview not supported.</div>;
};

export default MedicalFilePreview;
