import React from 'react';
import ImageCard from './ImageCard';
import { SpinnerIcon, PlaceholderIcon, ErrorIcon } from './Icons';

interface RenderOutputProps {
  generatedImages: string[];
  isLoading: boolean;
  error: string | null;
  onPreviewImage: (src: string, number: number) => void;
  onEditImage: (src: string) => void;
}

const LoadingCard: React.FC = () => (
    <div className="aspect-square bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl flex items-center justify-center overflow-hidden shadow-lg p-4">
      <div className="flex flex-col items-center justify-center text-center">
        <SpinnerIcon className="animate-spin h-10 w-10 text-cyan-400" />
        <p className="mt-3 text-sm font-semibold text-slate-300">Generating...</p>
        <p className="mt-1 text-xs text-slate-400">Crafting your vision.</p>
      </div>
    </div>
  );

const Placeholder: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-4">
    <PlaceholderIcon />
    <h3 className="mt-4 text-xl font-semibold text-slate-300">Bring Your Vision to Life</h3>
    <p className="mt-2 text-slate-400 max-w-md mx-auto">Your architectural renders will appear here. Start by uploading a sketch and selecting your desired style.</p>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-red-900/40 backdrop-blur-lg border border-red-500/50 rounded-xl">
     <ErrorIcon />
    <h3 className="mt-4 text-lg font-semibold text-red-300">An Error Occurred</h3>
    <p className="mt-1 text-red-400 text-sm max-w-md">{message}</p>
  </div>
);

const RenderOutput: React.FC<RenderOutputProps> = ({ generatedImages, isLoading, error, onPreviewImage, onEditImage }) => {
  const renderContent = () => {
    if (error) return <ErrorDisplay message={error} />;

    if (!isLoading && generatedImages.length === 0) return <Placeholder />;

    return (
      <div className="w-full h-full p-4 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading && <LoadingCard />}
          {generatedImages.map((src, index) => {
            const imageNumber = generatedImages.length - index;
            return (
              <ImageCard
                key={src.slice(-20) + index}
                src={src}
                imageNumber={imageNumber}
                onPreview={() => onPreviewImage(src, imageNumber)}
                onEdit={() => onEditImage(src)}
              />
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="w-full h-full bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl shadow-black/30">
      {renderContent()}
    </div>
  );
};

export default RenderOutput;