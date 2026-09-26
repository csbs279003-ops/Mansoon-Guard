import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CloudRain, 
  Sun, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ShieldAlert, 
  TrendingUp, 
  Clock,
  Sparkles,
  ArrowRight,
  Flame,
  Layers
} from 'lucide-react';
import { PanchayatData, Language, ScreenId } from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { playHapticSound } from '../../utils/audio';
import { TaprootDesiccationSimulator } from '../agromet/TaprootDesiccationSimulator';

interface Props {
  panchayat: PanchayatData;
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  showHotspots: boolean;
}

export const RiskOutlookScreen: React.FC<Props> = ({
  panchayat,
  language,
  onNavigate,
  showHotspots,
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;
  const [activeTab, setActiveTab] = useState<'timeline' | 'simulator' | 'comparison'>('timeline');

  const isWait = panchayat.primaryAdvisory === 'WAIT';
  const isSow = panchayat.primaryAdvisory === 'SOW';

  const advisoryLabel = isWait ? t.advisoryWait : isSow ? t.advisorySow : t.advisoryProtect;

  return (
    <div className="flex flex-col min-h-full pb-20 bg-slate-50 text-slate-900 select-none">
      {/* Top Header */}
      <div className="bg-slate-900 text-white px-5 pt-4 pb-5 rounded-b-3xl shadow-sm relative">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="uppercase tracking-wider font-semibold text-[10px] text-emerald-400">
            {t.badgeSystem}
          </span>
          <span className="text-[11px] bg-slate-800 px-2.5 py-0.5 rounded-full text-slate-300 font-bold">
            {panchayat.name} ({panchayat.nameRegional})
          </span>
        </div>

        <h1 className="text-lg font-bold tracking-tight text-white flex items-center justify-between">
          <span>{t.timelineTitle}</span>
          <span className={`text-xs px-2.5 py-1 rounded-lg font-black border ${
            isWait 
              ? 'bg-amber-500/20 text-amber-400 border-amber-400/30' 
              : isSow 
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30'
              : 'bg-blue-500/20 text-blue-400 border-blue-400/30'
          }`}>
            {advisoryLabel}
          </span>
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          {t.tagline}
        </p>
      </div>

      {/* Main Container */}
      <div className="p-4 space-y-4">
        {/* Core Probabilistic Gauges */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.primaryVerdict}
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              {t.forecastConfidence}: {panchayat.forecastConfidence}%
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {/* Metric 1: Rainfall Probability */}
            <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100 flex flex-col items-center text-center">
              <CloudRain className="w-5 h-5 text-blue-600 mb-1" />
              <div className="text-[10px] text-slate-600 font-medium">{t.rainfallProbability}</div>
              <div className="text-xl font-black text-blue-900 tabular-nums my-0.5">
                {panchayat.rainfallProbability}%
              </div>
              <div className="text-[9px] text-blue-700 font-semibold">{t.confidence}</div>
            </div>

            {/* Metric 2: False-Onset Risk */}
            <div className={`p-3 rounded-xl border flex flex-col items-center text-center ${
              panchayat.falseOnsetRisk > 60 
                ? 'bg-amber-50 border-amber-200 ring-1 ring-amber-300' 
                : 'bg-slate-50 border-slate-100'
            }`}>
              <AlertTriangle className={`w-5 h-5 mb-1 ${
                panchayat.falseOnsetRisk > 60 ? 'text-amber-600' : 'text-slate-400'
              }`} />
              <div className="text-[10px] text-slate-600 font-medium">{t.falseOnsetRisk}</div>
              <div className={`text-xl font-black tabular-nums my-0.5 ${
                panchayat.falseOnsetRisk > 60 ? 'text-amber-700' : 'text-slate-700'
              }`}>
                {panchayat.falseOnsetRisk}%
              </div>
              <div className={`text-[9px] font-bold ${
                panchayat.falseOnsetRisk > 60 ? 'text-amber-800' : 'text-slate-500'
              }`}>
                {panchayat.falseOnsetRisk > 60 ? 'HIGH RISK' : 'LOW RISK'}
              </div>
            </div>

            {/* Metric 3: Dry-Spell Risk */}
            <div className={`p-3 rounded-xl border flex flex-col items-center text-center ${
              panchayat.drySpellRisk > 60 
                ? 'bg-orange-50 border-orange-200 ring-1 ring-orange-300' 
                : 'bg-slate-50 border-slate-100'
            }`}>
              <Sun className={`w-5 h-5 mb-1 ${
                panchayat.drySpellRisk > 60 ? 'text-orange-600' : 'text-slate-400'
              }`} />
              <div className="text-[10px] text-slate-600 font-medium">{t.drySpellRisk}</div>
              <div className={`text-xl font-black tabular-nums my-0.5 ${
                panchayat.drySpellRisk > 60 ? 'text-orange-700' : 'text-slate-700'
              }`}>
                {panchayat.drySpellRisk}%
              </div>
              <div className={`text-[9px] font-bold ${
                panchayat.drySpellRisk > 60 ? 'text-orange-800' : 'text-slate-500'
              }`}>
                {panchayat.breakDurationDays} Days Break
              </div>
            </div>
          </div>
        </div>

        {/* View Toggle Tabs: Timeline vs Desiccation Simulator vs Comparison */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl text-xs font-semibold">
          <button
            onClick={() => {
              playHapticSound('tap');
              setActiveTab('timeline');
            }}
            className={`flex-1 py-1.5 px-2 text-center rounded-lg transition-colors cursor-pointer ${
              activeTab === 'timeline' 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tabsOutlook}
          </button>
          <button
            onClick={() => {
              playHapticSound('tap');
              setActiveTab('simulator');
            }}
            className={`flex-1 py-1.5 px-2 text-center rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'simulator' 
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-700" />
            <span>Root Simulator</span>
          </button>
          <button
            onClick={() => {
              playHapticSound('tap');
              setActiveTab('comparison');
            }}
            className={`flex-1 py-1.5 px-2 text-center rounded-lg transition-colors cursor-pointer ${
              activeTab === 'comparison' 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Comparison
          </button>
        </div>

        {/* Tab Content 1: Timeline */}
        {activeTab === 'timeline' && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                {t.timelineTitle}
              </span>
              <span className="text-[11px] text-slate-400">June - July</span>
            </div>

            <div className="space-y-3 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {/* Phase 1 */}
              <div className="relative pl-8">
                <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white" />
                <div className="text-xs font-bold text-slate-900">
                  {t.timelinePhase1Title}
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  {t.timelinePhase1Desc}
                </div>
                <div className="inline-block mt-1 text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                  ⚠️ {t.timelinePhase1Badge}
                </div>
              </div>

              {/* Phase 2 */}
              <div className="relative pl-8">
                <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-white" />
                <div className="text-xs font-bold text-amber-900">
                  {t.timelinePhase2Title}
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  {t.timelinePhase2Desc}
                </div>
                <div className="inline-block mt-1 text-[10px] font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded">
                  🔥 {t.timelinePhase2Badge}
                </div>
              </div>

              {/* Phase 3 */}
              <div className="relative pl-8">
                <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-white" />
                <div className="text-xs font-bold text-emerald-900">
                  {t.timelinePhase3Title}
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  {t.timelinePhase3Desc}
                </div>
                <div className="inline-block mt-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  🌱 {t.timelinePhase3Badge}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Taproot Simulator */}
        {activeTab === 'simulator' && (
          <TaprootDesiccationSimulator
            panchayat={panchayat}
            language={language}
          />
        )}

        {/* Tab Content 3: Comparison */}
        {activeTab === 'comparison' && (
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs space-y-2.5">
            <div className="text-xs font-bold text-slate-800">
              {t.comparisonTitle}
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2 flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-slate-900">{t.compHyperlocal}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-rose-600 flex items-center gap-1 justify-end">
                    <XCircle className="w-3 h-3" /> {t.compOtherDistOnly}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3 h-3" /> {t.compMgPanchayat}
                  </div>
                </div>
              </div>

              <div className="py-2 flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-slate-900">{t.compFalseOnset}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-rose-600 flex items-center gap-1 justify-end">
                    <XCircle className="w-3 h-3" /> {t.compOtherNotAvail}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3 h-3" /> {t.compMgDedicated}
                  </div>
                </div>
              </div>

              <div className="py-2 flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-slate-900">{t.compBreak}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-rose-600 flex items-center gap-1 justify-end">
                    <XCircle className="w-3 h-3" /> {t.compOtherNotAvail}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3 h-3" /> {t.compMgPredictsBreak}
                  </div>
                </div>
              </div>

              <div className="py-2 flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-slate-900">{t.compAdvisory}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-rose-600 flex items-center gap-1 justify-end">
                    <XCircle className="w-3 h-3" /> {t.compOtherGeneric}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3 h-3" /> {t.compMgCropActions}
                  </div>
                </div>
              </div>

              <div className="py-2 flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-slate-900">{t.compLang}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-rose-600 flex items-center gap-1 justify-end">
                    <XCircle className="w-3 h-3" /> {t.compOtherEngOnly}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3 h-3" /> {t.compMg5Langs}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Primary Action Button to Crop Advisory */}
        <button
          onClick={() => {
            playHapticSound('tap');
            onNavigate('crop-advisory');
          }}
          className={`w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-between shadow-md active:scale-[0.98] transition-all cursor-pointer ${
            showHotspots ? 'ring-4 ring-cyan-400' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>{t.decisionHeader}: {advisoryLabel}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
        </button>
      </div>
    </div>
  );
};
