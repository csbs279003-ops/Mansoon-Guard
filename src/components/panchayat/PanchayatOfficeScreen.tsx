import React from 'react';
import { 
  Building2, 
  Phone, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  PackageCheck, 
  Megaphone, 
  HelpCircle, 
  Calendar, 
  MapPin, 
  ShieldCheck,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { PanchayatData, Language, ScreenId } from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { playHapticSound } from '../../utils/audio';

interface Props {
  panchayat: PanchayatData;
  language: Language;
  onNavigate?: (screenId: ScreenId) => void;
  showHotspots?: boolean;
}

export const PanchayatOfficeScreen: React.FC<Props> = ({
  panchayat,
  language,
  onNavigate,
  showHotspots,
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;
  const office = panchayat.officeInfo;

  const getStatusBadge = () => {
    switch (office.currentStatus) {
      case 'OPEN':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {t.officeStatusOpen}
          </span>
        );
      case 'IN_FIELD_VISIT':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            {t.officeStatusFieldVisit}
          </span>
        );
      case 'CLOSED':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            {t.officeStatusClosed}
          </span>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 max-w-4xl mx-auto w-full">
      {/* Top Office Status Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === 'mr' || language === 'hi' ? office.officeNameRegional : office.officeName}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {office.buildingLocation}
              </p>
            </div>
          </div>

          <div>{getStatusBadge()}</div>
        </div>

        {/* Working Hours & Helpline Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">{t.workingHours}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{office.workingHours}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="flex-1">
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">{t.helpdeskHelpline}</span>
              <a 
                href={`tel:${office.helplinePhone}`}
                className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                {office.helplinePhone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Office Hotline</span>
              <a 
                href={`tel:${office.emergencyHotline}`}
                className="font-bold text-blue-700 dark:text-blue-400 hover:underline"
              >
                {office.emergencyHotline}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Official Announcement Board */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
          <Megaphone className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
              {t.latestNotice}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-600 text-white font-bold animate-pulse">
                URGENT
              </span>
            </h3>
            <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
              {office.latestPublicAnnouncement.timestamp}
            </span>
          </div>
          <p className="text-xs font-semibold text-amber-950 dark:text-amber-100 mb-1">
            {office.latestPublicAnnouncement.headline}
          </p>
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            {office.latestPublicAnnouncement.details}
          </p>
        </div>
      </div>

      {/* Officers On Duty Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            {t.officersOnDuty}
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Real-time status updated
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {office.officersOnDuty.map((officer, idx) => {
            const isAvail = officer.status === 'AVAILABLE';
            const isField = officer.status === 'ON_FIELD_INSPECTION';

            return (
              <div 
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 rounded-xl p-3.5 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {officer.name}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isAvail
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : isField
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {isAvail ? 'In Office' : isField ? 'On Field' : 'Off Duty'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {language === 'mr' || language === 'hi' ? officer.roleRegional : officer.role}
                  </div>
                  <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mt-1">
                    {officer.phone}
                  </div>
                </div>

                <a
                  href={`tel:${officer.phone}`}
                  onClick={() => playHapticSound('tap')}
                  className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shrink-0 transition-colors shadow-xs"
                  title="Direct Call"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Seed Buffer Stock Inventory */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t.seedStockAvailable}
            </h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
            Certified Godown Stock
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {office.seedBufferStock.map((stock, i) => (
            <div 
              key={i}
              className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-3 text-center"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-0.5 truncate" title={stock.crop}>
                {stock.crop}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                {stock.variety}
              </div>
              <div className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                {stock.availableBags} <span className="text-xs font-normal text-slate-500">Bags</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                Subsidized: ₹{stock.subsidizedRatePerBag}/bag
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
