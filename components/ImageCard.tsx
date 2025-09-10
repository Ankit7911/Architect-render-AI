import React from 'react';
import { PreviewIcon, EditIcon } from './Icons';

interface ImageCardProps {
  src: string;
  imageNumber: number;
  onPreview: () => void;
  onEdit: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, imageNumber, onPreview, onEdit }) => {
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };
  
  return (
    <div 
      className="relative group rounded-xl overflow-hidden cursor-pointer shadow-lg aspect-square"
      onClick={onPreview}
    >
      <img src={src} alt={`Render ${imageNumber}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 gap-4">
        <button onClick={onPreview} className="text-white p-2 rounded-full hover:bg-white/20 transition-colors" aria-label="Preview image">
          <PreviewIcon className="h-10 w-10"/>
        </button>
        <button onClick={handleEditClick} className="text-white p-2 rounded-full hover:bg-white/20 transition-colors" aria-label="Edit image">
          <EditIcon className="h-8 w-8"/>
        </button>
      </div>
      <div className="absolute top-2 left-2 bg-black/50 text-cyan-300 text-xs font-bold py-1 px-2 rounded-full backdrop-blur-sm border border-white/10">
        #{imageNumber}
      </div>
    </div>
  );
};

export default ImageCard;