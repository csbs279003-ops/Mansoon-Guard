import React, { useState } from 'react';
import { 
  CloudRain, 
  Sun, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Layers, 
  Droplet, 
  Warehouse, 
  IndianRupee, 
  RotateCw, 
  PlusCircle, 
  Award, 
  MessageSquare, 
  Compass, 
  Clock, 
  Calendar,
  Sparkles,
  PhoneCall,
  CheckCheck,
  Info,
  Copy,
  Check,
  Flame,
  Radar,
  Waves,
  Radio,
  Tv,
  Building2,
  Phone,
  Sprout,
  Gauge,
  PackageCheck,
  Megaphone,
  Droplets,
  Globe2
} from 'lucide-react';
import { 
  PanchayatData, 
  ClimateSignals, 
  ValidationRecord, 
  CropType, 
  Language, 
  UserRole 
} from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { MODEL_EVALUATION_METRICS } from '../../data/mockData';
import { playHapticSound, speakAdvisory, stopSpeakingAudio } from '../../utils/audio';
import { generateLocalizedAlertText, openWhatsAppShare, openRealSmsShare, shareOrCopy } from '../../utils/share';
import { TaprootDesiccationSimulator } from '../agromet/TaprootDesiccationSimulator';
import { DownscaledRadarSimulator } from '../agromet/DownscaledRadarSimulator';
import { SmartIrrigationScreen } from '../irrigation/SmartIrrigationScreen';
import { StatePanchayatSelector } from '../panchayat/StatePanchayatSelector';
import { CROP_REFERENCE_IMAGES } from '../../data/agriImages';

interface Props {
  panchayats: PanchayatData[];
  selectedPanchayat: PanchayatData;
  onSelectPanchayat: (panchayat: PanchayatData) => void;
  climateSignals: ClimateSignals;
  validationRecords: ValidationRecord[];
  onAddValidationRecord: (record: ValidationRecord) => void;
  language: Language;
  userRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export const DesktopCommandCenter: React.FC<Props> = ({
  panchayats,
  selectedPanchayat,
  onSelectPanchayat,
  climateSignals,
  validationRecords,
  onAddValidationRecord,
  language,
  userRole,
  onSelectRole,
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;
  const [selectedCrop, setSelectedCrop] = useState<CropType>('cotton');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [stopAudioFn, setStopAudioFn] = useState<(() => void) | null>(null);
  const [farmAcres, setFarmAcres] = useState<number>(4);
  const [mapLayer, setMapLayer] = useState<'false-onset' | 'dry-spell' | 'rainfall'>('false-onset');
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'sms'>('whatsapp');
  const [targetScript, setTargetScript] = useState<'regional' | 'english'>('regional');
  const [phoneNumber, setPhoneNumber] = useState('98231 XXXXX');
  const [dispatchToast, setDispatchToast] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [observedRain, setObservedRain] = useState('24.5');
  const [didFalseOnsetOccur, setDidFalseOnsetOccur] = useState(true);
  const [feedbackNote, setFeedbackNote] = useState('Ground rain gauge logged; false-onset break verified.');
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [radioFreq, setRadioFreq] = useState('90.4');
  const [realAlertNumber, setRealAlertNumber] = useState('');
  const [showStateModal, setShowStateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'advisory' | 'market'>('advisory');

  const handleToggleRadio = () => {
    if (isRadioPlaying) {
      stopSpeakingAudio();
      setIsRadioPlaying(false);
    } else {
      setIsRadioPlaying(true);
      const text = generateLocalizedAlertText(selectedPanchayat, selectedCrop, language);
      speakAdvisory(text, language, () => {
        setIsRadioPlaying(false);
      });
    }
  };

  const handleLaunchWhatsApp = () => {
    const text = generateLocalizedAlertText(selectedPanchayat, selectedCrop, language);
    openWhatsAppShare(text, realAlertNumber);
  };

  const handleLaunchRealSms = () => {
    const text = generateLocalizedAlertText(selectedPanchayat, selectedCrop, language);
    openRealSmsShare(text, realAlertNumber);
  };

  const cropData = selectedPanchayat.crops[selectedCrop];
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
      if (selectedCrop === 'cotton') return `खोटे मानसून का गंभीर खतरा (${selectedPanchayat.falseOnsetRisk}%) है। अगले ${selectedPanchayat.breakDurationDays} दिन तेज धूप और सूखा रहेगा। अभी बोवाई करने पर बीज झुलस जाएगा। सुरक्षित बोवाई का समय: ${cropData.recommendedRevivalWindow}।`;
      if (selectedCrop === 'soybean') return `सोयाबीन का बीज नाजुक होता है। ${selectedPanchayat.breakDurationDays} दिनों के सूखे दौर में अंकुरण पूरी तरह फेल हो जाएगा। बोवाई रोकें।`;
      return `सतह पर नमी कम है। सच्चा मानसून आने तक प्रतीक्षा करें। अनुशंसित समय: ${cropData.recommendedRevivalWindow}।`;
    }
    if (language === 'te') {
      return `${cropNames[selectedCrop][language]} కొరకు నకిలీ వర్షం ప్రమాదం ${selectedPanchayat.falseOnsetRisk}% ఉంది. రాబోయే ${selectedPanchayat.breakDurationDays} రోజుల పొడి విరామం వల్ల విత్తనాలు దెబ్బతింటాయి. సిఫార్సు చేసిన విత్తే సమయం: ${cropData.recommendedRevivalWindow}.`;
    }
    if (language === 'ta') {
      return `${cropNames[selectedCrop][language]} பயிருக்கான போலி பருவமழை ஆபத்து ${selectedPanchayat.falseOnsetRisk}%. அடுத்த ${selectedPanchayat.breakDurationDays} நாட்கள் வறட்சி நிலவும். விதைக்க உகந்த காலம்: ${cropData.recommendedRevivalWindow}.`;
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
        ? `${selectedPanchayat.nameRegional} मान्सून सल्ला: ${cropNames[selectedCrop].mr} साठी निर्णय आहे थांबा! खोट्या पावसाचा धोका ${selectedPanchayat.falseOnsetRisk} टक्के आहे. पुढील ${selectedPanchayat.breakDurationDays} दिवस कोरडा काळ राहील. पेरणी करू नका.`
        : language === 'hi'
        ? `${selectedPanchayat.name} मौसम सलाह: ${cropNames[selectedCrop].hi} के लिए निर्णय है प्रतीक्षा करें! झूठे मानसून का खतरा ${selectedPanchayat.falseOnsetRisk} प्रतिशत है। अगले ${selectedPanchayat.breakDurationDays} दिन सूखा रहेगा। बीज न बोएं।`
        : language === 'te'
        ? `${selectedPanchayat.name} వ్యవసాయ సలహా: ${cropNames[selectedCrop].te} కొరకు వేచి ఉండండి. నకిలీ వర్షం ప్రమాదం ${selectedPanchayat.falseOnsetRisk} శాతం.`
        : language === 'ta'
        ? `${selectedPanchayat.name} வேளாண் ஆலோசனை: ${cropNames[selectedCrop].ta} பயிருக்கு காத்திருக்கவும்.`
        : `Monsoon Guard advisory for ${selectedPanchayat.name}. Action for ${cropNames[selectedCrop].en}: WAIT. False-onset risk is ${selectedPanchayat.falseOnsetRisk} percent. Recommended true sowing window is ${cropData.recommendedRevivalWindow}.`;

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
    const text = generateLocalizedAlertText(selectedPanchayat, selectedCrop, language);
    openWhatsAppShare(text);
  };

  const handleCopyAlert = async () => {
    const text = generateLocalizedAlertText(selectedPanchayat, selectedCrop, language);
    const success = await shareOrCopy(text, `${selectedPanchayat.name} Agromet Alert`);
    if (success) {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  const handleSendTest = () => {
    playHapticSound('success');
    setDispatchToast(true);
    setTimeout(() => setDispatchToast(false), 4500);
  };

  const handleRecordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playHapticSound('success');

    const newRec: ValidationRecord = {
      id: `val-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      panchayat: selectedPanchayat.name,
      predictedRainMm: selectedPanchayat.totalRainfallExpectedMm,
      actualObservedMm: parseFloat(observedRain) || 0,
      predictedFalseOnset: selectedPanchayat.primaryAdvisory === 'WAIT',
      actualFalseOnsetOccurred: didFalseOnsetOccur,
      reporterName: 'Agricultural Officer',
      reporterRole: 'Extension Team',
      status: 'verified',
      feedbackNotes: feedbackNote,
    };

    onAddValidationRecord(newRec);
    setShowSubmitModal(false);
  };

  const cropKeys: CropType[] = ['cotton', 'soybean', 'paddy', 'groundnut', 'pulses'];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner / System Sub-Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-800 relative overflow-hidden flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-[11px]">
              {t.badgeSystem}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">{t.focusBlock}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {t.appTitle}
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            {t.tagline}
          </p>
        </div>

        {/* Live Status Cluster */}
        <div className="flex flex-wrap items-center gap-3 z-10">
          <button
            onClick={() => setShowStateModal(!showStateModal)}
            className="bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/60 text-white rounded-2xl p-3 text-left transition-all cursor-pointer shadow-sm group"
          >
            <div className="text-[10px] text-emerald-200 font-semibold uppercase flex items-center justify-between gap-2">
              <span>{t.allIndiaCoverage || "All States of India"}</span>
              <Globe2 className="w-3 h-3 group-hover:rotate-45 transition-transform" />
            </div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>{selectedPanchayat.name} ({selectedPanchayat.state})</span>
            </div>
          </button>

          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3 text-left">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">{t.falseOnsetRisk}</div>
            <div className="text-sm font-bold text-amber-400 flex items-center gap-1.5 mt-0.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{selectedPanchayat.falseOnsetRisk}% ({selectedPanchayat.breakDurationDays} Days Break)</span>
            </div>
          </div>

          <div className="bg-emerald-950/80 border border-emerald-800/80 rounded-2xl p-3 text-left">
            <div className="text-[10px] text-emerald-400 font-semibold uppercase">{t.primaryVerdict}</div>
            <div className="text-sm font-black text-white mt-0.5">
              {t.decisionHeader}: <span className="text-amber-400">{advisoryLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* State & Panchayat Selector for All India (Modal / Flyout) */}
      {showStateModal && (
        <div className="bg-slate-900/40 p-4 rounded-3xl border border-emerald-500/30 backdrop-blur-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-emerald-300">Switch Gram Panchayat across All States of India</span>
            <button
              onClick={() => setShowStateModal(false)}
              className="text-xs px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-lg cursor-pointer"
            >
              ✕ Close
            </button>
          </div>
          <StatePanchayatSelector
            currentPanchayat={selectedPanchayat}
            allPanchayats={panchayats}
            onSelectPanchayat={(p) => {
              onSelectPanchayat(p);
              setShowStateModal(false);
            }}
            language={language}
            onClose={() => setShowStateModal(false)}
          />
        </div>
      )}

      {/* ================= SMART AUTOMATED IRRIGATION SCHEDULING (FULL-WIDTH) ================= */}
      <SmartIrrigationScreen
        panchayat={selectedPanchayat}
        language={language}
      />

      {/* 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* ================= LEFT COLUMN: Spatial Selector & Climate Radar (3 cols) ================= */}
        <div className="md:col-span-4 xl:col-span-3 space-y-6">
          {/* Climate Signal Radar Ingestion */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Layers className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-bold text-slate-900">
                  Climate Indices Ingestion
                </h2>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">NOAA · NASA · IMD</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">ENSO</div>
                <div className="text-sm font-black text-slate-900 tabular-nums">
                  {climateSignals.enso.anomaly}
                </div>
                <div className="text-[10px] text-emerald-600 font-medium">Neutral</div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">IOD</div>
                <div className="text-sm font-black text-slate-900 tabular-nums">
                  {climateSignals.iod.index}
                </div>
                <div className="text-[10px] text-blue-600 font-medium">Positive</div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">MJO</div>
                <div className="text-sm font-black text-slate-900 tabular-nums">
                  Phase {climateSignals.mjo.phase}
                </div>
                <div className="text-[10px] text-amber-600 font-medium">Favorable</div>
              </div>
            </div>

            <div className="p-3 bg-cyan-50/70 rounded-2xl border border-cyan-100 text-xs text-cyan-950 space-y-1">
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 text-cyan-700" />
                  {t.soilMoisture}:
                </span>
                <span className="tabular-nums font-black">{climateSignals.soilMoistureSMAP.volumetricPercent}% ({t.soilDeficit})</span>
              </div>
              <p className="text-[11px] text-cyan-800 leading-snug">
                Deficit of {climateSignals.soilMoistureSMAP.deficitMm}mm must be recharged before taproot emergence.
              </p>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span>GPM Precipitation 24h:</span>
              <strong className="text-slate-800 tabular-nums">{climateSignals.gpmPrecipitation.last24hMm}mm</strong>
            </div>
          </div>

          {/* Panchayat Selector List */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  {t.selectPanchayat}
                </h2>
                <p className="text-[11px] text-slate-400">8 Panchayats</p>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md">
                2km Resolution
              </span>
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {panchayats.map((p) => {
                const isSelected = p.id === selectedPanchayat.id;
                const isWaitVerdict = p.primaryAdvisory === 'WAIT';
                const isSowVerdict = p.primaryAdvisory === 'SOW';

                const displayName = language === 'mr' ? p.nameRegional : p.name;
                const badge = isWaitVerdict ? t.advisoryWait : isSowVerdict ? t.advisorySow : t.advisoryProtect;

                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      playHapticSound('tap');
                      onSelectPanchayat(p);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-600 shadow-xs ring-1 ring-emerald-500'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">
                          {displayName}
                        </span>
                        {language !== 'mr' && (
                          <span className="text-[11px] text-slate-400">
                            ({p.nameRegional})
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>{t.rainfallProbability}: <strong>{p.rainfallProbability}%</strong></span>
                        <span>·</span>
                        <span className={p.falseOnsetRisk > 60 ? 'text-amber-700 font-semibold' : ''}>
                          {t.falseOnsetRisk}: <strong>{p.falseOnsetRisk}%</strong>
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isSowVerdict
                        ? 'bg-emerald-100 text-emerald-800'
                        : isWaitVerdict
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-blue-100 text-blue-900'
                    }`}>
                      {badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= CENTER COLUMN: Probabilistic Outlook, Taproot Simulator & Crop Advisory (6 cols) ================= */}
        <div className="md:col-span-8 xl:col-span-6 space-y-6">
          
          {/* Probabilistic Risk Engine Dashboard */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {t.primaryVerdict}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-1">
                  {t.timelineTitle}: {selectedPanchayat.name} ({selectedPanchayat.nameRegional})
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">{t.forecastConfidence}:</span>
                <div className="text-sm font-black text-emerald-700 tabular-nums">
                  {selectedPanchayat.forecastConfidence}% High
                </div>
              </div>
            </div>

            {/* Figures */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Rain prob */}
              <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-100 flex flex-col items-center text-center">
                <CloudRain className="w-6 h-6 text-blue-600 mb-1" />
                <div className="text-xs text-slate-600 font-medium">{t.rainfallProbability}</div>
                <div className="text-2xl font-black text-blue-900 tabular-nums my-1">
                  {selectedPanchayat.rainfallProbability}%
                </div>
                <div className="text-[10px] text-blue-700 font-semibold">{t.confidence}</div>
              </div>

              {/* False onset */}
              <div className={`p-4 rounded-2xl border flex flex-col items-center text-center ${
                selectedPanchayat.falseOnsetRisk > 60
                  ? 'bg-amber-50 border-amber-200 ring-2 ring-amber-300'
                  : 'bg-slate-50 border-slate-100'
              }`}>
                <AlertTriangle className={`w-6 h-6 mb-1 ${
                  selectedPanchayat.falseOnsetRisk > 60 ? 'text-amber-600' : 'text-slate-400'
                }`} />
                <div className="text-xs text-slate-600 font-medium">{t.falseOnsetRisk}</div>
                <div className="text-2xl font-black text-amber-900 tabular-nums my-1">
                  {selectedPanchayat.falseOnsetRisk}%
                </div>
                <div className="text-[10px] text-amber-800 font-bold">
                  {selectedPanchayat.falseOnsetRisk > 60 ? 'CRITICAL EARLY TRAP' : 'LOW RISK'}
                </div>
              </div>

              {/* Dry spell */}
              <div className={`p-4 rounded-2xl border flex flex-col items-center text-center ${
                selectedPanchayat.drySpellRisk > 60
                  ? 'bg-orange-50 border-orange-200 ring-2 ring-orange-300'
                  : 'bg-slate-50 border-slate-100'
              }`}>
                <Sun className={`w-6 h-6 mb-1 ${
                  selectedPanchayat.drySpellRisk > 60 ? 'text-orange-600' : 'text-slate-400'
                }`} />
                <div className="text-xs text-slate-600 font-medium">{t.drySpellRisk}</div>
                <div className="text-2xl font-black text-orange-900 tabular-nums my-1">
                  {selectedPanchayat.drySpellRisk}%
                </div>
                <div className="text-[10px] text-orange-800 font-bold">
                  {selectedPanchayat.breakDurationDays}-Day Dry Spell Ahead
                </div>
              </div>
            </div>

            {/* 7-30 Day Timeline Progression Horizontal Band */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>{t.timelineTitle}</span>
                <span className="text-[10px] text-slate-400 font-normal">Downscaled ML Timeseries</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs space-y-1">
                  <div className="font-bold text-blue-900">{t.timelinePhase1Title}</div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {t.timelinePhase1Desc}
                  </p>
                  <span className="inline-block text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                    ⚠️ {t.timelinePhase1Badge}
                  </span>
                </div>

                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 text-xs space-y-1">
                  <div className="font-bold text-amber-900">{t.timelinePhase2Title}</div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {t.timelinePhase2Desc}
                  </p>
                  <span className="inline-block text-[9px] font-bold text-rose-800 bg-rose-100 px-1.5 py-0.5 rounded">
                    🔥 {t.timelinePhase2Badge}
                  </span>
                </div>

                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs space-y-1">
                  <div className="font-bold text-emerald-900">{t.timelinePhase3Title}</div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {t.timelinePhase3Desc}
                  </p>
                  <span className="inline-block text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                    🌱 {t.timelinePhase3Badge}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Taproot Desiccation Simulator Component */}
          <TaprootDesiccationSimulator
            panchayat={selectedPanchayat}
            language={language}
          />

          {/* Crop-Specific Action Advisory Card (Sow / Wait / Protect) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {t.decisionHeader}
                </div>
                <h3 className="text-xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
                  <span>{cropNames[selectedCrop][language]}:</span>
                  <span className={`px-3 py-1 rounded-xl text-base ${
                    isWait
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : isSow
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : 'bg-blue-500 text-white font-black'
                  }`}>
                    {advisoryLabel}
                  </span>
                </h3>
              </div>

              {/* Voice Advisory Synthesizer Button */}
              <button
                onClick={toggleAudio}
                className={`py-2 px-4 rounded-xl flex items-center gap-2 font-bold text-xs shadow-sm transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isPlayingAudio ? t.stopAudio : t.listenAdvisory}</span>
              </button>
            </div>

            {/* Crop Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {cropKeys.map((key) => {
                const crop = selectedPanchayat.crops[key];
                const isSelected = selectedCrop === key;
                const currentName = cropNames[key][language];
                const badge = crop.decision === 'WAIT' ? t.advisoryWait : crop.decision === 'SOW' ? t.advisorySow : t.advisoryProtect;

                return (
                  <button
                    key={key}
                    onClick={() => {
                      playHapticSound('tap');
                      setSelectedCrop(key);
                    }}
                    className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span>{currentName}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-black ${
                      crop.decision === 'WAIT'
                        ? 'bg-amber-400 text-slate-950'
                        : crop.decision === 'SOW'
                        ? 'bg-emerald-400 text-slate-950'
                        : 'bg-blue-400 text-slate-950'
                    }`}>
                      {badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Advisory vs Market Price Subtabs for Crop */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setActiveTab('advisory')}
                className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'advisory' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>{t.advisoryVerdict || "Sowing & Weather Advisory"}</span>
              </button>
              <button
                onClick={() => setActiveTab('market')}
                className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'market' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                <IndianRupee className="w-4 h-4 text-amber-600" />
                <span>{t.marketPriceTitle || "Live APMC Mandi Rate & Profit"}</span>
              </button>
            </div>

            {activeTab === 'market' && cropData.marketPrice && (
              <div className="p-4 bg-gradient-to-br from-amber-50 to-emerald-50 rounded-2xl border border-amber-200/70 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-amber-200 text-amber-900 rounded-lg">
                      <Building2 className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {cropData.marketPrice.mandiName} {t.apmcMandi || "APMC Market Rate"}
                      </div>
                      <div className="text-[10px] text-slate-500">Live verified trading window: {cropData.marketPrice.peakArrivalMonths}</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Trend: {cropData.marketPrice.priceTrend === 'BULLISH' ? '↗ Bullish (+₹120)' : '→ Steady'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">APMC Modal Price</span>
                    <div className="text-base font-black text-slate-900 mt-0.5">₹{cropData.marketPrice.modalPricePerQuintal.toLocaleString('en-IN')}/q</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-emerald-700 uppercase font-semibold">Govt MSP Rate</span>
                    <div className="text-base font-black text-emerald-800 mt-0.5">₹{cropData.marketPrice.mspPricePerQuintal.toLocaleString('en-IN')}/q</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Estimated Yield</span>
                    <div className="text-base font-black text-slate-900 mt-0.5">{cropData.marketPrice.projectedYieldQuintalsPerAcre} q/acre</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-emerald-700 uppercase font-semibold">Projected Net Profit</span>
                    <div className="text-base font-black text-emerald-700 mt-0.5">₹{(cropData.marketPrice.netProfitPerAcre * farmAcres).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Visual Crop Photographic Reference Card */}
            {activeTab === 'advisory' && CROP_REFERENCE_IMAGES[selectedCrop] && (
              <div className="rounded-2xl border border-slate-200 overflow-hidden relative h-36 group">
                <img
                  src={CROP_REFERENCE_IMAGES[selectedCrop].url}
                  alt={cropNames[selectedCrop][language]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-4">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/50 px-2 py-0.5 rounded">
                        {CROP_REFERENCE_IMAGES[selectedCrop].tag || "Field Crop Reference"}
                      </span>
                      <div className="text-white text-sm font-bold mt-1">
                        {cropNames[selectedCrop][language]} ({selectedCrop.toUpperCase()})
                      </div>
                      <div className="text-slate-300 text-xs mt-0.5">
                        {CROP_REFERENCE_IMAGES[selectedCrop].caption}
                      </div>
                    </div>
                    <span className="text-xs text-emerald-300 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-400/40 font-mono font-bold">
                      Need {cropData.moistureThresholdMm}mm Soil Wetness
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Rationale and Agronomic Guidance */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>{cropNames[selectedCrop][language]} Rationale:</span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {t.recommendedSowingWindow}: {cropData.recommendedRevivalWindow}
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                {getLocalizedRationale()}
              </p>
            </div>

            {/* Economic Impact Calculator */}
            <div className="bg-gradient-to-br from-amber-950 to-slate-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-[10px] font-bold text-amber-300 uppercase flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5" />
                  <span>{t.economicBenefit}</span>
                </div>
                <div className="text-2xl font-black text-white mt-1 tabular-nums">
                  ₹{(cropData.seedCostSavedPerAcre * farmAcres).toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-slate-300">
                  {t.seedCostAvoided} ({farmAcres} {t.acres})
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700 text-xs">
                <span className="text-slate-300 pl-1 font-medium">{t.farmSize}:</span>
                <button
                  onClick={() => setFarmAcres(Math.max(1, farmAcres - 1))}
                  className="w-7 h-7 rounded-lg bg-slate-700 text-white font-bold hover:bg-slate-600 flex items-center justify-center cursor-pointer"
                >
                  -
                </button>
                <span className="font-black tabular-nums px-2">{farmAcres} {t.acres}</span>
                <button
                  onClick={() => setFarmAcres(farmAcres + 1)}
                  className="w-7 h-7 rounded-lg bg-slate-700 text-white font-bold hover:bg-slate-600 flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Share action buttons on desktop */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleShareWhatsApp}
                className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.shareWhatsApp}</span>
              </button>
              <button
                onClick={handleCopyAlert}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                {copiedToast ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedToast ? t.copied : t.copyShareText}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: Risk Map, Radar, Alerts & Validate Loop (3 cols) ================= */}
        <div className="md:col-span-12 xl:col-span-3 space-y-6">
          
          {/* Spatial Heatmap & Block Officer Tool */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {t.riskMapTitle}
                </h3>
                <p className="text-[10px] text-slate-400">{t.spatialCadastre}</p>
              </div>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono text-slate-600">
                8 Sectors
              </span>
            </div>

            {/* Layer switcher */}
            <div className="flex p-1 bg-slate-100 rounded-xl text-[10px] font-bold">
              <button
                onClick={() => setMapLayer('false-onset')}
                className={`flex-1 py-1 rounded-lg text-center cursor-pointer ${
                  mapLayer === 'false-onset' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                {t.falseOnsetRisk}
              </button>
              <button
                onClick={() => setMapLayer('dry-spell')}
                className={`flex-1 py-1 rounded-lg text-center cursor-pointer ${
                  mapLayer === 'dry-spell' ? 'bg-white text-orange-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                {t.drySpellRisk}
              </button>
              <button
                onClick={() => setMapLayer('rainfall')}
                className={`flex-1 py-1 rounded-lg text-center cursor-pointer ${
                  mapLayer === 'rainfall' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                {t.rainfallProbability}
              </button>
            </div>

            {/* Spatial Cartogram Grid */}
            <div className="grid grid-cols-2 gap-2">
              {panchayats.map((p) => {
                const isSelected = p.id === selectedPanchayat.id;
                const value = mapLayer === 'false-onset' 
                  ? p.falseOnsetRisk 
                  : mapLayer === 'dry-spell' 
                  ? p.drySpellRisk 
                  : p.rainfallProbability;

                const displayName = language === 'mr' ? p.nameRegional : p.name;
                const badge = p.primaryAdvisory === 'WAIT' ? t.advisoryWait : p.primaryAdvisory === 'SOW' ? t.advisorySow : t.advisoryProtect;

                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      playHapticSound('tap');
                      onSelectPanchayat(p);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-emerald-400'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="truncate">{displayName}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        p.falseOnsetRisk > 60 ? 'bg-rose-500' : p.falseOnsetRisk > 40 ? 'bg-amber-400' : 'bg-emerald-400'
                      }`} />
                    </div>
                    <div className="text-base font-black tabular-nums mt-1">
                      {value}%
                    </div>
                    <div className="text-[9px] text-slate-400 mt-0.5 font-bold">
                      {badge}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Radar Doppler Section in Right Column */}
          <DownscaledRadarSimulator
            panchayats={panchayats}
            selectedPanchayat={selectedPanchayat}
            onSelectPanchayat={onSelectPanchayat}
            language={language}
          />

          {/* Multi-Channel SMS & WhatsApp Alert Dispatcher */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {t.deliveryHubTitle}
                </h3>
                <p className="text-[10px] text-slate-400">{t.deliveryHubSubtitle}</p>
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                Active Push
              </span>
            </div>

            <div className="flex p-1 bg-slate-100 rounded-xl text-[10px] font-bold">
              <button
                onClick={() => setActiveChannel('whatsapp')}
                className={`flex-1 py-1 rounded-lg cursor-pointer ${
                  activeChannel === 'whatsapp' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                WhatsApp Push
              </button>
              <button
                onClick={() => setActiveChannel('sms')}
                className={`flex-1 py-1 rounded-lg cursor-pointer ${
                  activeChannel === 'sms' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                2G SMS
              </button>
            </div>

            {/* Message preview snippet */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 leading-snug whitespace-pre-line">
              {generateLocalizedAlertText(selectedPanchayat, 'cotton', language)}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={t.mobileNumber}
                className="flex-1 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
              />
              <button
                onClick={handleSendTest}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                {t.pushAlert}
              </button>
            </div>

            {dispatchToast && (
              <div className="p-2 bg-emerald-50 text-emerald-900 rounded-xl text-[11px] font-medium flex items-center gap-1.5 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t.alertSentSuccess} (+91 {phoneNumber})</span>
              </div>
            )}
          </div>

          {/* Validate & Learn Continuous Retraining Loop */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <RotateCw className="w-4 h-4 text-emerald-600" />
                  <span>{t.validateLearnTitle}</span>
                </h3>
                <p className="text-[10px] text-slate-400">{t.validateLearnSubtitle}</p>
              </div>
              <button
                onClick={() => setShowSubmitModal(true)}
                className="text-[10px] bg-slate-900 hover:bg-slate-800 text-white font-bold px-2 py-1 rounded-lg cursor-pointer"
              >
                + {t.logGroundTruth}
              </button>
            </div>

            {/* Model Evaluation Metrics */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <div className="text-slate-400 text-[10px]">Rainfall RMSE</div>
                <div className="text-xs font-black text-slate-900">{MODEL_EVALUATION_METRICS.rmse.achieved}</div>
                <div className="text-[9px] text-emerald-700">Target &lt;15mm ✓</div>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <div className="text-slate-400 text-[10px]">Event F1-Score</div>
                <div className="text-xs font-black text-slate-900">{MODEL_EVALUATION_METRICS.f1.achieved}</div>
                <div className="text-[9px] text-emerald-700">Target &gt;0.80 ✓</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 2: RIVER WATER AVAILABILITY & BEST PLANT SELECTION ================= */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-600/10 text-cyan-600 flex items-center justify-center">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>{t.riverWaterTitle}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-cyan-100 text-cyan-800">
                  {selectedPanchayat.riverWater.riverName}
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                {t.riverWaterSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
              selectedPanchayat.riverWater.status === 'optimal'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-amber-50 text-amber-800 border-amber-300'
            }`}>
              {t.waterSituation}: {selectedPanchayat.riverWater.statusLabel}
            </span>
          </div>
        </div>

        {/* Hydrology Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Gauge className="w-4 h-4 text-cyan-600" />
              <span>{t.riverGaugeHeight}</span>
            </div>
            <div className="text-xl font-black text-slate-900">
              {selectedPanchayat.riverWater.gaugeHeightMeters} m
            </div>
            <span className="text-[10px] text-slate-400">Normal: {selectedPanchayat.riverWater.normalGaugeHeightMeters}m</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Waves className="w-4 h-4 text-blue-600" />
              <span>{t.canalDischarge}</span>
            </div>
            <div className="text-xl font-black text-slate-900">
              {selectedPanchayat.riverWater.currentDischargeCusecs} cusecs
            </div>
            <span className="text-[10px] text-slate-400">{selectedPanchayat.riverWater.nearestCanal}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Droplet className="w-4 h-4 text-indigo-600" />
              <span>{t.reservoirStorage}</span>
            </div>
            <div className="text-xl font-black text-slate-900">
              {selectedPanchayat.riverWater.storageLevelPercent}%
            </div>
            <span className="text-[10px] text-slate-400">Active Storage Basin</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>{t.groundwaterDepth}</span>
            </div>
            <div className="text-xl font-black text-slate-900">
              {selectedPanchayat.riverWater.groundwaterDepthMeters} m
            </div>
            <span className="text-[10px] text-slate-400">Below Ground Level</span>
          </div>
        </div>

        {/* Best Plant Recommendation Grid */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-600" />
              {t.bestPlantsTitle}
            </h4>
            <span className="text-[11px] text-slate-400">
              {t.bestPlantsSubtitle}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {selectedPanchayat.riverWater.recommendedCrops.map((crop, i) => (
              <div 
                key={crop.cropKey}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      Rank #{i + 1}
                    </span>
                    <span className="text-xs font-black text-emerald-700">
                      {crop.suitabilityScore}% Match
                    </span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">
                    {language === 'mr' || language === 'hi' ? crop.cropNameRegional : crop.cropName}
                  </h5>
                  <p className="text-[11px] text-slate-600 leading-snug mt-1.5">
                    {language === 'mr' || language === 'hi' ? crop.rationaleRegional : crop.rationale}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 grid grid-cols-2 gap-1 text-[10px]">
                  <div>
                    <span className="text-slate-400 block">{t.waterRequirement}</span>
                    <span className="font-bold text-cyan-800">{crop.waterNeedMm} mm</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{t.cropDuration}</span>
                    <span className="font-bold text-slate-800">{crop.durationDays} Days</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= SECTION 3: PANCHAYAT OFFICE AVAILABILITY & PUBLIC BROADCAST ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Gram Panchayat Office Availability (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {selectedPanchayat.officeInfo.officeName}
                </h3>
                <span className="text-xs text-slate-400">
                  {selectedPanchayat.officeInfo.buildingLocation}
                </span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t.officeStatusOpen}
            </span>
          </div>

          {/* Officers Table */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>{t.officersOnDuty}</span>
              <span className="text-[11px] text-slate-400 font-normal">Working: {selectedPanchayat.officeInfo.workingHours}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedPanchayat.officeInfo.officersOnDuty.map((officer, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">{officer.name}</div>
                    <div className="text-[10px] text-slate-500">{officer.role}</div>
                    <div className="text-[11px] font-mono text-indigo-700 font-semibold">{officer.phone}</div>
                  </div>
                  <a
                    href={`tel:${officer.phone}`}
                    className="w-7 h-7 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center text-xs"
                    title={t.callOfficer}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Seed Buffer Stock */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-emerald-600" />
              <span>{t.seedStockAvailable}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {selectedPanchayat.officeInfo.seedBufferStock.map((stock, i) => (
                <div key={i} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                  <div className="text-[11px] font-bold text-slate-800 truncate" title={stock.crop}>{stock.crop}</div>
                  <div className="text-sm font-black text-emerald-700">{stock.availableBags} Bags</div>
                  <div className="text-[9px] text-slate-400">₹{stock.subsidizedRatePerBag}/bag</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Public Broadcast Hub: Radio & TV Display (6 cols) */}
        <div className="lg:col-span-6 bg-slate-950 text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-black flex items-center justify-center font-bold">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{t.communityRadioStation}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-600 text-white font-bold animate-pulse">
                    ON AIR
                  </span>
                </h3>
                <span className="text-[10px] text-amber-300/80">Public Radio & Village Ticker Broadcast</span>
              </div>
            </div>

            {/* Frequency Selector */}
            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl">
              {['90.4', '102.8'].map((f) => (
                <button
                  key={f}
                  onClick={() => setRadioFreq(f)}
                  className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-lg cursor-pointer ${
                    radioFreq === f ? 'bg-amber-400 text-black' : 'text-slate-300'
                  }`}
                >
                  {f} MHz
                </button>
              ))}
            </div>
          </div>

          {/* Voice Broadcast Trigger & Real Dispatch */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <button
              onClick={handleToggleRadio}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all ${
                isRadioPlaying
                  ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                  : 'bg-amber-500 hover:bg-amber-400 text-black'
              }`}
            >
              {isRadioPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isRadioPlaying ? t.stopRadioTts : t.broadcastRadioTts}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLaunchWhatsApp}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                {t.openRealWhatsApp}
              </button>
              <button
                onClick={handleLaunchRealSms}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                {t.openRealSms}
              </button>
            </div>
          </div>

          {/* Public TV Live Scrolling Ticker */}
          <div className="bg-red-950/80 border border-red-900/60 rounded-xl p-3 flex items-center gap-3 overflow-hidden">
            <span className="text-[10px] font-black text-white bg-red-600 px-2 py-0.5 rounded-md uppercase shrink-0">
              TV TICKER
            </span>
            <div className="whitespace-nowrap animate-[marquee_25s_linear_infinite] text-xs font-mono font-medium text-amber-200">
              ⚡ ग्रामपंचायत {selectedPanchayat.nameRegional}: पुढील २४ तासांतील पाऊस हा खोटा पाऊस आहे • १२ दिवसांचा कडक उन्हाचा खंड येणार • नदी पाणी पातळी {selectedPanchayat.riverWater.gaugeHeightMeters}m • ग्रामसेवक उपलब्ध: ९४२२१८८३०१ • बियाणे बफर साठा गोदामात उपलब्ध • हेल्पलाइन: १८००-१८०-१५५१ ⚡
            </div>
          </div>
        </div>
      </div>
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {t.submitGroundReading}
              </h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRecordSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  {t.selectPanchayat}
                </label>
                <input
                  type="text"
                  disabled
                  value={`${selectedPanchayat.name} (${selectedPanchayat.nameRegional})`}
                  className="w-full p-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  {t.measuredRainMm}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={observedRain}
                  onChange={(e) => setObservedRain(e.target.value)}
                  required
                  className="w-full p-2 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  {t.didDryBreakFollow}
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDidFalseOnsetOccur(true)}
                    className={`flex-1 py-2 rounded-xl font-bold border cursor-pointer ${
                      didFalseOnsetOccur
                        ? 'bg-amber-100 border-amber-300 text-amber-900'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {t.yesDryBreak}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDidFalseOnsetOccur(false)}
                    className={`flex-1 py-2 rounded-xl font-bold border cursor-pointer ${
                      !didFalseOnsetOccur
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {t.noRainsContinued}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  {t.observerNotes}
                </label>
                <textarea
                  rows={2}
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer"
                >
                  {t.submitAndRetrain}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
