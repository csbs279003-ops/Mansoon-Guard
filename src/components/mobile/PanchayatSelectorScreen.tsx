import React, { useState } from 'react';
import { 
  CloudSun, 
  ChevronRight, 
  Radio, 
  Compass, 
  Droplet, 
  MapPin, 
  Layers, 
  Sparkles,
  Info,
  Globe2,
  Droplets
} from 'lucide-react';
import { PanchayatData, ClimateSignals, Language, ScreenId } from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { playHapticSound } from '../../utils/audio';
import { StatePanchayatSelector } from '../panchayat/StatePanchayatSelector';

interface Props {
  panchayats: PanchayatData[];
  selectedPanchayat: PanchayatData;
  onSelectPanchayat: (panchayat: PanchayatData) => void;
  climateSignals: ClimateSignals;
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  showHotspots: boolean;
}

export const PanchayatSelectorScreen: React.FC<Props> = ({
  panchayats,
  selectedPanchayat,
  onSelectPanchayat,
  climateSignals,
  language,
  onNavigate,
  showHotspots,
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;
  const [showAllStatesModal, setShowAllStatesModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col min-h-full pb-20 bg-slate-50 text-slate-900 select-none">
      {/* Top Header */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white px-5 pt-4 pb-6 rounded-b-3xl shadow-sm relative overflow-hidden">
        {/* Subtle background radar pattern */}
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-emerald-700/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-4 top-4 opacity-10">
          <Radio className="w-24 h-24" />
        </div>

        <div className="flex items-center justify-between text-xs text-emerald-200 mb-2">
          <span className="flex items-center gap-1.5 font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            {t.badgeSystem}
          </span>
          <span className="text-[11px] opacity-90 font-mono">
            {t.allIndiaCoverage || "All India 28 States"}
          </span>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-white mb-1">
          {t.appTitle}
        </h1>
        <p className="text-xs text-emerald-100/90 leading-relaxed max-w-[320px]">
          {t.tagline}
        </p>

        {/* Location selector trigger - open All States & Panchayats of India modal */}
        <div 
          onClick={() => {
            playHapticSound('tap');
            setShowAllStatesModal(true);
          }}
          className="mt-4 bg-emerald-800/80 hover:bg-emerald-700/90 transition-colors backdrop-blur-md rounded-2xl p-3 border border-emerald-700/50 flex items-center justify-between cursor-pointer group shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600/50 flex items-center justify-center text-emerald-300 group-hover:scale-105 transition-transform">
              <MapPin className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <div className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1">
                <span>{selectedPanchayat.state} · {selectedPanchayat.district}</span>
              </div>
              <div className="text-xs font-bold text-white flex items-center gap-1">
                <span>{selectedPanchayat.name} ({selectedPanchayat.nameRegional})</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] bg-emerald-600/90 px-2 py-0.5 rounded-full text-white font-bold flex items-center gap-1">
              <Globe2 className="w-3 h-3" />
              <span>Change State</span>
            </span>
            <ChevronRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Modal / Overlay for All States & Panchayats Selector */}
      {showAllStatesModal && (
        <div className="p-4 bg-slate-900/50 backdrop-blur-xs border-b border-emerald-500/20">
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setShowAllStatesModal(false)}
              className="text-xs px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-800 rounded-lg font-bold shadow-xs cursor-pointer"
            >
              ✕ Close State Selector
            </button>
          </div>
          <StatePanchayatSelector
            currentPanchayat={selectedPanchayat}
            allPanchayats={panchayats}
            onSelectPanchayat={(p) => {
              onSelectPanchayat(p);
              setShowAllStatesModal(false);
            }}
            language={language}
            onClose={() => setShowAllStatesModal(false)}
          />
        </div>
      )}

      {/* Main Content Body */}
      <div className="p-4 space-y-4">
        {/* Quick Nav Shortcut to Smart Automated Irrigation */}
        <div 
          onClick={() => {
            playHapticSound('tap');
            onNavigate('irrigation-schedule');
          }}
          className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-2xl p-3.5 shadow-sm cursor-pointer flex items-center justify-between group active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <Droplets className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-teal-100 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{t.irrigationTitle || "Smart Automated Irrigation"}</span>
              </div>
              <div className="text-xs font-bold text-white mt-0.5">
                {selectedPanchayat.irrigationSchedule?.irrigationDecision === 'SKIP_RAIN_APPROACHING' 
                  ? "Rain predicted - Keep pump OFF today!" 
                  : "Check today's water pump running time"}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Climate Signals Live Ingestion Bar */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Climate Indices Ingestion</span>
            </div>
            <span className="text-[10px] text-slate-400">NOAA · NASA · IMD</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <div className="text-[10px] text-slate-400 font-medium">ENSO</div>
              <div className="text-xs font-bold text-slate-800 tabular-nums">
                {climateSignals.enso.anomaly}
              </div>
              <div className="text-[9px] text-emerald-600 font-medium">Neutral</div>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <div className="text-[10px] text-slate-400 font-medium">IOD</div>
              <div className="text-xs font-bold text-slate-800 tabular-nums">
                {climateSignals.iod.index}
              </div>
              <div className="text-[9px] text-blue-600 font-medium">Positive</div>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <div className="text-[10px] text-slate-400 font-medium">MJO</div>
              <div className="text-xs font-bold text-slate-800 tabular-nums">
                Phase {climateSignals.mjo.phase}
              </div>
              <div className="text-[9px] text-amber-600 font-medium">Favorable</div>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Droplet className="w-3 h-3 text-cyan-600" />
              {t.soilMoisture}: <strong className="text-slate-700">{climateSignals.soilMoistureSMAP.volumetricPercent}%</strong> ({t.soilDeficit})
            </span>
            <span className="text-[10px] text-slate-400">GPM: 14.8mm</span>
          </div>
        </div>

        {/* Panchayat Selection Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.selectPanchayat}
            </h2>
            <button
              onClick={() => setShowAllStatesModal(true)}
              className="text-[11px] text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All India ({panchayats.length})</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {panchayats.slice(0, 8).map((p) => {
              const isSelected = p.id === selectedPanchayat.id;
              const isWait = p.primaryAdvisory === 'WAIT';
              const isSow = p.primaryAdvisory === 'SOW';

              const displayName = language === 'mr' ? p.nameRegional : p.name;
              const advisoryLabel = isWait ? t.advisoryWait : isSow ? t.advisorySow : t.advisoryProtect;

              return (
                <button
                  key={p.id}
                  onClick={() => {
                    playHapticSound('tap');
                    onSelectPanchayat(p);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-150 flex items-center justify-between relative group cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-600 shadow-xs ring-1 ring-emerald-500'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
                  } ${showHotspots ? 'ring-2 ring-cyan-400' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isSow
                          ? 'bg-emerald-100 text-emerald-800'
                          : isWait
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      {advisoryLabel}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          {displayName}
                        </span>
                        {language !== 'mr' && (
                          <span className="text-xs text-slate-400 font-medium">
                            ({p.nameRegional})
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 font-medium">
                          • {p.state}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span>{t.rainfallProbability}: <strong className="text-slate-700">{p.rainfallProbability}%</strong></span>
                        <span>·</span>
                        <span className={p.falseOnsetRisk > 60 ? 'text-amber-700 font-medium' : 'text-slate-600'}>
                          {t.falseOnsetRisk}: <strong>{p.falseOnsetRisk}%</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        isSow
                          ? 'bg-emerald-100 text-emerald-800'
                          : isWait
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {advisoryLabel}
                    </span>
                    <ChevronRight className={`w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform ${isSelected ? 'text-emerald-700' : ''}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Panchayat Quick Snapshot Card */}
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {selectedPanchayat.name} ({selectedPanchayat.nameRegional}) · {selectedPanchayat.state}
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                {t.timelineTitle}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                {t.rainfallProbability}: <strong>{selectedPanchayat.rainfallProbability}%</strong> · {t.falseOnsetRisk}: <strong className="text-amber-300">{selectedPanchayat.falseOnsetRisk}%</strong> · {t.drySpellRisk}: <strong className="text-amber-300">{selectedPanchayat.drySpellRisk}%</strong>
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-amber-500/20 border border-amber-400/30 flex flex-col items-center justify-center text-center p-1">
              <span className="text-[9px] text-amber-300 uppercase font-bold">{t.tabsAdvisory}</span>
              <span className="text-xs font-black text-amber-300 tracking-wider">
                {selectedPanchayat.primaryAdvisory === 'WAIT' ? t.advisoryWait : selectedPanchayat.primaryAdvisory === 'SOW' ? t.advisorySow : t.advisoryProtect}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={() => {
                playHapticSound('tap');
                onNavigate('risk-outlook');
              }}
              className={`py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all cursor-pointer ${
                showHotspots ? 'ring-4 ring-cyan-400 animate-pulse' : ''
              }`}
            >
              <span>{t.tabsOutlook} (7–30 Days)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playHapticSound('tap');
                onNavigate('irrigation-schedule');
              }}
              className="py-2.5 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all cursor-pointer"
            >
              <Droplets className="w-4 h-4" />
              <span>{t.tabsIrrigation || "Smart Irrigation"}</span>
            </button>
          </div>
        </div>

        {/* Agromet Intelligence Info Callout */}
        <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong>{t.whyWait}:</strong> {t.compOtherApps} only show rainfall ({selectedPanchayat.rainfallProbability}%), but Monsoon Guard alerts farmers that this rain is followed by a <strong>{selectedPanchayat.breakDurationDays}-day dry spell</strong>, saving seeds and preventing re-sowing loss.
          </p>
        </div>
      </div>
    </div>
  );
};
