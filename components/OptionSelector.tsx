
import React from 'react';

interface OptionSelectorProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  icon: JSX.Element;
}

const OptionSelector = <T extends string,>({ label, options, value, onChange, icon }: OptionSelectorProps<T>): JSX.Element => {
  const id = `selector-${label.toLowerCase().replace(/\s/g, '-')}`;
  return (
    <div className="w-full">
      <label htmlFor={id} className="flex items-center text-sm font-medium text-slate-300 mb-2">
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full bg-slate-900/50 border border-slate-600 rounded-lg shadow-inner py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-slate-800">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OptionSelector;
