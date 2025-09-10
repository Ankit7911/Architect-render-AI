import React from 'react';

// Default props for standardized icons
const iconProps = {
  className: "h-6 w-6",
  viewBox: "0 0 20 20",
  fill: "currentColor"
};

const smallIconProps = {
  className: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
};

// General Icons
export const SettingsIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const ClearIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const ImageIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const SpinnerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const PlaceholderIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-slate-600" fill="none" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="placeholder-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: 'currentColor', stopOpacity: 0.6}} />
          <stop offset="100%" style={{stopColor: 'currentColor', stopOpacity: 0.8}} />
        </linearGradient>
      </defs>
      <path d="M8 56V21.48a1,1,0,0,1,.4-.8L29.51,2.05a1.59,1.59,0,0,1,1.72-.1,1.51,1.51,0,0,1,.89,1.38V56" stroke="url(#placeholder-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M32 56V7.48a1,1,0,0,1,.4-.8L53.51,18.05a1.59,1.59,0,0,1,1.72-.1,1.51,1.51,0,0,1,.89,1.38V56" stroke="url(#placeholder-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M8 56h48" stroke="url(#placeholder-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M48,28.24c6.9-1.3,10.2-8.52,7.53-15-2.22-5.38-8.32-8.15-14-6.32" stroke="url(#placeholder-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
);

export const ErrorIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const PreviewIcon: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const EditIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
  </svg>
);

export const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps}><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
);

export const AddIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

export const MultiUploaderStyleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps}><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
);

// Masking Editor Icons
export const BrushIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
);
export const EraserIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 20l-4.5-4.5M20 4l-8.5 8.5-4-4L20 4zM4 20l12-12-4-4L4 20zM9 11l-4 4"></path>
    </svg>
);
export const UndoIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 0 9 4 9 9 0 0 0 8.5-6"></path><path d="M3 7l6 6"></path>
    </svg>
);
export const RedoIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-4 9 9 0 0 0-8.5 6"></path><path d="M21 7l-6 6"></path>
    </svg>
);
export const ClearAllIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M10 11v6"></path><path d="M14 11v6"></path>
    </svg>
);
export const MaskIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM6 9a4 4 0 014-4v8a4 4 0 01-4-4z" clipRule="evenodd" />
    </svg>
);

// Control Panel Icons
export const CheckIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps}><path d="M17.293 4.293a1 1 0 011.414 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 11.586l7.293-7.293z" /></svg>;
export const PromptIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps}><path fillRule="evenodd" d="M5 2a1 1 0 00-1 1v1.586l-1.293 1.293a1 1 0 001.414 1.414L5 6.414V8a1 1 0 002 0V6.414l1.293 1.293a1 1 0 001.414-1.414L8 4.586V3a1 1 0 00-2 0v.586L5.293 2.293A1 1 0 005 2zm8 0a1 1 0 011-1h.01a1 1 0 010 2h-.01a1 1 0 01-1-1zm-2 5a1 1 0 011-1h.01a1 1 0 110 2h-.01a1 1 0 01-1-1zM2 10a1 1 0 011-1h.01a1 1 0 110 2H3a1 1 0 01-1-1zm5 4a1 1 0 011-1h.01a1 1 0 110 2h-.01a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;
export const StrictIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
export const StyleIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps}><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>;
export const CameraIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps}><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm10 2a1 1 0 10-2 0v1a1 1 0 102 0V4zM4 9a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm4 0a1 1 0 011-1h1a1 1 0 110 2H9a1 1 0 01-1-1zm5-1a1 1 0 10-2 0v1a1 1 0 102 0V8zM8 13a1 1 0 011-1h1a1 1 0 110 2H9a1 1 0 01-1-1zm-4 0a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm9-1a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd" /></svg>;
export const TimeIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps}><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z" clipRule="evenodd" /></svg>;
export const SeasonIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps}><path d="M14.5 10a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"/></svg>;
export const WeatherIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps}><path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201-4.459A5.5 5.5 0 018.5 3.006a6 6 0 014.073 9.878 5.5 5.5 0 012.739-1.462zM12 15.5a1 1 0 01.993.883L13 16.5v1.006a1 1 0 01-1.993.117L11 17.5v-1a1 1 0 011-1zm-4 0a1 1 0 01.993.883L9 16.5v1.006a1 1 0 11-2 0L7 16.5v-1a1 1 0 011-1zm8 0a1 1 0 01.993.883L17 16.5v1.006a1 1 0 11-2 0L15 16.5v-1a1 1 0 011-1z" clipRule="evenodd" /></svg>;
export const VegetationIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps}><path d="M12.965 2.584C11.326 1.632 9.423 1 7.25 1 4.355 1 2 3.013 2 5.5c0 1.41.748 2.723 1.954 3.737C5.178 10.218 6 11.83 6 13.5V19h1v-5.5c0-1.52.75-2.982 1.92-3.95A4.505 4.505 0 0112.5 5.5c.98 0 1.884.316 2.635.862.751.546 1.365 1.196 1.865 1.936V19h1v-9.5c0-2.485-2.015-4.5-4.5-4.5h-.035z" /></svg>;
export const UrbanizationIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
export const PeopleDensityIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
export const VehicleDensityIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-2h8a1 1 0 001-1z" /></svg>;
export const PropsDensityIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>;

// Icon Selector Options
export const SunnyIcon: React.FC = () => <svg {...iconProps}><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z" clipRule="evenodd" /></svg>;
export const CloudyIcon: React.FC = () => <svg {...iconProps}><path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" /></svg>;
export const RainyIcon: React.FC = () => <svg {...iconProps} viewBox="0 0 20 20"><path fillRule="evenodd" d="M15.707 8.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 12.586l4.293-4.293a1 1 0 011.414 0zM10 2a5.5 5.5 0 014.236 9.36l-7.469 7.469A.5.5 0 016 18.5V17a1 1 0 00-1-1H3a1 1 0 01-.707-1.707L10 6.586 12.293 4.293A5.486 5.486 0 0110 2z" clipRule="evenodd" transform="translate(0, -2) scale(1.2)" /></svg>;
export const SnowyIcon: React.FC = () => <svg {...iconProps}><path d="M10 3a1 1 0 011 1v1.586l.707-.707a1 1 0 011.414 1.414l-1.5 1.5a1 1 0 01-1.414 0l-1.5-1.5a1 1 0 111.414-1.414L10 5.586V4a1 1 0 011-1zm-4.293 8.293a1 1 0 011.414 0L8 12.172l.879-.879a1 1 0 111.414 1.414l-1.5 1.5a1 1 0 01-1.414 0l-1.5-1.5a1 1 0 010-1.414zM14.293 11.293a1 1 0 011.414 0l.879.879.879-.879a1 1 0 111.414 1.414l-1.5 1.5a1 1 0 01-1.414 0l-1.5-1.5a1 1 0 010-1.414zM4 10a1 1 0 011-1h1.586l.707-.707a1 1 0 111.414 1.414l-1.5 1.5a1 1 0 01-1.414 0l-1.5-1.5A1 1 0 014 10zm11.293-2.293a1 1 0 011.414 0l.879.879.879-.879a1 1 0 111.414 1.414l-1.5 1.5a1 1 0 01-1.414 0l-1.5-1.5a1 1 0 010-1.414z" /></svg>;
export const AfterRainIcon: React.FC = () => <svg {...iconProps}><g fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z" clipRule="evenodd" opacity="0.9" /><path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" opacity="0.6"/><path d="M4 18.5a.5.5 0 000 1h12a.5.5 0 000-1H4z" opacity="0.5"/></g></svg>;
export const AfterSnowIcon: React.FC = () => <svg {...iconProps}><g fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z" clipRule="evenodd" /><path d="M4 17a1 1 0 011-1h.586l.707-.707a1 1 0 111.414 1.414l-1.5 1.5a1 1 0 01-1.414 0l-1.5-1.5A1 1 0 014 17zm7.293-2.293a1 1 0 011.414 0l.879.879.879-.879a1 1 0 111.414 1.414l-1.5 1.5a1 1 0 01-1.414 0l-1.5-1.5a1 1 0 010-1.414z" opacity="0.7" /></g></svg>;
export const WindyIcon: React.FC = () => <svg {...iconProps}><path d="M3.5 6.5a1 1 0 011-1h12a1 1 0 110 2h-12a1 1 0 01-1-1zM2 10.5a1 1 0 011-1h9a1 1 0 110 2H3a1 1 0 01-1-1zm1.5 4a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" /></svg>;
export const NoIcon: React.FC = () => <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>;
export const SuburbanIcon: React.FC = () => <svg {...iconProps}><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>;
export const UrbanIcon: React.FC = () => <svg {...iconProps}><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 11-2 0V4H6v12a1 1 0 11-2 0V4zm3 1a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1zm-1 4a1 1 0 100 2h2a1 1 0 100-2H6zm2 4a1 1 0 110 2H6a1 1 0 110-2h2zm4-4a1 1 0 100 2h2a1 1 0 100-2h-2zm2 4a1 1 0 110 2h-2a1 1 0 110-2h2z" clipRule="evenodd" /></svg>;
export const MetropolisIcon: React.FC = () => <svg {...iconProps}><path d="M15 12a1 1 0 100-2H5a1 1 0 000 2h10zM2 6a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm1 10a1 1 0 100 2h14a1 1 0 100-2H3z" /></svg>;
export const PeopleFewIcon: React.FC = () => <svg {...iconProps}><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
export const PeopleModerateIcon: React.FC = () => <svg {...iconProps}><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm-1.5 5.5a3 3 0 00-3 0V17a1 1 0 001 1h4a1 1 0 001-1v-2.5a3 3 0 00-3 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zm-1.5 5.5a3 3 0 00-3 0V17a1 1 0 001 1h4a1 1 0 001-1v-2.5a3 3 0 00-3 0z" /></svg>;
export const PeopleCrowdedIcon: React.FC = () => <svg {...iconProps}><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3.004 3.004 0 013.75-2.906z" /></svg>;
export const VehicleLowIcon: React.FC = () => <svg {...iconProps}><path fillRule="evenodd" d="M18 8a2 2 0 11-4 0 2 2 0 014 0zm-4 2a4 4 0 100 8 4 4 0 000-8zM2 8a2 2 0 114 0 2 2 0 01-4 0zm4 2a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" /></svg>;
export const VehicleHighIcon: React.FC = () => <svg {...iconProps}><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 11.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L12 11.586l3.293-3.293a1 1 0 01.414-.293H12z" clipRule="evenodd" /></svg>;
export const PropsLowIcon: React.FC = () => <svg {...iconProps}><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg>;
export const PropsMediumIcon: React.FC = () => <svg {...iconProps}><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
export const PropsHighIcon: React.FC = () => <svg {...iconProps}><path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0h10v10H5V5z" clipRule="evenodd" /></svg>;