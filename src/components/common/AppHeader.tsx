import React from 'react';
import { 
  Home, 
  LayoutGrid, 
  MapPin, 
  User, 
  LogIn, 
  CheckCircle2, 
  Globe2, 
  ChevronDown,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Language, FarmerUser, PanchayatData } from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { playHapticSound } from '../../utils/audio';

interface Props {
  currentView: 'landing-signin' | 'dashboard';
  onSelectView: (view: 'landing-signin' | 'dashboard') => void;
  selectedPanchayat: PanchayatData;
  onOpenLocationSelector: () => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  currentUser: FarmerUser | null;
  onOpenAuth: () => void;
  isMobile: boolean;
}

export const AppHeader: React.FC<Props> = ({
  currentView,
  onSelectView,
  selectedPanchayat,
  onOpenLocationSelector,
  language,
  onSelectLanguage,
  currentUser,
  onOpenAuth,
  isMobile,
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'mr', label: 'मराठी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'ta', label: 'தமிழ்' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md text-white border-b border-emerald-900/40 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 select-none">
      
      {/* Brand & Active Panchayat Location */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            playHapticSound('tap');
            onSelectView('landing-signin');
          }}
          className="flex items-center gap-2.5 group cursor-pointer text-left"
          title="Go to Home"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-black text-slate-950 text-sm shadow-md group-hover:scale-105 transition-transform">
            MG
          </div>
          <div>
            <div className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-1.5">
              <span>{t.appTitle}</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 px-1.5 py-0.2 rounded-full font-mono font-bold hidden sm:inline-block">
                Agromet AI
              </span>
            </div>
            <div className="text-[10px] text-slate-400 hidden md:block">
              {t.allIndiaCoverage || "All India Hyperlocal Agromet Intelligence"}
            </div>
          </div>
        </button>

        {/* Quick Panchayat Location Switcher Pill */}
        <button
          onClick={() => {
            playHapticSound('tap');
            onOpenLocationSelector();
          }}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-850 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-500/60 rounded-xl text-xs text-slate-200 transition-all cursor-pointer shadow-2xs group"
          title="Change Gram Panchayat & State"
        >
          <MapPin className="w-3.5 h-3.5 text-emerald-400 group-hover:animate-bounce" />
          <span className="font-bold text-emerald-300">{selectedPanchayat.name}</span>
          <span className="text-slate-400 text-[11px]">({selectedPanchayat.state})</span>
          <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white" />
        </button>
      </div>

      {/* Main Navigation (Ordered for User-Friendliness) */}
      <nav className="flex items-center gap-1 bg-slate-900 p-1 rounded-2xl border border-slate-800">
        {/* Option 1: Welcome & Sign In */}
        <button
          onClick={() => {
            playHapticSound('tap');
            onSelectView('landing-signin');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            currentView === 'landing-signin'
              ? 'bg-amber-400 text-slate-950 shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Initial Welcome & Sign In Portal"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Home / Sign In</span>
          <span className="sm:hidden">Home</span>
        </button>

        {/* Option 2: Farm Dashboard */}
        <button
          onClick={() => {
            playHapticSound('tap');
            onSelectView('dashboard');
          }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            currentView === 'dashboard'
              ? 'bg-emerald-500 text-slate-950 shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Agromet Advisory Dashboard"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Agromet Dashboard</span>
          <span className="sm:hidden">Dashboard</span>
        </button>
      </nav>

      {/* Right Controls: Language & Farmer Account */}
      <div className="flex items-center gap-2">
        
        {/* Language Selector Dropdown / Pills */}
        <div className="flex items-center bg-slate-900 rounded-xl p-0.5 border border-slate-800 text-xs">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                playHapticSound('tap');
                onSelectLanguage(l.code);
              }}
              className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                language === l.code
                  ? 'bg-emerald-500 text-slate-950 shadow-2xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {l.code === 'en' ? 'EN' : l.code === 'hi' ? 'हि' : l.code === 'mr' ? 'मरा' : l.code === 'te' ? 'తె' : 'த'}
            </button>
          ))}
        </div>

        {/* Farmer Profile / Sign In Button */}
        <button
          onClick={() => {
            playHapticSound('tap');
            onOpenAuth();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-xs active:scale-95 ${
            currentUser
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-400'
          }`}
          title={currentUser ? "My Farm Profile" : "Sign In or Register"}
        >
          {currentUser ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="max-w-[75px] sm:max-w-[120px] truncate">{currentUser.name}</span>
            </>
          ) : (
            <>
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign In</span>
            </>
          )}
        </button>

      </div>

    </header>
  );
};
