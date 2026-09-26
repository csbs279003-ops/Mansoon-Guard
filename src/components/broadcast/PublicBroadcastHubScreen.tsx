import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Tv, 
  Send, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  MessageSquare, 
  Smartphone, 
  Sparkles, 
  AlertTriangle, 
  Waves, 
  Sprout, 
  Phone, 
  Check, 
  Copy, 
  Share2, 
  Flame, 
  Activity, 
  Building2,
  Clock
} from 'lucide-react';
import { PanchayatData, Language, ScreenId } from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { openWhatsAppShare, openRealSmsShare, shareOrCopy, generateLocalizedAlertText } from '../../utils/share';
import { speakAdvisory, stopSpeakingAudio, playHapticSound } from '../../utils/audio';

interface Props {
  panchayat: PanchayatData;
  language: Language;
  onNavigate?: (screenId: ScreenId) => void;
  showHotspots?: boolean;
}

export const PublicBroadcastHubScreen: React.FC<Props> = ({
  panchayat,
  language,
  onNavigate,
  showHotspots,
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;
  const [activeTab, setActiveTab] = useState<'radio' | 'tv' | 'direct'>('radio');
  const [frequency, setFrequency] = useState('90.4');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isTvFullscreen, setIsTvFullscreen] = useState(false);
  const [targetPhone, setTargetPhone] = useState('');
  const [copied, setCopied] = useState(false);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      stopSpeakingAudio();
    };
  }, []);

  const fullAlertText = generateLocalizedAlertText(panchayat, 'cotton', language);

  const getRadioScript = () => {
    const river = panchayat.riverWater;
    if (language === 'mr') {
      return `नमस्कार शेतकरी बंधूंनो! हे घाटंजी कम्युनिटी रेडिओ ९०.४ एफएम आहे. कृषी हवामान विशेष बुलेटिन: 
ग्रामपंचायत ${panchayat.nameRegional} मध्ये पुढील २४ तासांत पावसाची शक्यता ${panchayat.rainfallProbability}% आहे. 
सावध रहा! हा खोटा पाऊस (फॉल्स ऑनसेट) असून त्यानंतर तब्बल ${panchayat.breakDurationDays} दिवसांचा तीव्र कोरडा खंड पडणार आहे.
पैनगंगा नदी व कालवा पाणी पातळी सध्या ${river ? `${river.gaugeHeightMeters} मीटर` : 'कमी'} आहे. 
सर्व शेतकऱ्यांना नम्र आवाहन आहे की घाईघाईने कापूस अथवा सोयाबीनची पेरणी करू नका. बी जळाल्यास मोठे नुकसान होईल. 
कमी पाण्यात बाजरी अथवा तूर या पिकांना प्राधान्य द्या. खरी पेरणीची वेळ २८ जून नंतर सुरू होईल. 
अधिक माहितीसाठी ग्रामपंचायत कार्यालयाशी किंवा टोल फ्री हेल्पलाइन १८००-१८०-१५५१ वर संपर्क साधा. धन्यवाद!`;
    }
    if (language === 'hi') {
      return `नमस्कार किसान भाइयों! यह घाटंजी कम्युनिटी रेडियो ९०.४ एफएम है। विशेष कृषि मौसम समाचार:
ग्राम पंचायत ${panchayat.name} में अगले २४ घंटों में वर्षा की संभावना ${panchayat.rainfallProbability}% है। 
सावधान रहें! यह मानसून का झूठा आगमन है, जिसके बाद ${panchayat.breakDurationDays} दिनों का भीषण सूखा अंतराल आएगा।
नदी गेज जलस्तर वर्तमान में ${river ? `${river.gaugeHeightMeters} मीटर` : 'कम'} है। 
सभी किसान भाइयों से अनुरोध है कि जल्दबाजी में कपास या सोयाबीन की बुवाई न करें। 
कम पानी की स्थिति में बाजरा और अरहर (तूर) को प्राथमिकता दें। सुरक्षित बुवाई २८ जून के बाद शुरू होगी। 
सहायता हेतु ग्राम पंचायत या किसान हेल्पलाइन १८००-१८०-१५५१ पर संपर्क करें।`;
    }
    // English default
    return `Greetings farmers! This is Ghatanji Community Radio 90.4 FM with an urgent agromet broadcast:
For Panchayat ${panchayat.name}, upcoming rain probability is ${panchayat.rainfallProbability}%. 
Warning: This is a False Onset shower followed by a severe ${panchayat.breakDurationDays}-day dry break.
River gauge height is ${river ? `${river.gaugeHeightMeters}m (${river.statusLabel})` : 'low'}.
Do NOT sow cotton or soybean seeds prematurely; seeds will scorch. 
For current water availability, drought-hardy millets and pigeon pea are highly recommended. 
True sustained sowing window opens after June 28th. Contact Kisan Helpline at 1800-180-1551.`;
  };

  const handleToggleRadioAudio = () => {
    if (isAudioPlaying) {
      stopSpeakingAudio();
      setIsAudioPlaying(false);
    } else {
      setIsAudioPlaying(true);
      speakAdvisory(getRadioScript(), language, () => {
        setIsAudioPlaying(false);
      });
    }
  };

  const handleSendRealWhatsApp = () => {
    openWhatsAppShare(fullAlertText, targetPhone);
  };

  const handleSendRealSms = () => {
    openRealSmsShare(fullAlertText, targetPhone);
  };

  const handleCopyAlert = async () => {
    const success = await shareOrCopy(fullAlertText, `${panchayat.name} Agromet Warning`);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className={`flex-1 flex flex-col p-4 space-y-4 max-w-4xl mx-auto w-full ${isTvFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-6 overflow-y-auto max-w-none' : ''}`}>
      
      {/* Tab Switcher */}
      <div className="flex items-center justify-between flex-wrap gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-2xl shadow-xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              playHapticSound('tap');
              setActiveTab('radio');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'radio'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Radio className="w-4 h-4" />
            {t.publicRadioTab}
          </button>

          <button
            onClick={() => {
              playHapticSound('tap');
              setActiveTab('tv');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'tv'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Tv className="w-4 h-4" />
            {t.publicTvTab}
          </button>

          <button
            onClick={() => {
              playHapticSound('tap');
              setActiveTab('direct');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'direct'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            Real SMS & WhatsApp
          </button>
        </div>

        {activeTab === 'tv' && (
          <button
            onClick={() => setIsTvFullscreen(!isTvFullscreen)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1.5 cursor-pointer"
          >
            {isTvFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            {isTvFullscreen ? t.exitFullscreenTv : t.fullscreenTvMode}
          </button>
        )}
      </div>

      {/* ===================== TAB 1: COMMUNITY RADIO MODE (90.4 FM) ===================== */}
      {activeTab === 'radio' && (
        <div className="space-y-4">
          {/* Vintage/Modern Radio Deck */}
          <div className="bg-gradient-to-br from-amber-950/80 via-slate-900 to-slate-950 border border-amber-900/40 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            {/* Ambient Background Wave */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-600/30">
                  <Radio className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-wide flex items-center gap-2">
                    {t.communityRadioStation}
                  </h3>
                  <p className="text-xs text-amber-200/80">
                    Live Agromet Voice Transmission & Village Chowk Loudspeaker
                  </p>
                </div>
              </div>

              {/* ON AIR Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/30 border border-red-500/50 text-red-400 text-xs font-bold animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                {t.onAirLive}
              </div>
            </div>

            {/* Frequency Tuning Bar */}
            <div className="bg-black/50 border border-amber-900/30 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between text-xs text-amber-300 font-mono mb-2">
                <span>FM FREQUENCY TUNER</span>
                <span className="text-lg font-bold text-amber-400">{frequency} MHz</span>
              </div>
              <div className="flex items-center gap-2">
                {['88.2', '90.4', '94.8', '102.4', '107.8'].map((freq) => (
                  <button
                    key={freq}
                    onClick={() => {
                      playHapticSound('tap');
                      setFrequency(freq);
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      frequency === freq
                        ? 'bg-amber-500 text-black shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Voice Player Controls */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleRadioAudio}
                  className={`px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2.5 transition-all cursor-pointer shadow-lg ${
                    isAudioPlaying
                      ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                      : 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/30'
                  }`}
                >
                  {isAudioPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  {isAudioPlaying ? t.stopRadioTts : t.broadcastRadioTts}
                </button>

                {isAudioPlaying && (
                  <div className="flex items-center gap-1 h-6">
                    <span className="w-1 bg-amber-400 rounded-full animate-bounce h-4" />
                    <span className="w-1 bg-amber-400 rounded-full animate-bounce h-6 delay-75" />
                    <span className="w-1 bg-amber-400 rounded-full animate-bounce h-3 delay-150" />
                    <span className="w-1 bg-amber-400 rounded-full animate-bounce h-5 delay-100" />
                  </div>
                )}
              </div>

              <div className="text-xs text-amber-200/70 font-mono">
                Panchayat: <span className="text-white font-bold">{panchayat.name}</span> | Reach: <span className="text-emerald-400 font-bold">12,400 Farmers</span>
              </div>
            </div>
          </div>

          {/* Radio Script & Village Loudspeaker Text */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                {t.radioScriptTitle}
              </h4>
              <button
                onClick={handleCopyAlert}
                className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Script'}
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/70 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 font-mono whitespace-pre-line leading-relaxed">
              {getRadioScript()}
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 2: PUBLIC TV / DIGITAL NOTICE BOARD ===================== */}
      {activeTab === 'tv' && (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
            {/* Top TV Station Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-lg bg-red-600 font-black text-xs tracking-wider">
                  DD KISAN LIVE
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {t.villageTvDisplay}
                  </h3>
                  <span className="text-xs text-slate-400">
                    Gram Panchayat {panchayat.name} Community Hall Screen
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                BROADCAST ACTIVE
              </div>
            </div>

            {/* Giant Hazard Banner */}
            <div className="bg-red-600 text-white rounded-2xl p-4 mb-5 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 shrink-0 animate-bounce" />
                <div>
                  <div className="text-xs uppercase tracking-widest font-bold opacity-90">
                    FLASH AGROMET WARNING
                  </div>
                  <div className="text-xl font-black">
                    {panchayat.primaryAdvisory === 'WAIT' ? 'WAIT - DO NOT SOW SEEDS YET!' : 'PROCEED WITH SOWING!'}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs opacity-90">Dry Break Spell Expected</div>
                <div className="text-lg font-black">{panchayat.breakDurationDays} Days Severe Break</div>
              </div>
            </div>

            {/* 3-Column TV Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              {/* River Gauge Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase mb-2">
                  <Waves className="w-4 h-4" />
                  River Basin Water Level
                </div>
                <div className="text-2xl font-black text-white">
                  {panchayat.riverWater.gaugeHeightMeters} m
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Status: <span className="text-amber-400 font-semibold">{panchayat.riverWater.statusLabel}</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  Canal flow: {panchayat.riverWater.currentDischargeCusecs} cusecs
                </div>
              </div>

              {/* Best Plant Recommendation Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase mb-2">
                  <Sprout className="w-4 h-4" />
                  Best Plant for Situation
                </div>
                <div className="text-xl font-black text-white">
                  {panchayat.riverWater.recommendedCrops[0]?.cropNameRegional || 'बाजरी / तूर'}
                </div>
                <div className="text-xs text-emerald-400 font-semibold mt-1">
                  {panchayat.riverWater.recommendedCrops[0]?.suitabilityScore || 96}% Suitability
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  Low water need (~280mm) survives upcoming dry spell
                </div>
              </div>

              {/* Panchayat Office Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase mb-2">
                  <Building2 className="w-4 h-4" />
                  Panchayat Office Today
                </div>
                <div className="text-lg font-black text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  OFFICE OPEN
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Gram Sevak: {panchayat.officeInfo.officersOnDuty[0]?.name}
                </div>
                <div className="text-xs text-indigo-400 font-bold mt-2">
                  Call: {panchayat.officeInfo.officersOnDuty[0]?.phone}
                </div>
              </div>
            </div>

            {/* Continuous Scrolling News Ticker Tape */}
            <div className="bg-red-950/80 border-t border-red-900/50 py-2.5 px-4 -mx-6 -mb-6 flex items-center gap-3 overflow-hidden">
              <span className="text-xs font-black text-white bg-red-600 px-2.5 py-0.5 rounded-md uppercase shrink-0">
                LIVE TICKER
              </span>
              <div className="whitespace-nowrap animate-[marquee_25s_linear_infinite] text-xs font-mono font-medium text-amber-200">
                ⚡ ग्रामपंचायत {panchayat.nameRegional}: पुढील २४ तासांतील पाऊस हा खोटा पाऊस आहे • १२ दिवसांचा कडक उन्हाचा खंड येणार • कापूस व सोयाबीनची पेरणी करू नका • नदी पाणी पातळी {panchayat.riverWater.gaugeHeightMeters}m • ग्रामसेवक कार्यालयात उपलब्ध: ९४२२१८८३०१ • बियाणे बफर साठा गोदामात उपलब्ध • किसान हेल्पलाइन: १८००-१८०-१५५१ ⚡
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 3: REAL DIRECT SMS & WHATSAPP ===================== */}
      {activeTab === 'direct' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              {t.realAlertsTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.realAlertsSubtitle}
            </p>
          </div>

          {/* Farmer Phone Input */}
          <div className="max-w-md">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Farmer Phone Number (Optional for Direct Target)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={targetPhone}
                onChange={(e) => setTargetPhone(e.target.value)}
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <span className="text-[10px] text-slate-400">
              Leave blank to open share sheet / select contact inside app
            </span>
          </div>

          {/* Action Launchers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleSendRealWhatsApp}
              className="p-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-md shadow-emerald-600/20"
            >
              <MessageSquare className="w-5 h-5" />
              {t.openRealWhatsApp}
            </button>

            <button
              onClick={handleSendRealSms}
              className="p-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-md shadow-blue-600/20"
            >
              <Send className="w-5 h-5" />
              {t.openRealSms}
            </button>
          </div>

          {/* Message Preview */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Pre-Composed Localized Warning
              </span>
              <button
                onClick={handleCopyAlert}
                className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : t.copyAlertText}
              </button>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
              {fullAlertText}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
