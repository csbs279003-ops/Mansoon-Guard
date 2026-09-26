import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Smartphone, 
  CheckCheck, 
  PhoneCall, 
  Share2, 
  Volume2, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  Bell
} from 'lucide-react';
import { PanchayatData, Language, ScreenId } from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { playHapticSound } from '../../utils/audio';
import { generateLocalizedAlertText, openWhatsAppShare } from '../../utils/share';

interface Props {
  panchayat: PanchayatData;
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  showHotspots: boolean;
}

export const DeliveryHubScreen: React.FC<Props> = ({
  panchayat,
  language,
  onNavigate,
  showHotspots,
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;
  const [channel, setChannel] = useState<'sms' | 'whatsapp'>('whatsapp');
  const [targetScript, setTargetScript] = useState<'regional' | 'english'>('regional');
  const [phoneNumber, setPhoneNumber] = useState('98231 XXXXX');
  const [dispatchToast, setDispatchToast] = useState(false);

  const effectiveLang: Language = targetScript === 'english' ? 'en' : language;
  const alertText = generateLocalizedAlertText(panchayat, 'cotton', effectiveLang);

  const handleSendTest = () => {
    playHapticSound('success');
    setDispatchToast(true);
    setTimeout(() => setDispatchToast(false), 4500);
  };

  const handleOpenWhatsAppDirect = () => {
    openWhatsAppShare(alertText);
  };

  return (
    <div className="flex flex-col min-h-full pb-20 bg-slate-50 text-slate-900 select-none">
      {/* Top Header */}
      <div className="bg-emerald-950 text-white px-5 pt-4 pb-5 rounded-b-3xl shadow-sm relative">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
            {t.badgeSystem}
          </span>
          <span className="text-[11px] bg-emerald-900 px-2 py-0.5 rounded-full text-emerald-200 font-bold">
            2G GSM & WhatsApp
          </span>
        </div>

        <h1 className="text-lg font-bold tracking-tight text-white flex items-center justify-between">
          <span>{t.deliveryHubTitle}</span>
          <span className="text-xs bg-emerald-800 text-emerald-300 px-2 py-0.5 rounded-md font-mono">
            GSM + OTT
          </span>
        </h1>
        <p className="text-xs text-emerald-200/90 mt-0.5">
          {t.deliveryHubSubtitle}
        </p>
      </div>

      {/* Main Container */}
      <div className="p-4 space-y-4">
        {/* Channel & Script Toggles */}
        <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
          {/* Channel Toggle */}
          <div className="flex p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => {
                playHapticSound('tap');
                setChannel('whatsapp');
              }}
              className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer ${
                channel === 'whatsapp'
                  ? 'bg-emerald-700 text-white font-bold shadow-xs'
                  : 'text-slate-700'
              }`}
            >
              WhatsApp
            </button>
            <button
              onClick={() => {
                playHapticSound('tap');
                setChannel('sms');
              }}
              className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer ${
                channel === 'sms'
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'text-slate-700'
              }`}
            >
              Basic 2G SMS
            </button>
          </div>

          {/* Script Toggle */}
          <div className="flex p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => {
                playHapticSound('tap');
                setTargetScript('regional');
              }}
              className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer ${
                targetScript === 'regional'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-700'
              }`}
            >
              {language === 'mr' ? 'मराठी' : language === 'hi' ? 'हिन्दी' : language === 'te' ? 'తెలుగు' : language === 'ta' ? 'தமிழ்' : 'Local'}
            </button>
            <button
              onClick={() => {
                playHapticSound('tap');
                setTargetScript('english');
              }}
              className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer ${
                targetScript === 'english'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-700'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Message Simulator Preview */}
        {channel === 'whatsapp' ? (
          <div className="bg-[#e5ddd5] rounded-2xl p-3 border border-slate-300 shadow-sm relative">
            <div className="text-[10px] text-slate-500 font-bold mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> WhatsApp Verified Agromet Channel
              </span>
              <span>10:32 AM</span>
            </div>

            <div className="bg-white rounded-xl p-3 shadow-xs space-y-2 border-l-4 border-l-amber-500">
              <div className="text-[11px] text-slate-800 whitespace-pre-line leading-relaxed font-sans font-medium">
                {alertText}
              </div>

              {/* Simulated Audio Note */}
              <div className="mt-2 p-2 bg-emerald-50/80 rounded-lg border border-emerald-100 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-slate-800">
                    Voice Note (0:48) · {effectiveLang !== 'en' ? 'स्थानिक ऑडिओ सल्ला' : 'Voice Advisory'}
                  </div>
                  <div className="h-1 bg-emerald-200 rounded-full mt-1 w-3/4" />
                </div>
              </div>

              {/* Quick Action Interactive Buttons */}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5">
                <button
                  onClick={handleOpenWhatsAppDirect}
                  className="w-full py-1.5 text-center text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 cursor-pointer shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t.shareWhatsApp}</span>
                </button>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                  <span className="flex items-center gap-1 text-slate-600 font-medium">
                    <PhoneCall className="w-3 h-3 text-emerald-600" /> Helpline: 1800-180-1551
                  </span>
                  <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-sm">
            <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between mb-2">
              <span>SMS INBOX · 2G GSM Gateway</span>
              <span>GSM 7-bit Unicode</span>
            </div>

            <div className="bg-[#8ba888] text-slate-950 font-mono text-xs p-3.5 rounded-xl border-2 border-[#5d735a] shadow-inner leading-relaxed whitespace-pre-line">
              {alertText}
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
              <span>Protocol: SMS Alert</span>
              <span className="text-emerald-400 font-bold">100% 2G Feature Phone Compatible</span>
            </div>
          </div>
        )}

        {/* Live Dispatch Simulator Box */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.dispatchToPhone}</span>
            </span>
            <span className="text-[10px] text-slate-400">Gateway API</span>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-semibold">+91</span>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={t.mobileNumber}
                className="w-full pl-11 pr-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <button
              onClick={handleSendTest}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              {t.pushAlert}
            </button>
          </div>

          {dispatchToast && (
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 animate-fadeIn font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {t.alertSentSuccess} (+91 {phoneNumber})
              </span>
            </div>
          )}
        </div>

        {/* CTA to Step 8 Validate & Learn */}
        <button
          onClick={() => {
            playHapticSound('tap');
            onNavigate('validate-learn');
          }}
          className={`w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-between cursor-pointer ${
            showHotspots ? 'ring-4 ring-cyan-400' : ''
          }`}
        >
          <span>{t.validateLearnTitle}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
