import React from 'react';
import { 
  Compass, 
  Clock, 
  Sprout, 
  Droplets,
  Waves,
  Map, 
  MessageSquare, 
  Radio,
  Building2,
  RotateCw 
} from 'lucide-react';
import { ScreenId, UserRole, Language } from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { playHapticSound } from '../../utils/audio';

interface Props {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  userRole?: UserRole;
  language: Language;
  showHotspots?: boolean;
}

export const MobileNavigation: React.FC<Props> = ({
  currentScreen,
  onNavigate,
  language,
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;

  // Logically ordered primary tabs for high daily usability
  const tabs = [
    { id: 'crop-advisory' as ScreenId, label: t.tabsAdvisory || "Sowing", icon: Sprout },
    { id: 'irrigation-schedule' as ScreenId, label: t.tabsIrrigation || "Irrigation", icon: Droplets },
    { id: 'risk-outlook' as ScreenId, label: t.tabsOutlook || "Outlook", icon: Clock },
    { id: 'river-water' as ScreenId, label: t.tabsRiverWater || "River & Canal", icon: Waves },
    { id: 'panchayat-select' as ScreenId, label: t.tabsLocation || "Location", icon: Compass },
    { id: 'panchayat-office' as ScreenId, label: t.tabsOffice || "Helpdesk", icon: Building2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1 max-w-lg mx-auto shadow-xl">
      <div className="flex items-center justify-around py-0.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                playHapticSound('tap');
                onNavigate(tab.id);
              }}
              className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all cursor-pointer relative ${
                isActive
                  ? 'text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-emerald-600 dark:text-emerald-400' : ''}`} />
              <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
