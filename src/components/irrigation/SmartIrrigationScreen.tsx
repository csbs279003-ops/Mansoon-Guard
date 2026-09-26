import React, { useState } from 'react';
import { 
  Droplets, 
  CloudRain, 
  Sun, 
  Zap, 
  Clock, 
  Calendar, 
  Gauge, 
  Layers, 
  Volume2, 
  VolumeX, 
  IndianRupee, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Sparkles,
  Info,
  ChevronRight,
  TrendingDown,
  Power
} from 'lucide-react';
import { PanchayatData, Language, ScreenId } from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { speakAdvisory, stopSpeakingAudio, playHapticSound } from '../../utils/audio';
import { IRRIGATION_REFERENCE_IMAGES } from '../../data/agriImages';

interface Props {
  panchayat: PanchayatData;
  language: Language;
  onNavigate?: (screenId: ScreenId) => void;
  showHotspots?: boolean;
}

export const SmartIrrigationScreen: React.FC<Props> = ({
  panchayat,
  language,
  onNavigate,
  showHotspots,
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;
  const irr = panchayat.irrigationSchedule;

  const [farmAcres, setFarmAcres] = useState<number>(3);
  const [selectedMethod, setSelectedMethod] = useState<'drip' | 'sprinkler' | 'flood'>('drip');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const isSkip = irr.irrigationDecision === 'SKIP_RAIN_APPROACHING';
  const isIrrigateNow = irr.irrigationDecision === 'IRRIGATE_NOW';

  // Dynamic calculations based on user's farm size
  const totalWaterLitres = isSkip ? 0 : irr.waterRequirementLitresPerAcre * farmAcres;
  const totalCostSaved = isSkip ? irr.costSavingsINR * farmAcres : 0;
  
  const getRunTimeDisplay = () => {
    if (isSkip) return '0 Mins (Pump Paused)';
    if (selectedMethod === 'drip') return `${irr.dripRunTimeMinutes} Mins`;
    if (selectedMethod === 'sprinkler') return `${irr.sprinklerRunTimeMinutes} Mins`;
    return `${irr.floodPumpRunTimeHours} Hours (5 HP Pump)`;
  };

  const handleToggleVoice = () => {
    if (isAudioPlaying) {
      stopSpeakingAudio();
      setIsAudioPlaying(false);
    } else {
      setIsAudioPlaying(true);
      const voiceText = `${language === 'mr' || language === 'hi' ? irr.decisionHeadlineRegional : irr.decisionHeadline}. ${language === 'mr' || language === 'hi' ? irr.decisionRationaleRegional : irr.decisionRationale}. ${irr.recommendedTiming}.`;
      speakAdvisory(voiceText, language, () => {
        setIsAudioPlaying(false);
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 max-w-4xl mx-auto w-full">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {t.irrigationTitle}
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300">
                  {panchayat.name} ({panchayat.state})
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.irrigationSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleVoice}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
              isAudioPlaying
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                : 'bg-cyan-600 hover:bg-cyan-700 text-white'
            }`}
          >
            {isAudioPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            {isAudioPlaying ? t.stopAudio : t.listenAdvisory}
          </button>
        </div>

        {/* ================= BIG FRIENDLY DECISION CARD ================= */}
        <div className={`p-5 rounded-2xl border transition-all mt-3 ${
          isSkip
            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500/40 text-emerald-950 dark:text-emerald-100'
            : isIrrigateNow
            ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-500/40 text-amber-950 dark:text-amber-100'
            : 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-500/40 text-cyan-950 dark:text-cyan-100'
        }`}>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider opacity-80 flex items-center gap-1.5">
              <Power className="w-3.5 h-3.5" />
              {t.shouldIRunPumpToday}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wide ${
              isSkip
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-amber-600 text-white shadow-xs'
            }`}>
              {isSkip ? t.pumpDecisionNo : t.pumpDecisionYes}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black leading-snug mb-2">
            {language === 'mr' || language === 'hi' ? irr.decisionHeadlineRegional : irr.decisionHeadline}
          </h3>

          <p className="text-xs sm:text-sm opacity-90 leading-relaxed mb-3">
            {language === 'mr' || language === 'hi' ? irr.decisionRationaleRegional : irr.decisionRationale}
          </p>

          <div className="pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="font-semibold flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-700 dark:text-cyan-400" />
              Best Timing: {irr.recommendedTiming}
            </span>
            {isSkip && (
              <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5" />
                Est. Energy Saved: ₹{totalCostSaved.toLocaleString()} on {farmAcres} Acres
              </span>
            )}
          </div>
        </div>

        {/* 4 Key Hydrology Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-cyan-600" />
              <span>Current Soil Moisture</span>
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white">
              {irr.currentSoilMoisturePercent}%
            </div>
            <span className="text-[10px] text-slate-400">
              Field Capacity: {irr.fieldCapacityPercent}%
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
              <CloudRain className="w-3.5 h-3.5 text-blue-600" />
              <span>Upcoming Rain</span>
            </div>
            <div className="text-xl font-black text-blue-700 dark:text-blue-400">
              {irr.upcomingRainfallMm} mm
            </div>
            <span className="text-[10px] text-slate-400">
              In next 3 days
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              <span>Daily Evaporation</span>
            </div>
            <div className="text-xl font-black text-amber-700 dark:text-amber-400">
              {irr.dailyEvapotranspirationMm} mm/day
            </div>
            <span className="text-[10px] text-slate-400">
              Crop ET₀ Rate
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Wilting Threshold</span>
            </div>
            <div className="text-xl font-black text-rose-600 dark:text-rose-400">
              {irr.wiltingPointPercent}%
            </div>
            <span className="text-[10px] text-slate-400">
              Permanent Wilting Point
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Farm Sizing & Pump Calculator */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              Custom Farm Water Calculator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Adjust farm size and irrigation method to see exact pump run duration
            </p>
          </div>

          {/* Farm Size Pill Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {[1, 2, 3, 5, 10].map((acres) => (
              <button
                key={acres}
                onClick={() => {
                  playHapticSound('tap');
                  setFarmAcres(acres);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  farmAcres === acres
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                {acres} Acre{acres > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Method Toggle Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => {
              playHapticSound('tap');
              setSelectedMethod('drip');
            }}
            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
              selectedMethod === 'drip'
                ? 'border-cyan-600 bg-cyan-50/60 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-300 font-bold'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Droplets className="w-4 h-4 mx-auto mb-1 text-cyan-600" />
            <div className="text-xs">{t.dripRuntime}</div>
            <div className="text-sm font-black mt-0.5">{isSkip ? '0 Mins' : `${irr.dripRunTimeMinutes} Mins`}</div>
          </button>

          <button
            onClick={() => {
              playHapticSound('tap');
              setSelectedMethod('sprinkler');
            }}
            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
              selectedMethod === 'sprinkler'
                ? 'border-cyan-600 bg-cyan-50/60 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-300 font-bold'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <CloudRain className="w-4 h-4 mx-auto mb-1 text-blue-600" />
            <div className="text-xs">{t.sprinklerRuntime}</div>
            <div className="text-sm font-black mt-0.5">{isSkip ? '0 Mins' : `${irr.sprinklerRunTimeMinutes} Mins`}</div>
          </button>

          <button
            onClick={() => {
              playHapticSound('tap');
              setSelectedMethod('flood');
            }}
            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
              selectedMethod === 'flood'
                ? 'border-cyan-600 bg-cyan-50/60 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-300 font-bold'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Power className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
            <div className="text-xs">{t.floodPumpRuntime}</div>
            <div className="text-sm font-black mt-0.5">{isSkip ? '0 Hours' : `${(irr.floodPumpRunTimeHours * (farmAcres / 3)).toFixed(1)} Hours`}</div>
          </button>
        </div>

        {/* Dynamic Water Volume Banner */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between flex-wrap gap-3">
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t.waterVolumeNeeded} ({farmAcres} Acres)</span>
            <span className="text-lg font-black text-cyan-800 dark:text-cyan-300">
              {totalWaterLitres.toLocaleString()} Litres
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t.energyCostSaved}</span>
            <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">
              ₹{totalCostSaved.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Visual Equipment Reference Photo */}
        {selectedMethod === 'drip' && (
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 relative h-28 group">
            <img 
              src={IRRIGATION_REFERENCE_IMAGES.drip.url} 
              alt="Drip Irrigation Field" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-3">
              <div>
                <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider block">Equipment Reference</span>
                <span className="text-white text-xs font-semibold">{IRRIGATION_REFERENCE_IMAGES.drip.desc}</span>
              </div>
            </div>
          </div>
        )}
        {selectedMethod === 'sprinkler' && (
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 relative h-28 group">
            <img 
              src={IRRIGATION_REFERENCE_IMAGES.sprinkler.url} 
              alt="Sprinkler Irrigation Field" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-3">
              <div>
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block">Equipment Reference</span>
                <span className="text-white text-xs font-semibold">{IRRIGATION_REFERENCE_IMAGES.sprinkler.desc}</span>
              </div>
            </div>
          </div>
        )}
        {selectedMethod === 'flood' && (
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 relative h-28 group">
            <img 
              src={IRRIGATION_REFERENCE_IMAGES.floodPump.url} 
              alt="Borewell Flood Irrigation" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-3">
              <div>
                <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block">Equipment Reference</span>
                <span className="text-white text-xs font-semibold">{IRRIGATION_REFERENCE_IMAGES.floodPump.desc}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Root-Zone Soil Depth Profile */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-600" />
          {t.soilDepthProfile}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {irr.soilDepthWetness.map((depth, i) => (
            <div 
              key={i}
              className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-3.5 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {language === 'mr' || language === 'hi' ? depth.zoneRegional : depth.zone}
                </span>
                <span className="text-slate-400 text-[10px] font-mono">{depth.depthCm}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  {depth.moisturePercent}%
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  depth.status === 'CRITICAL_DRY'
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    : depth.status === 'SATURATED'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                }`}>
                  {depth.status.replace('_', ' ')}
                </span>
              </div>

              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    depth.status === 'CRITICAL_DRY'
                      ? 'bg-rose-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, depth.moisturePercent * 2.5)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Day Weekly Water Schedule Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-cyan-600" />
          {t.weeklyWaterPlan}
        </h3>

        <div className="space-y-2">
          {irr.weeklySchedule.map((day, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 rounded-xl p-3 flex items-center justify-between flex-wrap gap-2 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-slate-900 dark:text-white min-w-[90px]">
                  {day.day}
                </span>
                <span className="text-slate-400 text-[11px] font-mono">
                  {day.date}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {day.rainExpectedMm > 0 && (
                  <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
                    <CloudRain className="w-3.5 h-3.5" />
                    {day.rainExpectedMm} mm Rain
                  </span>
                )}

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  day.action === 'SKIP_RAIN'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    : day.action === 'IRRIGATE'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : day.action === 'LIGHT_DRIP'
                    ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300'
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                }`}>
                  {day.action.replace('_', ' ')}
                </span>
              </div>

              <span className="text-[11px] text-slate-500 dark:text-slate-400 w-full sm:w-auto">
                {day.notes}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
