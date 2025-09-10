import React, { useState } from 'react';
import { CloseIcon } from './Icons';

interface ApiKeyModalProps {
  initialValue: string;
  onSave: (apiKey: string) => void;
  onClose?: () => void;
  onReset?: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ initialValue, onSave, onClose, onReset }) => {
  const [key, setKey] = useState(initialValue);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      onSave(key.trim());
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="api-key-title"
    >
      <div
        className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-6 w-full max-w-md flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 id="api-key-title" className="text-xl font-bold text-cyan-300">
              Set Your API Key
            </h2>
            <p className="text-slate-400 mt-1 text-sm">
              You can provide a custom Google Gemini API key below.
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition"
              aria-label="Close settings"
            >
              <CloseIcon className="h-7 w-7" />
            </button>
          )}
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div>
            <label htmlFor="api-key-input" className="block text-sm font-medium text-slate-300 mb-2">
              Custom Gemini API Key
            </label>
            <input
              id="api-key-input"
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-600 rounded-lg shadow-inner py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition"
              placeholder="Enter your custom API key here"
            />
          </div>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-cyan-300 hover:text-cyan-200 hover:underline text-center"
          >
            Get an API Key from Google AI Studio
          </a>
          <div className="flex flex-col sm:flex-row-reverse gap-3">
            <button
                type="submit"
                disabled={!key.trim()}
                className="w-full sm:w-auto flex-grow text-black font-bold py-2.5 px-4 rounded-lg shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300"
            >
                Save Key
            </button>
            {onReset && (
                <button
                    type="button"
                    onClick={onReset}
                    className="w-full sm:w-auto bg-slate-700/80 text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:bg-slate-700/100 border border-transparent hover:border-slate-500 transition-all duration-300 flex items-center justify-center gap-2"
                >
                    Reset to Default
                </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyModal;
