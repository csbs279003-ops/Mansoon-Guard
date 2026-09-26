import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Share2, 
  ShieldCheck, 
  AlertOctagon, 
  Sparkles, 
  TrendingUp, 
  IndianRupee, 
  Check, 
  Calendar,
  Layers,
  ArrowRight,
  MessageCircle,
  Copy,
  TrendingDown,
  Building2,
  Clock,
  Droplets,
  Sprout
} from 'lucide-react';
import { PanchayatData, CropType, Language, ScreenId } from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { playHapticSound, speakAdvisory } from '../../utils/audio';
import { generateLocalizedAlertText, openWhatsAppShare, shareOrCopy } from '../../utils/share';
import { CROP_REFERENCE_IMAGES, DESICCATION_REFERENCE_IMAGES } from '../../data/agriImages';

interface Props {
  panchayat: PanchayatData;
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  showHotspots: boolean;
}

export const CropAdvisoryScreen: React.FC<Props> = ({
  panchayat,
  language,
  onNavigate,
  showHotspots,
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;
  const [selectedCrop, setSelectedCrop] = useState<CropType>('cotton');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [stopAudioFn, setStopAudioFn] = useState<(() => void) | null>(null);
  const [farmAcres, setFarmAcres] = useState<number>(4);
  const [copiedToast, setCopiedToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'advisory' | 'market'>('advisory');

  const cropData = panchayat.crops[selectedCrop];
  const isWait = cropData.decision === 'WAIT';
  const isSow = cropData.decision === 'SOW';

  const advisoryLabel = isWait ? t.advisoryWait : isSow ? t.advisorySow : t.advisoryProtect;

  // Localized crop names
  const cropNames: Record<CropType, Record<Language, string>> = {
    cotton: {
      en: 'Cotton (Bt)',
      hi: 'कपास (बीटी)',
      mr: 'कपास (बीटी)',
      te: 'ప్రత్తి (Bt)',
      ta: 'பருத்தி (Bt)',
    },
    soybean: {
      en: 'Soybean (JS 335)',
      hi: 'सोयाबीन',
      mr: 'सोयाबीन',
      te: 'సోయాబీన్',
      ta: 'சோயாபீன்',
    },
    paddy: {
      en: 'Paddy / Rice',
      hi: 'धान / चावल',
      mr: 'भात / धान',
      te: 'వరి / ధాన్యం',
      ta: 'நெல்',
    },
    groundnut: {
      en: 'Groundnut',
      hi: 'मूंगफली',
      mr: 'भुईमूग',
      te: 'వేరుశనగ',
      ta: 'நிலக்கடலை',
    },
    pulses: {
      en: 'Red Gram / Tur',
      hi: 'तूर / अरहर',
      mr: 'तूर',
      te: 'కందులు',
      ta: 'துவரை',
    },
    millets: {
      en: 'Pearl Millet / Bajra',
      hi: 'बाजरा',
      mr: 'बाजरी',
      te: 'సజ్జలు',
      ta: 'கம்பு',
    },
    maize: {
      en: 'Maize / Corn',
      hi: 'मक्का',
      mr: 'मका',
      te: 'మొక్కజొన్న',
      ta: 'மக்காச்சோளம்',
    },
    sugarcane: {
      en: 'Sugarcane',
      hi: 'गन्ना',
      mr: 'ऊस',
      te: 'చెరకు',
      ta: 'கரும்பு',
    },
    wheat: {
      en: 'Wheat',
      hi: 'गेहूं',
      mr: 'गहू',
      te: 'గోధుమలు',
      ta: 'கோதுமை',
    },
    mustard: {
      en: 'Mustard',
      hi: 'सरसों',
      mr: 'मोहरी',
      te: 'ఆవాలు',
      ta: 'கடுகு',
    },
  };

  const getLocalizedRationale = (): string => {
    if (language === 'mr') return cropData.rationaleRegional;
    if (language === 'hi') {
      if (selectedCrop === 'cotton') return `खोटे मानसून का गंभीर खतरा (${panchayat.falseOnsetRisk}%) है। अगले ${panchayat.breakDurationDays} दिन तीव्र सूखा रहेगा। अभी बोवाई करने पर बीज झुलस जाएगा। सुरक्षित बोवाई का समय: ${cropData.recommendedRevivalWindow}।`;
      if (selectedCrop === 'soybean') return `सोयाबीन का बीज नाजुक होता है। ${panchayat.breakDurationDays} दिनों के सूखे दौर में अंकुरण पूरी तरह फेल हो जाएगा। बोवाई रोकें।`;
      return `सतह पर नमी कम है। सच्चा मानसून आने तक प्रतीक्षा करें। अनुशंसित समय: ${cropData.recommendedRevivalWindow}।`;
    }
    if (language === 'te') {
      return `${cropNames[selectedCrop][language]} కొరకు నకిలీ వర్షం ప్రమాదం ${panchayat.falseOnsetRisk}% ఉంది. రాబోయే ${panchayat.breakDurationDays} రోజుల పొడి విరామం వల్ల విత్తనాలు దెబ్బతింటాయి. సిఫార్సు చేసిన విత్తే సమయం: ${cropData.recommendedRevivalWindow}.`;
    }
    if (language === 'ta') {
      return `${cropNames[selectedCrop][language]} பயிருக்கான போலி பருவமழை ஆபத்து ${panchayat.falseOnsetRisk}%. அடுத்த ${panchayat.breakDurationDays} நாட்கள் வறட்சி நிலவும். விதைக்க உகந்த காலம்: ${cropData.recommendedRevivalWindow}.`;
    }
    return cropData.rationale;
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopAudioFn?.();
      setIsPlayingAudio(false);
      setStopAudioFn(null);
    } else {
      playHapticSound('alert');
      const textToSpeak = language === 'mr' 
        ? `${panchayat.nameRegional} मान्सून व बाजारभाव सल्ला: ${cropNames[selectedCrop].mr} साठी निर्णय आहे ${isWait ? 'थांबा' : 'पेरा'}. खोट्या पावसाचा धोका ${panchayat.falseOnsetRisk} टक्के आहे. बाजारात सध्या हमीभाव ₹${cropData.marketPrice?.mspPricePerQuintal || 7121} आहे. अंदाजित नफा प्रति एकर ₹${cropData.marketPrice?.netProfitPerAcre || 31500} आहे.`
        : language === 'hi'
        ? `${panchayat.name} मौसम और मंडी भाव सलाह: ${cropNames[selectedCrop].hi} के लिए निर्णय है ${isWait ? 'प्रतीक्षा करें' : 'बोवाई करें'}. झूठे मानसून का खतरा ${panchayat.falseOnsetRisk} प्रतिशत है। मंडी मॉडल भाव ₹${cropData.marketPrice?.modalPricePerQuintal || 7450} प्रति क्विंटल है। प्रति एकड़ शुद्ध लाभ ₹${cropData.marketPrice?.netProfitPerAcre || 31500} अनुमानित है।`
        : `Monsoon Guard advisory and market intelligence for ${panchayat.name}. Action for ${cropNames[selectedCrop].en}: ${cropData.decision}. Current APMC price is ₹${cropData.marketPrice?.modalPricePerQuintal || 7450} per quintal with projected profit of ₹${cropData.marketPrice?.netProfitPerAcre || 31500} per acre.`;

      const cancel = speakAdvisory(
        textToSpeak,
        language,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false)
      );
      setStopAudioFn(() => cancel);
    }
  };

  const handleShareWhatsApp = () => {
    const text = generateLocalizedAlertText(panchayat, selectedCrop, language);
    openWhatsAppShare(text);
  };

  const handleCopyAlert = async () => {
    const text = generateLocalizedAlertText(panchayat, selectedCrop, language);
    const success = await shareOrCopy(text, `${panchayat.name} Agromet Alert`);
    if (success) {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  const cropKeys: CropType[] = ['cotton', 'soybean', 'paddy', 'groundnut', 'pulses', 'millets'];
  const market = cropData.marketPrice;

  return (
    <div className="flex flex-col min-h-full pb-20 bg-slate-50 text-slate-900 select-none">
      {/* Top Header */}
      <div className={`text-white px-5 pt-4 pb-6 rounded-b-3xl shadow-sm relative ${
        isWait ? 'bg-amber-950' : isSow ? 'bg-emerald-950' : 'bg-blue-950'
      }`}>
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
            {t.primaryVerdict}
          </span>
          <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded-full text-white/90 font-bold">
            {panchayat.name} ({panchayat.nameRegional}) · {panchayat.state}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-amber-200/80 font-medium">
              {cropNames[selectedCrop][language]}
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2 mt-0.5">
              <span>{t.decisionHeader}:</span>
              <span className={`px-2.5 py-0.5 rounded-xl border text-xl ${
                isWait 
                  ? 'bg-amber-500 text-slate-950 border-amber-300' 
                  : isSow 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-300' 
                  : 'bg-blue-500 text-white border-blue-300'
              }`}>
                {advisoryLabel}
              </span>
            </h1>
          </div>

          {/* Audio speech synthesis trigger button */}
          <button
            onClick={toggleAudio}
            className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-transform active:scale-95 shadow-md cursor-pointer ${
              isPlayingAudio 
                ? 'bg-rose-500 text-white animate-pulse' 
                : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
            }`}
            title={isPlayingAudio ? t.stopAudio : t.listenAdvisory}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-5 h-5" />
                <span className="text-[8px] font-bold">STOP</span>
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5 text-amber-300" />
                <span className="text-[8px] font-bold uppercase">AUDIO</span>
              </>
            )}
          </button>
        </div>

        {isPlayingAudio && (
          <div className="mt-2.5 bg-white/10 backdrop-blur-md rounded-xl p-2 text-[11px] text-amber-200 flex items-center gap-2 animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
            <span>{t.playingAudio}</span>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="p-4 space-y-4">
        {/* Advisory vs Market Price Sub-Tabs */}
        <div className="flex bg-slate-200 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('advisory')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'advisory' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.advisoryVerdict || "Sowing & Weather Advisory"}</span>
          </button>
          <button
            onClick={() => setActiveTab('market')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'market' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <IndianRupee className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.marketPriceTitle || "Live Market Price & APMC"}</span>
          </button>
        </div>

        {/* Crop Selector Horizontal Tabs */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            {t.selectCrop}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {cropKeys.map((key) => {
              const crop = panchayat.crops[key];
              if (!crop) return null;
              const isSelected = selectedCrop === key;
              const currentName = cropNames[key][language] || key;
              const badge = crop.decision === 'WAIT' ? t.advisoryWait : crop.decision === 'SOW' ? t.advisorySow : t.advisoryProtect;

              return (
                <button
                  key={key}
                  onClick={() => {
                    playHapticSound('tap');
                    setSelectedCrop(key);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span>{currentName}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                    crop.decision === 'WAIT'
                      ? isSelected ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-900'
                      : crop.decision === 'SOW'
                      ? isSelected ? 'bg-emerald-400 text-slate-950' : 'bg-emerald-100 text-emerald-900'
                      : 'bg-blue-100 text-blue-900'
                  }`}>
                    {badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: Sowing & Agromet Rationale */}
        {activeTab === 'advisory' && (
          <>
            {/* Visual Crop Photographic Reference Card */}
            {CROP_REFERENCE_IMAGES[selectedCrop] && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="relative h-32 w-full overflow-hidden">
                  <img
                    src={CROP_REFERENCE_IMAGES[selectedCrop].url}
                    alt={cropNames[selectedCrop][language]}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex items-end p-3">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/40 px-2 py-0.5 rounded">
                          {CROP_REFERENCE_IMAGES[selectedCrop].tag || "Crop Reference"}
                        </span>
                        <div className="text-white text-xs font-bold mt-0.5">
                          {cropNames[selectedCrop][language]} ({selectedCrop.toUpperCase()})
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400/40 font-mono">
                        Need {cropData.moistureThresholdMm}mm Soil Wetness
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-emerald-50/50 border-t border-emerald-100/60 flex items-center justify-between text-[11px] text-emerald-900">
                  <span className="line-clamp-1">{CROP_REFERENCE_IMAGES[selectedCrop].caption}</span>
                </div>
              </div>
            )}

            {/* Actionable Advice Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <AlertOctagon className="w-4 h-4 text-amber-600" />
                  {isWait ? t.whyWait : isSow ? t.whySow : t.whyProtect}
                </span>
                <span className="text-[10px] font-mono font-medium text-slate-400">
                  SMAP + Time-Series
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                {getLocalizedRationale()}
              </p>

              {/* Moisture Gauge vs Threshold */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">{t.currentSoilMoisture}</span>
                  <span className="font-bold text-slate-800">
                    19% ({panchayat.totalRainfallExpectedMm}mm) / Need {cropData.moistureThresholdMm}mm
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (panchayat.totalRainfallExpectedMm / cropData.moistureThresholdMm) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0mm (Dry)</span>
                  <span className="text-amber-700 font-medium">{t.soilDeficit}: 32mm</span>
                  <span>100mm</span>
                </div>
              </div>

              {/* Sowing Window Prediction */}
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-950">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  {t.recommendedSowingWindow}:
                </span>
                <strong className="font-bold text-emerald-800">
                  {cropData.recommendedRevivalWindow}
                </strong>
              </div>
            </div>

            {/* Economic Impact Calculator */}
            <div className="bg-gradient-to-br from-amber-900 to-slate-900 text-white rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold">
                  <IndianRupee className="w-4 h-4" />
                  <span>{t.economicBenefit}</span>
                </div>
                <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-300 font-bold">
                  0% Re-Sowing Loss
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-2xl font-black tabular-nums text-white">
                    ₹{(cropData.seedCostSavedPerAcre * farmAcres).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {t.seedCostAvoided} ({farmAcres} {t.acres})
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs">
                  <button
                    onClick={() => setFarmAcres(Math.max(1, farmAcres - 1))}
                    className="w-6 h-6 rounded-lg bg-slate-700 text-white font-bold hover:bg-slate-600 flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-2 font-bold tabular-nums">{farmAcres} {t.acres}</span>
                  <button
                    onClick={() => setFarmAcres(farmAcres + 1)}
                    className="w-6 h-6 rounded-lg bg-slate-700 text-white font-bold hover:bg-slate-600 flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: Live Market Prices & APMC Return Predictor */}
        {activeTab === 'market' && market && (
          <div className="space-y-4">
            {/* APMC Live Rate Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                    <Building2 className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">
                      {market.mandiName} {t.apmcMandi || "APMC Mandi Rate"}
                    </h4>
                    <span className="text-[10px] text-slate-400">Live e-NAM Verified</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {market.priceTrend === 'BULLISH' ? (
                    <>
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{t.trendBullish || "Bullish (+₹120)"}</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                      <span>{t.trendBearish || "Stable"}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Price comparison numbers */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">
                    {t.currentModalPrice || "APMC Modal Price"}
                  </div>
                  <div className="text-xl font-black text-slate-900 mt-0.5">
                    ₹{market.modalPricePerQuintal.toLocaleString('en-IN')}
                    <span className="text-[10px] font-normal text-slate-500 ml-1">{t.perQuintal || "/ Quintal"}</span>
                  </div>
                </div>
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
                  <div className="text-[10px] text-emerald-800 uppercase font-bold">
                    {t.mspPrice || "Govt MSP Rate"}
                  </div>
                  <div className="text-xl font-black text-emerald-900 mt-0.5">
                    ₹{market.mspPricePerQuintal.toLocaleString('en-IN')}
                    <span className="text-[10px] font-normal text-emerald-700 ml-1">{t.perQuintal || "/ Quintal"}</span>
                  </div>
                </div>
              </div>

              {/* Profit & Yield per Acre Breakdown */}
              <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200/60 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">{t.avgYieldPerAcre || "Estimated Yield"}:</span>
                  <span className="font-bold text-slate-900">{market.projectedYieldQuintalsPerAcre} Quintals / Acre</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">{t.estimatedInputCost || "Input Cost per Acre"}:</span>
                  <span className="font-semibold text-rose-700">-₹{market.estInputCostPerAcre.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between pt-1.5 border-t border-emerald-200">
                  <span className="font-bold text-emerald-950">{t.projectedNetProfit || "Projected Net Profit"}:</span>
                  <span className="font-black text-sm text-emerald-800">
                    ₹{(market.netProfitPerAcre * farmAcres).toLocaleString('en-IN')} ({farmAcres} Acres)
                  </span>
                </div>
              </div>

              {/* Harvest Time Window */}
              <div className="flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {t.bestHarvestWindow || "Best Harvest & Selling Month"}:
                </span>
                <strong className="text-slate-900">{market.peakArrivalMonths}</strong>
              </div>
            </div>

            {/* Smart Irrigation shortcut */}
            <div 
              onClick={() => onNavigate('irrigation-schedule')}
              className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-teal-100 transition-colors text-xs"
            >
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-teal-600" />
                <span className="font-bold text-teal-950">View Smart Automated Irrigation Schedule for this crop</span>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-600" />
            </div>
          </div>
        )}

        {/* Farmer Action Checklist */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs space-y-2">
          <div className="text-xs font-bold text-slate-800">
            {t.checklistTitle}
          </div>
          <div className="space-y-1.5 text-xs text-slate-700">
            <label className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-0" />
              <span>{t.checkItem1}</span>
            </label>
            <label className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-0" />
              <span>{t.checkItem2}</span>
            </label>
            <label className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-0" />
              <span>{t.checkItem3}</span>
            </label>
          </div>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleShareWhatsApp}
            className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.shareWhatsApp}</span>
          </button>
          <button
            onClick={handleCopyAlert}
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all"
          >
            {copiedToast ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedToast ? t.copied : t.copyShareText}</span>
          </button>
        </div>

        {/* Navigate to Alerts */}
        <button
          onClick={() => {
            playHapticSound('tap');
            onNavigate('delivery-hub');
          }}
          className={`w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-between shadow-md active:scale-[0.98] transition-all cursor-pointer ${
            showHotspots ? 'ring-4 ring-cyan-400' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>{t.simulateDelivery}</span>
          </div>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
