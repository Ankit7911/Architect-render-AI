import React, { useState, useRef, useCallback, DragEvent, useEffect } from 'react';
import { ClearIcon, ImageIcon, EditIcon } from './Icons';

interface ImageUploaderProps {
  id: string;
  title: string;
  onImageUpload: (file: File | null) => void;
  subtitle: string;
  value: File | null;
  onEdit?: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ id, title, subtitle, onImageUpload, value, onEdit }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  const processFile = useCallback((file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    } else if (file) {
        console.warn("Attempted to upload a non-image file:", file.type);
    }
  }, [onImageUpload]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    processFile(file);
  };

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Important to prevent the area click from firing
    onImageUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onImageUpload]);
  
  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit();
    }
  }, [onEdit]);

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };
  
  const dropzoneClasses = `w-full h-full bg-slate-900/40 border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer relative ${
    isDragging 
      ? 'border-cyan-400 bg-cyan-900/30 scale-105 shadow-lg shadow-cyan-500/20' 
      : 'border-slate-600 hover:border-cyan-500'
  }`;

  return (
    <div 
      className={dropzoneClasses} 
      onClick={handleAreaClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id={id}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      {preview ? (
        <>
          <img src={preview} alt="Preview" className="max-h-full max-w-full object-contain rounded-md" />
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 text-xs transition z-10 shadow-lg"
            aria-label="Clear image"
          >
            <ClearIcon className="h-4 w-4" />
          </button>
          {onEdit && (
            <button
              onClick={handleEditClick}
              className="absolute top-2 left-2 bg-slate-800/70 hover:bg-slate-700 text-white rounded-full p-1.5 text-xs transition z-10 shadow-lg backdrop-blur-sm"
              aria-label="Edit image"
            >
              <EditIcon className="h-4 w-4" />
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center pointer-events-none">
          <ImageIcon />
          <p className="mt-2 font-semibold text-cyan-300">{isDragging ? "Drop image to upload" : title}</p>
          <p className="text-xs text-slate-400">{isDragging ? " " : subtitle}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;