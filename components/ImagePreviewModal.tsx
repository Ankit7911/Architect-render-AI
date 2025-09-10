import React, { useEffect } from 'react';
import { CloseIcon, EditIcon, DownloadIcon } from './Icons';

interface ImagePreviewModalProps {
  image: {
    src: string;
    number: number;
  };
  onClose: () => void;
  onEdit: () => void;
  onDownload: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ image, onClose, onEdit, onDownload }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-preview-title"
    >
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
      <div
        className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-4 w-full max-w-5xl max-h-full flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 id="image-preview-title" className="text-xl font-bold text-cyan-300">
            Render #{image.number}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
            aria-label="Close preview"
          >
            <CloseIcon className="h-8 w-8" />
          </button>
        </div>
        
        <div className="flex-grow flex items-center justify-center overflow-hidden bg-black/30 rounded-lg">
          <img src={image.src} alt={`Preview of Render ${image.number}`} className="max-h-[75vh] max-w-full object-contain" />
        </div>

        <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-4 border-t border-white/10">
            <button 
                onClick={onEdit}
                className="w-full sm:w-auto bg-slate-700/80 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-slate-700/100 border border-transparent hover:border-slate-500 transition-all duration-200 flex items-center justify-center gap-2"
            >
                <EditIcon />
                Use as Base Image
            </button>
            <button 
                onClick={onDownload}
                className="w-full sm:w-auto text-black font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 flex items-center justify-center gap-2"
            >
                <DownloadIcon />
                Download
            </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
