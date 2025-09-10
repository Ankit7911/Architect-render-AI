import React from 'react';

export interface IconOption<T extends string> {
  value: T;
  label: string;
  icon: JSX.Element;
}

interface IconSelectorProps<T extends string> {
  label: string;
  labelIcon: JSX.Element;
  options: IconOption<T>[];
  value: T;
  onChange: (value: T) => void;
  columns?: number;
}

const IconSelector = <T extends string>({
  label,
  labelIcon,
  options,
  value,
  onChange,
  columns = 4,
}: IconSelectorProps<T>) => {
  return (
    <div>
      <label className="flex items-center text-sm font-medium text-slate-300 mb-2">
        {labelIcon}
        <span className="ml-2">{label}</span>
      </label>
      <div className={`grid grid-cols-${columns} gap-2`}>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 border-2 text-center shadow-inner ${
              value === option.value
                ? 'bg-cyan-500/20 border-cyan-400 shadow-cyan-500/20'
                : 'bg-slate-900/40 border-slate-700 hover:border-slate-500'
            }`}
            title={option.label}
          >
            <div className={`mb-1 ${value === option.value ? 'text-cyan-300' : 'text-slate-300'}`}>
              {option.icon}
            </div>
            <span className={`text-xs font-medium ${value === option.value ? 'text-white' : 'text-slate-300'}`}>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IconSelector;
