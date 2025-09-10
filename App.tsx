import React, { useState, useCallback, lazy, Suspense, useEffect } from 'react';
import { RenderStyle, TimeOfDay, TimeOfYear, Weather, VegetationAmount, UrbanizationLevel, PeopleDensity, VehicleDensity, PropsDensity, CameraAngle } from './types';
import { generateRender, fileToBase64, generateInpainting } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import OptionSelector from './components/OptionSelector';
import RenderOutput from './components/RenderOutput';
import IconSelector, { IconOption } from './components/IconSelector';
import MultiImageUploader from './components/MultiImageUploader';
import SkeletonLoader from './components/SkeletonLoader';
import * as Icons from './components/Icons';

const ImagePreviewModal = lazy(() => import('./components/ImagePreviewModal'));
const ApiKeyModal = lazy(() => import('./components/ApiKeyModal'));
const MaskingEditor = lazy(() => import('./components/MaskingEditor'));

const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) throw new Error('Invalid data URL');
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

const weatherOptions: IconOption<Weather>[] = [
  { value: Weather.Sunny, label: 'Sunny', icon: <Icons.SunnyIcon /> },
  { value: Weather.Cloudy, label: 'Cloudy', icon: <Icons.CloudyIcon /> },
  { value: Weather.Rainy, label: 'Rainy', icon: <Icons.RainyIcon /> },
  { value: Weather.Snowy, label: 'Snowy', icon: <Icons.SnowyIcon /> },
  { value: Weather.AfterRain, label: 'After Rain', icon: <Icons.AfterRainIcon /> },
  { value: Weather.AfterSnow, label: 'After Snow', icon: <Icons.AfterSnowIcon /> },
  { value: Weather.Windy, label: 'Windy', icon: <Icons.WindyIcon /> },
];

const urbanizationOptions: IconOption<UrbanizationLevel>[] = [
    { value: UrbanizationLevel.None, label: 'None', icon: <Icons.NoIcon /> },
    { value: UrbanizationLevel.Suburban, label: 'Suburban', icon: <Icons.SuburbanIcon /> },
    { value: UrbanizationLevel.Urban, label: 'Urban', icon: <Icons.UrbanIcon /> },
    { value: UrbanizationLevel.Metropolis, label: 'Metropolis', icon: <Icons.MetropolisIcon /> },
];

const peopleOptions: IconOption<PeopleDensity>[] = [
    { value: PeopleDensity.None, label: 'None', icon: <Icons.NoIcon /> },
    { value: PeopleDensity.Few, label: 'Few', icon: <Icons.PeopleFewIcon /> },
    { value: PeopleDensity.Moderate, label: 'Moderate', icon: <Icons.PeopleModerateIcon /> },
    { value: PeopleDensity.Crowded, label: 'Crowded', icon: <Icons.PeopleCrowdedIcon /> },
];

const vehicleOptions: IconOption<VehicleDensity>[] = [
    { value: VehicleDensity.None, label: 'None', icon: <Icons.NoIcon /> },
    { value: VehicleDensity.Low, label: 'Low', icon: <Icons.VehicleLowIcon /> },
    { value: VehicleDensity.Medium, label: 'Medium', icon: <Icons.SuburbanIcon /> },
    { value: VehicleDensity.High, label: 'High', icon: <Icons.VehicleHighIcon /> },
];

const propsOptions: IconOption<PropsDensity>[] = [
    { value: PropsDensity.None, label: 'None', icon: <Icons.NoIcon /> },
    { value: PropsDensity.Low, label: 'Low', icon: <Icons.PropsLowIcon /> },
    { value: PropsDensity.Medium, label: 'Medium', icon: <Icons.PropsMediumIcon /> },
    { value: PropsDensity.High, label: 'High', icon: <Icons.PropsHighIcon /> },
];

const App: React.FC = () => {
  const [appLoading, setAppLoading] = useState(true);
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('gemini-api-key') || '');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  
  const [sketchupImage, setSketchupImage] = useState<File | null>(null);
  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [weatherImage, setWeatherImage] = useState<File | null>(null);
  
  const [renderStyle, setRenderStyle] = useState<RenderStyle>(RenderStyle.Modern);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(TimeOfDay.Afternoon);
  const [timeOfYear, setTimeOfYear] = useState<TimeOfYear>(TimeOfYear.Summer);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [vegetation, setVegetation] = useState<VegetationAmount>(VegetationAmount.Medium);
  const [cameraAngle, setCameraAngle] = useState<CameraAngle>(CameraAngle.AsIs);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  
  const [urbanization, setUrbanization] = useState<UrbanizationLevel>(UrbanizationLevel.None);
  const [peopleDensity, setPeopleDensity] = useState<PeopleDensity>(PeopleDensity.None);
  const [vehicleDensity, setVehicleDensity] = useState<VehicleDensity>(VehicleDensity.None);
  const [propsDensity, setPropsDensity] = useState<PropsDensity>(PropsDensity.None);
  const [strictMode, setStrictMode] = useState<boolean>(true);
  const [promptOnlyMode, setPromptOnlyMode] = useState<boolean>(false);


  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewingImage, setPreviewingImage] = useState<{ src: string; number: number } | null>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [isEditingMainSketch, setIsEditingMainSketch] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAppLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveApiKey = (newKey: string) => {
    const trimmedKey = newKey.trim();
    if (trimmedKey) {
        setApiKey(trimmedKey);
        localStorage.setItem('gemini-api-key', trimmedKey);
        setIsApiKeyModalOpen(false);
    }
  };

  const handleResetApiKey = useCallback(() => {
    setApiKey('');
    localStorage.removeItem('gemini-api-key');
    setIsApiKeyModalOpen(false);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!sketchupImage) {
      setError("Please upload a SketchUp screenshot first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const sketchupImageBase64 = await fileToBase64(sketchupImage);
      
      let referenceImagePayloads;
      if (referenceImages.length > 0) {
        referenceImagePayloads = await Promise.all(
          referenceImages.map(async (file) => ({
            base64: await fileToBase64(file),
            mimeType: file.type,
          }))
        );
      }
      
      let logoImagePayload;
      if (logoImage) {
          const logoImageBase64 = await fileToBase64(logoImage);
          logoImagePayload = { base64: logoImageBase64, mimeType: logoImage.type };
      }

      let weatherImagePayload;
      if (weatherImage) {
          const weatherImageBase64 = await fileToBase64(weatherImage);
          weatherImagePayload = { base64: weatherImageBase64, mimeType: weatherImage.type };
      }

      const result = await generateRender({
        sketchupImage: { base64: sketchupImageBase64, mimeType: sketchupImage.type },
        referenceImages: referenceImagePayloads,
        logoImage: logoImagePayload,
        weatherImage: weatherImagePayload,
        style: renderStyle,
        time: timeOfDay,
        weather,
        timeOfYear,
        vegetation,
        urbanization,
        people: peopleDensity,
        vehicles: vehicleDensity,
        props: propsDensity,
        angle: cameraAngle,
        customPrompt,
        strictMode,
        promptOnly: promptOnlyMode,
      }, apiKey);

      setGeneratedImages(prev => [result, ...prev]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (errorMessage.startsWith("API_KEY_ERROR:")) {
          setError(errorMessage.replace("API_KEY_ERROR: ", ""));
          setIsApiKeyModalOpen(true);
      } else {
          setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }, [sketchupImage, referenceImages, logoImage, weatherImage, renderStyle, timeOfDay, weather, timeOfYear, vegetation, urbanization, peopleDensity, vehicleDensity, propsDensity, cameraAngle, customPrompt, strictMode, apiKey, promptOnlyMode]);

  const handleSelectImageForAlteration = useCallback((dataUrl: string) => {
    const filename = `render_edit_${Date.now()}.png`;
    const file = dataURLtoFile(dataUrl, filename);
    setSketchupImage(file);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  const handleStartEditing = useCallback((src: string) => {
    setEditingImage(src);
    setIsEditingMainSketch(false);
    setIsEditing(true);
    if(previewingImage) setPreviewingImage(null);
  }, [previewingImage]);
  
  const handleEditSketchupImage = useCallback(() => {
    if (!sketchupImage) return;
    const reader = new FileReader();
    reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setEditingImage(dataUrl);
        setIsEditingMainSketch(true);
        setIsEditing(true);
    };
    reader.readAsDataURL(sketchupImage);
  }, [sketchupImage]);

  const handleCancelEditing = useCallback(() => {
    setIsEditing(false);
    setEditingImage(null);
    setIsEditingMainSketch(false);
  }, []);

  const handleApplyEdit = useCallback(async ({ baseImage, maskImage, prompt }: { baseImage: string, maskImage: string, prompt: string }) => {
    handleCancelEditing();
    setIsLoading(true);
    setError(null);

    try {
        const baseImageMimeType = baseImage.match(/:(.*?);/)?.[1] || 'image/png';
        const maskImageMimeType = maskImage.match(/:(.*?);/)?.[1] || 'image/png';

        const result = await generateInpainting({
            baseImage: { base64: baseImage.split(',')[1], mimeType: baseImageMimeType },
            maskImage: { base64: maskImage.split(',')[1], mimeType: maskImageMimeType },
            prompt,
            apiKey
        });

        if (isEditingMainSketch) {
            const newSketchupFile = dataURLtoFile(result, `sketch_edited_${Date.now()}.png`);
            setSketchupImage(newSketchupFile);
        }

        setGeneratedImages(prev => [result, ...prev]);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        if (errorMessage.startsWith("API_KEY_ERROR:")) {
            setError(errorMessage.replace("API_KEY_ERROR: ", ""));
            setIsApiKeyModalOpen(true);
        } else {
            setError(errorMessage);
        }
    } finally {
        setIsLoading(false);
        setIsEditingMainSketch(false);
    }
}, [apiKey, handleCancelEditing, isEditingMainSketch]);

  const handleDownloadImage = useCallback((dataUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `render_${index}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  if (appLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onManageApiKey={() => setIsApiKeyModalOpen(true)} />
      <main className="flex-grow flex flex-col md:flex-row p-4 gap-4">
        {/* Controls Panel */}
        <aside className="relative w-full md:w-1/3 lg:w-1/4 xl:w-1/5 flex flex-col gap-4 p-4 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/30">
          <div className={`flex-grow flex flex-col gap-4 overflow-y-auto pr-2 transition-opacity duration-300 ${isEditing ? 'opacity-30 pointer-events-none' : ''}`}>
            <div className="h-48">
                <ImageUploader 
                    id="sketchup-upload" 
                    title="Upload Sketch" 
                    subtitle="Main design screenshot" 
                    onImageUpload={setSketchupImage} 
                    value={sketchupImage}
                    onEdit={handleEditSketchupImage} 
                />
            </div>

            <div className="flex items-center justify-between bg-black/20 p-3 rounded-lg border border-white/10">
              <div className="flex items-center">
                <Icons.CheckIcon />
                <label htmlFor="prompt-only-toggle" className="ml-2 text-sm font-medium text-slate-300">
                  Prompt-Only Mode
                </label>
              </div>
              <button
                id="prompt-only-toggle"
                onClick={() => setPromptOnlyMode(!promptOnlyMode)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 ${
                  promptOnlyMode ? 'bg-cyan-500' : 'bg-slate-700/80'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out shadow-md ${
                    promptOnlyMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div>
              <label htmlFor="custom-prompt" className="flex items-center text-sm font-medium text-slate-300 mb-2">
                <Icons.PromptIcon />
                <span className="ml-2">Additional Details & Edits</span>
              </label>
              <textarea
                id="custom-prompt"
                rows={3}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg shadow-inner py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition placeholder-slate-400"
                placeholder="e.g., 'add a sports car in the driveway', 'make the windows larger'"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
              />
            </div>

            <fieldset 
                disabled={promptOnlyMode} 
                className="flex flex-col gap-4 border-t border-white/10 pt-4 transition-opacity duration-300 disabled:opacity-40 disabled:pointer-events-none"
            >
                <legend className="sr-only">Detailed Render Settings</legend>
                <div>
                    <MultiImageUploader id="reference-upload" title="Style Reference(s)" value={referenceImages} onImageChange={setReferenceImages} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="h-36"><ImageUploader id="logo-upload" title="Upload Logo" subtitle="(Optional) Watermark" onImageUpload={setLogoImage} value={logoImage} /></div>
                    <div className="h-36"><ImageUploader id="weather-upload" title="Weather Reference" subtitle="(Optional) Atmosphere" onImageUpload={setWeatherImage} value={weatherImage} /></div>
                </div>
                
                <div className="flex items-center justify-between bg-black/20 p-3 rounded-lg border border-white/10">
                <div className="flex items-center">
                    <Icons.StrictIcon />
                    <label htmlFor="strict-mode-toggle" className="ml-2 text-sm font-medium text-slate-300">
                    Strict Structural Integrity
                    </label>
                </div>
                <button
                    id="strict-mode-toggle"
                    onClick={() => setStrictMode(!strictMode)}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 ${
                      strictMode ? 'bg-cyan-500' : 'bg-slate-700/80'
                    }`}
                >
                    <span
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out shadow-md ${
                        strictMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                    />
                </button>
                </div>

                <OptionSelector
                label="Render Style"
                icon={<Icons.StyleIcon />}
                options={Object.values(RenderStyle)}
                value={renderStyle}
                onChange={(value) => setRenderStyle(value as RenderStyle)}
                />

                <OptionSelector
                label="Camera Angle"
                icon={<Icons.CameraIcon />}
                options={Object.values(CameraAngle)}
                value={cameraAngle}
                onChange={(value) => setCameraAngle(value as CameraAngle)}
                />
                
                <OptionSelector
                label="Time of Day"
                icon={<Icons.TimeIcon />}
                options={Object.values(TimeOfDay)}
                value={timeOfDay}
                onChange={(value) => setTimeOfDay(value as TimeOfDay)}
                />
                
                <OptionSelector
                label="Time of Year"
                icon={<Icons.SeasonIcon />}
                options={Object.values(TimeOfYear)}
                value={timeOfYear}
                onChange={(value) => setTimeOfYear(value as TimeOfYear)}
                />

                <IconSelector
                    label="Weather"
                    labelIcon={<Icons.WeatherIcon />}
                    options={weatherOptions}
                    value={weather}
                    onChange={(value) => setWeather(value as Weather)}
                />
                
                <OptionSelector
                label="Vegetation"
                icon={<Icons.VegetationIcon />}
                options={Object.values(VegetationAmount)}
                value={vegetation}
                onChange={(value) => setVegetation(value as VegetationAmount)}
                />

                <div className='pt-2 border-t border-white/10 flex flex-col gap-4'>
                    <IconSelector label="Urbanization" labelIcon={<Icons.UrbanizationIcon />} options={urbanizationOptions} value={urbanization} onChange={(value) => setUrbanization(value as UrbanizationLevel)} />
                    <IconSelector label="People Density" labelIcon={<Icons.PeopleDensityIcon />} options={peopleOptions} value={peopleDensity} onChange={(value) => setPeopleDensity(value as PeopleDensity)} />
                    <IconSelector label="Vehicle Density" labelIcon={<Icons.VehicleDensityIcon />} options={vehicleOptions} value={vehicleDensity} onChange={(value) => setVehicleDensity(value as VehicleDensity)} />
                    <IconSelector label="Props Density" labelIcon={<Icons.PropsDensityIcon />} options={propsOptions} value={propsDensity} onChange={(value) => setPropsDensity(value as PropsDensity)} />
                </div>
            </fieldset>

          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !sketchupImage || isEditing}
            className="w-full text-black font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-auto bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <Icons.SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Generating...
              </>
            ) : (
              'Generate Render'
            )}
          </button>
          {isEditing && (
             <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 rounded-2xl">
                <Icons.MaskIcon className="h-10 w-10 text-cyan-300" />
                <h3 className="text-lg font-bold mt-2 text-white">Edit Mode Active</h3>
                <p className="text-slate-300 text-sm">Use the editor to apply changes to the image.</p>
             </div>
          )}
        </aside>

        {/* Output Area */}
        <section className="flex-grow w-full md:w-2/3 lg:w-3/4 xl:w-4/5 h-[60vh] md:h-auto">
          <RenderOutput 
            generatedImages={generatedImages} 
            isLoading={isLoading} 
            error={error}
            onPreviewImage={(src, number) => setPreviewingImage({ src, number })}
            onEditImage={(src) => handleStartEditing(src)}
          />
        </section>
      </main>

      <Suspense fallback={null}>
        {previewingImage && (
          <ImagePreviewModal
            image={previewingImage}
            onClose={() => setPreviewingImage(null)}
            onEdit={() => {
              handleStartEditing(previewingImage.src);
            }}
            onDownload={() => {
              handleDownloadImage(previewingImage.src, previewingImage.number);
            }}
          />
        )}
        
        {isApiKeyModalOpen && (
          <ApiKeyModal
            initialValue={apiKey}
            onSave={handleSaveApiKey}
            onClose={() => setIsApiKeyModalOpen(false)}
            onReset={handleResetApiKey}
          />
        )}

        {isEditing && editingImage && (
          <MaskingEditor
            imageSrc={editingImage}
            onClose={handleCancelEditing}
            onApply={handleApplyEdit}
          />
        )}
      </Suspense>
    </div>
  );
};

export default App;