// Fix: Added useEffect to the React import statement.
import React, { useState, useRef, useLayoutEffect, useCallback, useEffect } from 'react';
import * as Icons from './Icons';

interface MaskingEditorProps {
  imageSrc: string;
  onClose: () => void;
  onApply: (params: { baseImage: string; maskImage: string; prompt: string }) => void;
}

const MaskingEditor: React.FC<MaskingEditorProps> = ({ imageSrc, onClose, onApply }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);

  // In-memory canvases for composition
  const imageCanvas = useRef<HTMLCanvasElement | null>(null);
  const maskCanvas = useRef<HTMLCanvasElement | null>(null);
  
  const lastPosition = useRef<{ x: number, y: number } | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [brushSize, setBrushSize] = useState(40);
  const [prompt, setPrompt] = useState('');
  
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isReady, setIsReady] = useState(false);

  const redrawDisplay = useCallback(() => {
    const displayCanvas = displayCanvasRef.current;
    const displayCtx = displayCanvas?.getContext('2d');
    if (!displayCtx || !imageCanvas.current || !maskCanvas.current) return;
    
    displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
    displayCtx.drawImage(imageCanvas.current, 0, 0);
    displayCtx.drawImage(maskCanvas.current, 0, 0);
  }, []);

  // This layout effect handles the entire canvas setup, sizing, and initial drawing.
  // It's robust against layout timing issues.
  useLayoutEffect(() => {
    setIsReady(false);
    const image = new Image();
    image.crossOrigin = 'anonymous';

    const displayCanvas = displayCanvasRef.current;
    const container = containerRef.current;
    if (!container || !displayCanvas) return;

    // Wait for the container to have a calculated size.
    if (container.clientWidth === 0 || container.clientHeight === 0) {
        return;
    }

    image.onload = () => {
        // Create canvases fresh on image load
        imageCanvas.current = document.createElement('canvas');
        maskCanvas.current = document.createElement('canvas');
        const imageCtx = imageCanvas.current.getContext('2d');
        const maskCtx = maskCanvas.current.getContext('2d');

        if (!imageCtx || !maskCtx) return;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const imgAspectRatio = image.width / image.height;
        
        let canvasWidth = containerWidth;
        let canvasHeight = containerWidth / imgAspectRatio;
        
        if (canvasHeight > containerHeight) {
            canvasHeight = containerHeight;
            canvasWidth = containerHeight * imgAspectRatio;
        }
        
        // Size all three canvases to match
        displayCanvas.width = canvasWidth;
        displayCanvas.height = canvasHeight;
        imageCanvas.current.width = canvasWidth;
        imageCanvas.current.height = canvasHeight;
        maskCanvas.current.width = canvasWidth;
        maskCanvas.current.height = canvasHeight;
        
        // Draw the base image to its dedicated canvas
        imageCtx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
        
        // Clear the mask canvas and initialize history
        maskCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        const blankState = maskCtx.getImageData(0, 0, canvasWidth, canvasHeight);
        setHistory([blankState]);
        setHistoryIndex(0);
        
        // Perform initial composition to the visible canvas
        redrawDisplay();
        setIsReady(true);
    };
    
    image.onerror = () => {
        console.error("Failed to load image for masking editor.");
        setIsReady(false);
    };

    image.src = imageSrc;

  }, [imageSrc, redrawDisplay]);

  const saveState = useCallback(() => {
    if (!isReady) return;
    const maskCtx = maskCanvas.current?.getContext('2d', { willReadFrequently: true });
    if (!maskCtx || !maskCanvas.current) return;

    const newHistory = history.slice(0, historyIndex + 1);
    const currentState = maskCtx.getImageData(0, 0, maskCanvas.current.width, maskCanvas.current.height);
    newHistory.push(currentState);
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex, isReady]);

  const getMousePos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = displayCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const touch = 'touches' in e ? e.touches[0] : e;
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  };

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !lastPosition.current) return;
    const maskCtx = maskCanvas.current?.getContext('2d');
    if (!maskCtx) return;
    
    const { x, y } = getMousePos(e);

    maskCtx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';
    maskCtx.strokeStyle = isErasing ? 'rgba(0,0,0,1)' : 'rgba(239, 68, 68, 0.7)';
    maskCtx.lineWidth = brushSize;
    maskCtx.lineCap = 'round';
    maskCtx.lineJoin = 'round';
    
    maskCtx.beginPath();
    maskCtx.moveTo(lastPosition.current.x, lastPosition.current.y);
    maskCtx.lineTo(x, y);
    maskCtx.stroke();
    
    lastPosition.current = { x, y };
    redrawDisplay();
  }, [isDrawing, isErasing, brushSize, redrawDisplay]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if(!isReady) return;
    e.preventDefault();
    const { x, y } = getMousePos(e);
    setIsDrawing(true);
    lastPosition.current = { x, y };
    draw(e);
  };
  
  const stopDrawing = () => {
    if (isDrawing) {
      saveState();
    }
    setIsDrawing(false);
    lastPosition.current = null;
  };
  
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const maskCtx = maskCanvas.current?.getContext('2d');
      if(maskCtx) {
        maskCtx.clearRect(0, 0, maskCanvas.current!.width, maskCanvas.current!.height);
        maskCtx.putImageData(history[newIndex], 0, 0);
        setHistoryIndex(newIndex);
        redrawDisplay();
      }
    }
  }, [history, historyIndex, redrawDisplay]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const maskCtx = maskCanvas.current?.getContext('2d');
      if(maskCtx) {
        maskCtx.clearRect(0, 0, maskCanvas.current!.width, maskCanvas.current!.height);
        maskCtx.putImageData(history[newIndex], 0, 0);
        setHistoryIndex(newIndex);
        redrawDisplay();
      }
    }
  }, [history, historyIndex, redrawDisplay]);

  const handleClear = useCallback(() => {
    const maskCtx = maskCanvas.current?.getContext('2d');
    if(maskCtx && maskCanvas.current) {
      maskCtx.clearRect(0, 0, maskCanvas.current.width, maskCanvas.current.height);
      saveState();
      redrawDisplay();
    }
  }, [saveState, redrawDisplay]);

  const handleApply = () => {
    const mskCvs = maskCanvas.current;
    if (!mskCvs || !prompt.trim()) return;

    const finalMaskCanvas = document.createElement('canvas');
    finalMaskCanvas.width = mskCvs.width;
    finalMaskCanvas.height = mskCvs.height;
    const finalMaskCtx = finalMaskCanvas.getContext('2d');
    const maskReadCtx = mskCvs.getContext('2d', { willReadFrequently: true });
    
    if (!finalMaskCtx || !maskReadCtx) return;
    
    const drawingImageData = maskReadCtx.getImageData(0, 0, mskCvs.width, mskCvs.height);
    const drawingData = drawingImageData.data;
    
    const maskImageData = finalMaskCtx.createImageData(mskCvs.width, mskCvs.height);
    const maskData = maskImageData.data;

    for (let i = 0; i < drawingData.length; i += 4) {
      const alpha = drawingData[i + 3];
      if (alpha > 0) {
        maskData[i] = 255; maskData[i + 1] = 255; maskData[i + 2] = 255; maskData[i + 3] = 255;
      } else {
        maskData[i] = 0; maskData[i + 1] = 0; maskData[i + 2] = 0; maskData[i + 3] = 255;
      }
    }

    finalMaskCtx.putImageData(maskImageData, 0, 0);

    onApply({
      baseImage: imageSrc,
      maskImage: finalMaskCanvas.toDataURL('image/png'),
      prompt,
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); handleUndo(); }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'Z' && e.shiftKey))) { e.preventDefault(); handleRedo(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handleUndo, handleRedo]);
  
  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-lg z-50 flex flex-col p-4" role="dialog" aria-modal="true" aria-labelledby="mask-editor-title">
        <header className="flex-shrink-0 flex justify-between items-center pb-4 border-b border-white/10">
            <h2 id="mask-editor-title" className="text-xl font-bold text-cyan-300">Image Editor</h2>
            <div className="flex items-center gap-4">
                <button 
                    onClick={onClose}
                    className="p-2 rounded-full text-slate-400 hover:bg-slate-700/50 hover:text-cyan-300 transition-colors"
                    aria-label="Close Editor"
                >
                    <Icons.CloseIcon className="h-6 w-6" />
                </button>
            </div>
        </header>
        
        <main className="flex-grow flex flex-col md:flex-row gap-4 py-4 min-h-0">
            <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-4 bg-slate-900/40 p-4 rounded-lg border border-white/10">
                <p className="text-sm text-slate-400">Paint a mask over the area you want to change, then describe the edit.</p>
                <div className="flex gap-2">
                    <button onClick={() => setIsErasing(false)} className={`flex-1 p-2 rounded-md transition-colors text-sm font-semibold ${!isErasing ? 'bg-cyan-500 text-black' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}>Brush</button>
                    <button onClick={() => setIsErasing(true)} className={`flex-1 p-2 rounded-md transition-colors text-sm font-semibold ${isErasing ? 'bg-cyan-500 text-black' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}>Eraser</button>
                </div>
                <div>
                    <label htmlFor="brush-size" className="text-sm font-medium text-slate-300 mb-2 block">Brush Size: {brushSize}px</label>
                    <input id="brush-size" type="range" min="5" max="150" value={brushSize} onChange={e => setBrushSize(Number(e.target.value))} className="w-full" />
                </div>
                <div className="flex gap-2">
                    <button onClick={handleUndo} disabled={historyIndex <= 0} className="flex-1 p-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold">Undo</button>
                    <button onClick={handleRedo} disabled={historyIndex >= history.length - 1} className="flex-1 p-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold">Redo</button>
                </div>
                <button onClick={handleClear} className="w-full p-2 rounded-md bg-red-600/50 hover:bg-red-600/80 text-white font-semibold flex items-center justify-center gap-2">Clear Mask</button>
                <div className="mt-auto flex flex-col gap-4">
                     <textarea
                        rows={4}
                        className="w-full bg-slate-800/80 border border-slate-600 rounded-lg shadow-inner py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition placeholder-slate-400"
                        placeholder="e.g., 'make this wall red brick', 'add a swimming pool'"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        aria-label="Edit prompt"
                    />
                    <button
                        onClick={handleApply}
                        disabled={!isReady || !prompt.trim() || historyIndex < 1}
                        className="w-full text-black font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 transform hover:scale-105"
                    >
                        Generate Edit
                    </button>
                </div>
            </aside>
            <section ref={containerRef} className="flex-grow bg-black/30 rounded-lg flex items-center justify-center relative overflow-hidden min-h-[300px]">
                {!isReady && <Icons.SpinnerIcon className="h-10 w-10 animate-spin text-cyan-400 absolute" />}
                <canvas 
                    ref={displayCanvasRef}
                    className={`touch-none ${isReady ? 'cursor-crosshair' : 'cursor-wait'}`}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
            </section>
        </main>
    </div>
  );
};

export default MaskingEditor;