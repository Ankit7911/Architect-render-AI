import React from 'react';
import { SettingsIcon } from './Icons';

interface HeaderProps {
  onManageApiKey: () => void;
}

const Header: React.FC<HeaderProps> = ({ onManageApiKey }) => {
  return (
    <header className="w-full p-4 border-b border-white/10 bg-slate-900/30 backdrop-blur-lg sticky top-0 z-20 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-cyan-300">Architectural Render AI</h1>
        <p className="text-slate-400">From Sketch to Reality, Instantly.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm text-slate-400">
            Powered by <span className="font-semibold text-slate-200">Bhupindra Planners</span>
          </p>
        </div>
        <button 
          onClick={onManageApiKey} 
          className="p-2 rounded-full text-slate-400 hover:bg-slate-700/50 hover:text-cyan-300 transition-colors"
          aria-label="Manage API Key"
        >
          <SettingsIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
