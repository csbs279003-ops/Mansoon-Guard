import React, { useState } from 'react';
import { 
  Smartphone, 
  Monitor, 
  Layers, 
  RotateCcw, 
  Globe, 
  UserCheck, 
  Eye, 
  Share2, 
  Sparkles,
  Tablet,
  LayoutGrid,
  User,
  LogIn,
  CheckCircle2,
  Droplets,
  Home
} from 'lucide-react';
import { Language, UserRole, FarmerUser } from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { DeviceType } from '../mobile/DeviceFrame';
import { playHapticSound } from '../../utils/audio';

export type ViewMode = 'landing-signin' | 'dashboard' | 'responsive-desktop' | 'mobile-prototype' | 'figma-canvas';

interface Props {
  viewMode: ViewMode;
  onSelectViewMode: (mode: ViewMode) => void;
  deviceType?: DeviceType;
  onSelectDeviceType?: (device: DeviceType) => void;
  isMobileScreen?: boolean;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  userRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  showHotspots: boolean;
  onToggleHotspots: () => void;
  onRestartFlow: () => void;
  onToggleInspect: () => void;
  isInspectOpen: boolean;
  currentUser: FarmerUser | null;
  onOpenAuth: () => void;
}

export const FigmaToolbar: React.FC<Props> = ({
  viewMode,
  onSelectViewMode,
  isMobileScreen = false,
  language,
  onSelectLanguage,
  userRole,
  onSelectRole,
  showHotspots,
  onToggleHotspots,
  onRestartFlow,
  onToggleInspect,
  isInspectOpen,
  currentUser,
  onOpenAuth
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;

  return (
    <header className="sticky top-0 z-50 bg-[#1a1c1e] text-white border-b border-white/10 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 select-none">
      
      {/* Zone 1: Brand Title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-black text-slate-950 text-sm shadow-md">
          MG
        </div>
        <div>
          <div className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
            <span>{t.appTitle}</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded-full font-mono hidden sm:inline-block">
              {t.badgeSystem}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 hidden md:block">
            {t.tagline}
          </div>
        </div>
      </div>

      {/* Zone 2: Primary Viewport & Canvas Mode Switcher */}
      <div className="flex items-center gap-1 bg-[#282a2d] p-1 rounded-2xl border border-white/10">
        {/* Mode 0: Welcome & Sign In Landing */}
        <button
          onClick={() => {
            playHapticSound('tap');
            onSelectViewMode('landing-signin');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            viewMode === 'landing-signin'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
          title="Sign In & Welcome Portal"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sign In / Home</span>
          <span className="sm:hidden">Home</span>
        </button>

        {/* Mode 1: Auto-Adaptive Agromet Dashboard */}
        <button
          onClick={() => {
            playHapticSound('tap');
            onSelectViewMode('dashboard');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            viewMode === 'dashboard' || viewMode === 'responsive-desktop' || viewMode === 'mobile-prototype'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
          title="Live Dashboard - Automatically adapts to Mobile or Desktop"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Agromet Dashboard</span>
          <span className="sm:hidden">Dashboard</span>
        </button>

        {/* Mode 2: Workflow Canvas */}
        <button
          onClick={() => {
            playHapticSound('tap');
            onSelectViewMode('figma-canvas');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            viewMode === 'figma-canvas'
              ? 'bg-blue-500 text-white font-bold shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
          title={t.viewWorkflow}
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t.viewWorkflow}</span>
          <span className="sm:hidden">Flow</span>
        </button>
      </div>

      {/* Zone 3: Actions & Controls (Auto-Adaptive Indicator, Farmer Profile/Login, Language, Inspect) */}
      <div className="flex items-center gap-2">
        {/* Dynamic auto-adaptive layout badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-xl text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400 text-[11px]">Format:</span>
          <span className="text-emerald-300 font-bold text-[11px]">{isMobileScreen ? 'Mobile' : 'Desktop'}</span>
          <span className="text-[10px] text-slate-500">(Auto)</span>
        </div>

        {/* Farmer Login / Register / Profile Button */}
        <button
          onClick={() => {
            playHapticSound('tap');
            onOpenAuth();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-xs ${
            currentUser
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900'
              : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold border-emerald-400'
          }`}
        >
          {currentUser ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="max-w-[80px] sm:max-w-[120px] truncate">{currentUser.name}</span>
            </>
          ) : (
            <>
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.loginRegister || "Login / Register"}</span>
            </>
          )}
        </button>

        {/* Language Switcher */}
        <div className="relative">
          <select
            value={language}
            onChange={(e) => {
              playHapticSound('tap');
              onSelectLanguage(e.target.value as Language);
            }}
            className="bg-[#282a2d] text-slate-200 text-xs font-semibold py-1.5 px-2.5 rounded-xl border border-white/10 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
          >
            <option value="en">English (EN)</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="mr">मराठी (Marathi)</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="ta">தமிழ் (Tamil)</option>
          </select>
        </div>

        {/* Persona Role Switcher */}
        <div className="relative hidden md:block">
          <select
            value={userRole}
            onChange={(e) => {
              playHapticSound('tap');
              onSelectRole(e.target.value as UserRole);
            }}
            className="bg-[#282a2d] text-slate-200 text-xs font-medium py-1.5 px-2.5 rounded-xl border border-white/10 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
          >
            <option value="farmer">☘ Farmer</option>
            <option value="officer">⌂ Panchayat & Officer</option>
            <option value="kvk">↷ Extension & KVK</option>
          </select>
        </div>

        {/* Hotspots toggle */}
        <button
          onClick={() => {
            playHapticSound('tap');
            onToggleHotspots();
          }}
          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
            showHotspots
              ? 'bg-cyan-500/20 text-cyan-400 border-cyan-400/40 ring-1 ring-cyan-400'
              : 'bg-[#282a2d] text-slate-400 border-white/10 hover:text-white'
          }`}
          title={t.hotspotsToggle}
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        {/* Restart Flow Button */}
        <button
          onClick={() => {
            playHapticSound('tap');
            onRestartFlow();
          }}
          className="p-2 bg-[#282a2d] hover:bg-[#383838] text-slate-300 hover:text-white rounded-xl border border-white/10 cursor-pointer"
          title={t.restart}
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Inspect & Specs Drawer Toggle */}
        <button
          onClick={() => {
            playHapticSound('tap');
            onToggleInspect();
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
            isInspectOpen
              ? 'bg-white text-slate-900 border-white'
              : 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-600/30'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t.specs}</span>
        </button>
      </div>
    </header>
  );
};
