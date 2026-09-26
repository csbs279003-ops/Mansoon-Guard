import React, { useState } from 'react';
import { 
  Waves, 
  Droplet, 
  Gauge, 
  Compass, 
  Sprout, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  Sliders, 
  ArrowRight, 
  Share2, 
  MessageSquare,
  Sparkles,
  Info,
  ChevronRight
} from 'lucide-react';
import { PanchayatData, Language, WaterAvailabilityStatus, CropType, RecommendedCrop } from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { openWhatsAppShare, openRealSmsShare, shareOrCopy, generateLocalizedAlertText } from '../../utils/share';
import { playHapticSound } from '../../utils/audio';
import { HYDROLOGY_REFERENCE_IMAGES, CROP_REFERENCE_IMAGES } from '../../data/agriImages';

interface Props {
  panchayat: PanchayatData;
  language: Language;
  onNavigate?: (screenId: any) => void;
  showHotspots?: boolean;
}

export const RiverWaterAdvisoryScreen: React.FC<Props> = ({
  panchayat,
  language,
  onNavigate,
  showHotspots,
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;
  const river = panchayat.riverWater;
  
  // Interactive situation override to simulate different water scenarios
  const [selectedSituation, setSelectedSituation] = useState<WaterAvailabilityStatus>(river.status);
  const [copied, setCopied] = useState(false);

  // Dynamic crops calculation if user overrides situation
  const currentCrops: RecommendedCrop[] = river.recommendedCrops;

  const handleShareWhatsApp = () => {
    const text = generateLocalizedAlertText(panchayat, 'cotton', language);
    openWhatsAppShare(text);
  };

  const handleShareSms = () => {
    const text = generateLocalizedAlertText(panchayat, 'cotton', language);
    openRealSmsShare(text);
  };

  const handleCopy = async () => {
    const text = generateLocalizedAlertText(panchayat, 'cotton', language);
    const success = await shareOrCopy(text, `${panchayat.name} River & Crop Advisory`);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getStatusColor = (status: WaterAvailabilityStatus) => {
    switch (status) {
      case 'critical_deficit':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30';
      case 'low':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30';
      case 'moderate':
        return 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/30';
      case 'optimal':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30';
      case 'flood_alert':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 max-w-4xl mx-auto w-full">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {t.riverWaterTitle}
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300">
                  {panchayat.name} ({panchayat.block})
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.riverWaterSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp Alert
            </button>
            <button
              onClick={handleShareSms}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              SMS Alert
            </button>
          </div>
        </div>

        {/* River Hydrology Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Gauge className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>{t.riverGaugeHeight}</span>
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {river.gaugeHeightMeters} m
            </div>
            <span className="text-[10px] text-slate-400">
              Normal: {river.normalGaugeHeightMeters} m
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Waves className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{t.canalDischarge}</span>
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {river.currentDischargeCusecs} cusecs
            </div>
            <span className="text-[10px] text-slate-400">
              {river.nearestCanal}
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Droplet className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>{t.reservoirStorage}</span>
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {river.storageLevelPercent}%
            </div>
            <span className="text-[10px] text-slate-400">
              {river.riverName}
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{t.groundwaterDepth}</span>
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {river.groundwaterDepthMeters} m
            </div>
            <span className="text-[10px] text-slate-400">
              Below Ground Level
            </span>
          </div>
        </div>

        {/* Current Status Banner */}
        <div className={`mt-4 p-3 rounded-xl border flex items-center justify-between gap-3 ${getStatusColor(river.status)}`}>
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider">
                {t.waterSituation}: {river.statusLabel}
              </div>
              <div className="text-xs opacity-90">
                {river.forecastSupplyNext15Days}
              </div>
            </div>
          </div>
          <span className="text-xs font-semibold px-2 py-1 rounded-md bg-white/40 dark:bg-slate-900/40">
            Catchment 48h: {river.rainfallCatchmentLast48hMm} mm
          </span>
        </div>
      </div>

      {/* Visual Hydrology Reference Banner */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative h-32 group shadow-xs">
        <img 
          src={HYDROLOGY_REFERENCE_IMAGES.riverCanal.url} 
          alt="Irrigation Canal" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-3.5">
          <div className="flex items-center justify-between w-full">
            <div>
              <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider block">Canal & River Infrastructure</span>
              <span className="text-white text-xs font-semibold">{HYDROLOGY_REFERENCE_IMAGES.riverCanal.desc}</span>
            </div>
            <span className="text-[10px] text-slate-300 bg-black/50 px-2 py-0.5 rounded font-mono hidden sm:inline">
              Catchment: {river.riverName}
            </span>
          </div>
        </div>
      </div>

      {/* Best Plant Recommendation Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              {t.bestPlantsTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.bestPlantsSubtitle}
            </p>
          </div>

          <div className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Scientifically Ranked by Water Need
          </div>
        </div>

        {/* Ranked Plants List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {currentCrops.map((crop, index) => {
            const isTop = index === 0;
            const isAvoid = crop.recommendationVerdict === 'AVOID_WATER_DEFICIT';
            const isSuitable = crop.recommendationVerdict === 'SUITABLE_WITH_IRRIGATION';

            return (
              <div
                key={crop.cropKey}
                className={`relative rounded-xl border p-4 transition-all ${
                  isTop
                    ? 'border-emerald-500/60 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs'
                    : isAvoid
                    ? 'border-red-200 dark:border-red-900/40 bg-red-50/30 dark:bg-red-950/10 opacity-80'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                }`}
              >
                {/* Badge Rank & Crop Image */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    {CROP_REFERENCE_IMAGES[crop.cropKey] ? (
                      <img 
                        src={CROP_REFERENCE_IMAGES[crop.cropKey].url} 
                        alt={crop.cropName} 
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0" 
                      />
                    ) : (
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                        isTop
                          ? 'bg-emerald-600 text-white'
                          : isAvoid
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                      }`}>
                        #{index + 1}
                      </span>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isTop
                            ? 'bg-emerald-600 text-white'
                            : isAvoid
                            ? 'bg-red-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                        }`}>
                          #{index + 1}
                        </span>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          {language === 'mr' || language === 'hi' ? crop.cropNameRegional : crop.cropName}
                        </h4>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {crop.cropName}
                      </span>
                    </div>
                  </div>

                  <div className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    isTop
                      ? 'bg-emerald-600 text-white'
                      : isAvoid
                      ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {crop.suitabilityScore}% Match
                  </div>
                </div>

                {/* Key Metrics Pill Grid */}
                <div className="grid grid-cols-3 gap-2 my-3 py-2 border-y border-slate-200/60 dark:border-slate-700/60 text-center">
                  <div>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400">{t.waterRequirement}</span>
                    <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400">{crop.waterNeedMm} mm</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400">{t.cropDuration}</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{crop.durationDays} Days</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400">{t.estReturn}</span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">₹{crop.estimatedReturnPerAcre.toLocaleString()}</span>
                  </div>
                </div>

                {/* Agronomic Rationale */}
                <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {t.whyThisPlant}:
                  </span>{' '}
                  {language === 'mr' || language === 'hi' ? crop.rationaleRegional : crop.rationale}
                </div>

                {/* Verdict Badge */}
                <div className="flex items-center justify-between pt-1">
                  <span className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                    isTop
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : isAvoid
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {isTop && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {isAvoid && <AlertTriangle className="w-3.5 h-3.5" />}
                    {crop.recommendationVerdict === 'HIGHLY_RECOMMENDED'
                      ? t.highlyRecommended
                      : crop.recommendationVerdict === 'SUITABLE_WITH_IRRIGATION'
                      ? t.suitableWithIrrigation
                      : t.avoidDeficit}
                  </span>

                  <button
                    onClick={() => {
                      playHapticSound('tap');
                      if (onNavigate) onNavigate('crop-advisory');
                    }}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View Sowing Calendar <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Copy / Dispatch Bar */}
      <div className="bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <Share2 className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="text-xs font-bold">{t.realAlertsTitle}</div>
            <div className="text-[11px] text-slate-400">{t.realAlertsSubtitle}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? '✓ Copied!' : t.copyAlertText}
          </button>
          <button
            onClick={handleShareWhatsApp}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {t.openRealWhatsApp}
          </button>
        </div>
      </div>
    </div>
  );
};
