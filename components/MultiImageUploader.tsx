import React, { useState, useRef, useCallback, DragEvent, useEffect } from 'react';
import { MultiUploaderStyleIcon, AddIcon, ClearIcon } from './Icons';

interface MultiImageUploaderProps {
  id: string;
  title: string;
  onImageChange: (files: File[]) => void;
  value: File[];
}

const ImageThumbnail: React.FC<{ src: string; onRemove: () => void }> = ({ src, onRemove }) => (
  <div className="relative w-20 h-20 rounded-md overflow-hidden group shadow-md">
    <img src={src} alt="Preview" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="text-white bg-red-600 hover:bg-red-700 rounded-full p-1"
        aria-label="Remove image"
      >
        <ClearIcon className="h-4 w-4" />
      </button>
    </div>
  </div>
);

const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({ id, title, onImageChange, value }) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let isCancelled = false;
    if (value.length === 0) {
      setPreviews([]);
      return;
    }

    const newPreviews: string[] = Array(value.length).fill('');
    let loadedCount = 0;

    value.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isCancelled) return;
        newPreviews[index] = reader.result as string;
        loadedCount++;
        if (loadedCount === value.length) {
          setPreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
    
    return () => { isCancelled = true; };
  }, [value]);

  const processFiles = useCallback((files: FileList | null) => {
    if (files) {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      onImageChange([...value, ...imageFiles]);
    }
  }, [onImageChange, value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(event.target.files);
    event.target.value = '';
  };
  
  const handleRemove = useCallback((index: number) => {
      const updatedFiles = [...value];
      updatedFiles.splice(index, 1);
      onImageChange(updatedFiles);
  }, [value, onImageChange]);

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); };
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };
  
  const dropzoneClasses = `w-full min-h-[8rem] bg-slate-900/40 border-2 border-dashed rounded-lg p-3 flex flex-wrap items-start gap-3 transition-all duration-300 ${
    isDragging 
      ? 'border-cyan-400 bg-cyan-900/30 scale-105 shadow-lg shadow-cyan-500/20' 
      : 'border-slate-600'
  }`;

  return (
    <div>
        <p className="flex items-center text-sm font-medium text-slate-300 mb-2">
            <MultiUploaderStyleIcon />
            <span className="ml-2">{title}</span>
        </p>
        <div 
          className={dropzoneClasses} 
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
            multiple
        />
        {previews.map((src, index) => (
            <ImageThumbnail key={`${value[index]?.name}-${index}`} src={src} onRemove={() => handleRemove(index)} />
        ))}
        <button
            onClick={handleAreaClick}
            className="w-20 h-20 bg-slate-800/50 hover:bg-slate-800/80 rounded-md flex flex-col items-center justify-center text-slate-400 hover:text-cyan-300 transition-all cursor-pointer border-2 border-slate-700 hover:border-cyan-500"
            aria-label="Add images"
        >
            <AddIcon />
            <span className="text-xs mt-1">Add</span>
        </button>
        </div>
    </div>
  );
};

export default MultiImageUploader;
