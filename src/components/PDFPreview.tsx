import { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';

interface PDFPreviewProps {
  document: React.ReactElement;
}

export default function PDFPreview({ document }: PDFPreviewProps) {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    const generatePreview = async () => {
      try {
        const blob = await pdf(document).toBlob();
        const url = URL.createObjectURL(blob);
        setUrl(url);
      } catch (error) {
        console.error('Error generating PDF preview:', error);
      }
    };

    if (document) {
      generatePreview();
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [document]);

  if (!url) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <p className="text-gray-500">Aperçu de la facture</p>
      </div>
    );
  }

  return (
    <iframe
      src={url}
      className="w-full h-full rounded-xl shadow-lg bg-white"
      style={{ aspectRatio: '1/1.4142' }}
      title="PDF Preview"
    />
  );
}