import React, { useState } from 'react';
import { 
  Map, 
  Layers, 
  Droplet, 
  Warehouse, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  Maximize2,
  ChevronRight,
  ShieldAlert,
  Radar
} from 'lucide-react';
import { PanchayatData, Language, ScreenId } from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { playHapticSound } from '../../utils/audio';
import { DownscaledRadarSimulator } from '../agromet/DownscaledRadarSimulator';

interface Props {
  panchayats: PanchayatData[];
  selectedPanchayat: PanchayatData;
  onSelectPanchayat: (panchayat: PanchayatData) => void;
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  showHotspots: boolean;
}

export const PanchayatRiskMapScreen: React.FC<Props> = ({
  panchayats,
  selectedPanchayat,
  onSelectPanchayat,
  language,
  onNavigate,
  showHotspots,
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;
  const [mapLayer, setMapLayer] = useState<'false-onset' | 'dry-spell' | 'rainfall' | 'radar'>('false-onset');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const getPanchayatColor = (p: PanchayatData) => {
    if (mapLayer === 'false-onset') {
      if (p.falseOnsetRisk >= 65) return { bg: 'fill-rose-500', stroke: 'stroke-rose-600', text: 'text-rose-600' };
      if (p.falseOnsetRisk >= 45) return { bg: 'fill-amber-400', stroke: 'stroke-amber-500', text: 'text-amber-600' };
      return { bg: 'fill-emerald-400', stroke: 'stroke-emerald-500', text: 'text-emerald-600' };
    }
    if (mapLayer === 'dry-spell') {
      if (p.drySpellRisk >= 65) return { bg: 'fill-orange-500', stroke: 'stroke-orange-600', text: 'text-orange-600' };
      if (p.drySpellRisk >= 40) return { bg: 'fill-amber-400', stroke: 'stroke-amber-500', text: 'text-amber-600' };
      return { bg: 'fill-blue-400', stroke: 'stroke-blue-500', text: 'text-blue-600' };
    }
    // rainfall
    if (p.rainfallProbability >= 75) return { bg: 'fill-blue-600', stroke: 'stroke-blue-700', text: 'text-blue-600' };
    if (p.rainfallProbability >= 50) return { bg: 'fill-cyan-400', stroke: 'stroke-cyan-500', text: 'text-cyan-600' };
    return { bg: 'fill-slate-300', stroke: 'stroke-slate-400', text: 'text-slate-500' };
  };

  const handleBroadcast = () => {
    playHapticSound('success');
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 5000);
  };

  return (
    <div className="flex flex-col min-h-full pb-20 bg-slate-50 text-slate-900 select-none">
      {/* Top Header */}
      <div className="bg-slate-900 text-white px-5 pt-4 pb-5 rounded-b-3xl shadow-sm relative">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
            {t.badgeSystem}
          </span>
          <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300 font-bold">
            {panchayatDataOrRegion(language)}
          </span>
        </div>

        <h1 className="text-lg font-bold tracking-tight text-white flex items-center justify-between">
          <span>{t.riskMapTitle}</span>
          <span className="text-xs font-mono text-emerald-400">8 Sectors</span>
        </h1>
        <p className="text-xs text-slate-300 mt-0.5">
          {t.riskMapSubtitle}
        </p>
      </div>

      {/* Main Body */}
      <div className="p-4 space-y-4">
        {/* Layer Selector */}
        <div className="flex items-center justify-between bg-white p-1 rounded-xl border border-slate-200 shadow-xs text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setMapLayer('false-onset')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer whitespace-nowrap ${
              mapLayer === 'false-onset'
                ? 'bg-rose-50 text-rose-800 font-bold border border-rose-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.falseOnsetRisk}
          </button>
          <button
            onClick={() => setMapLayer('dry-spell')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer whitespace-nowrap ${
              mapLayer === 'dry-spell'
                ? 'bg-orange-50 text-orange-800 font-bold border border-orange-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.drySpellRisk}
          </button>
          <button
            onClick={() => setMapLayer('rainfall')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer whitespace-nowrap ${
              mapLayer === 'rainfall'
                ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.rainfallProbability}
          </button>
          <button
            onClick={() => setMapLayer('radar')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 ${
              mapLayer === 'radar'
                ? 'bg-cyan-600 text-slate-950 font-bold shadow-xs'
                : 'text-cyan-700 hover:text-cyan-900'
            }`}
          >
            <Radar className="w-3.5 h-3.5" />
            <span>Radar Doppler</span>
          </button>
        </div>

        {/* Dynamic Display: Radar Doppler or Interactive Spatial Cadastre */}
        {mapLayer === 'radar' ? (
          <DownscaledRadarSimulator
            panchayats={panchayats}
            selectedPanchayat={selectedPanchayat}
            onSelectPanchayat={onSelectPanchayat}
            language={language}
          />
        ) : (
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                <Map className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.spatialCadastre}</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">20.13°N · 78.31°E</span>
            </div>

            {/* Grid Layout of Panchayats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative z-10">
              {panchayats.map((p) => {
                const isSelected = p.id === selectedPanchayat.id;
                const metricValue = 
                  mapLayer === 'false-onset' 
                    ? `${p.falseOnsetRisk}%` 
                    : mapLayer === 'dry-spell' 
                    ? `${p.drySpellRisk}%` 
                    : `${p.rainfallProbability}%`;

                const displayName = language === 'mr' ? p.nameRegional : p.name;
                const advisoryLabel = p.primaryAdvisory === 'WAIT' ? t.advisoryWait : p.primaryAdvisory === 'SOW' ? t.advisorySow : t.advisoryProtect;

                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      playHapticSound('tap');
                      onSelectPanchayat(p);
                    }}
                    className={`relative p-2.5 rounded-xl transition-all flex flex-col justify-between text-left border cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800 border-white ring-2 ring-emerald-400 scale-[1.02] z-20 shadow-lg'
                        : 'bg-slate-900/90 border-slate-700/80 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[11px] font-bold text-white truncate">
                        {displayName}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${
                        p.falseOnsetRisk > 60 ? 'bg-rose-500 animate-pulse' : p.falseOnsetRisk > 40 ? 'bg-amber-400' : 'bg-emerald-400'
                      }`} />
                    </div>

                    <div className="mt-1">
                      <div className="text-[9px] text-slate-400 uppercase">
                        {mapLayer === 'false-onset' ? t.falseOnsetRisk : mapLayer === 'dry-spell' ? t.drySpellRisk : t.rainfallProbability}
                      </div>
                      <div className="text-base font-black text-white tabular-nums">
                        {metricValue}
                      </div>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-[9px] pt-1 border-t border-slate-800">
                      <span className={`font-bold ${
                        p.primaryAdvisory === 'WAIT' ? 'text-amber-400' : p.primaryAdvisory === 'SOW' ? 'text-emerald-400' : 'text-blue-400'
                      }`}>
                        {advisoryLabel}
                      </span>
                      <span className="text-slate-400">{p.soilMoistureLevel}% moist</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> {t.highRiskWait}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> {t.moderateRisk}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> {t.safeToSow}
              </span>
            </div>
          </div>
        )}

        {/* Selected Panchayat Buffer & Relief Planning Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">
                {t.primaryVerdict}
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {selectedPanchayat.name} ({selectedPanchayat.nameRegional})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.falseOnsetRisk}: <strong className="text-amber-700">{selectedPanchayat.falseOnsetRisk}%</strong> · {t.drySpellRisk}: <strong>{selectedPanchayat.drySpellRisk}%</strong> · Break: <strong>{selectedPanchayat.breakDurationDays} days</strong>
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
              {selectedPanchayat.primaryAdvisory === 'WAIT' ? t.advisoryWait : selectedPanchayat.primaryAdvisory === 'SOW' ? t.advisorySow : t.advisoryProtect}
            </span>
          </div>

          {/* Officer Relief Buffer Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold">
                <Warehouse className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.seedReserveBuffer}</span>
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1 tabular-nums">
                140 Quintals
              </div>
              <div className="text-[10px] text-slate-400">Pre-positioned in local godown</div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold">
                <Droplet className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.canalWaterRelease}</span>
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1 tabular-nums">
                Ration for Day 8
              </div>
              <div className="text-[10px] text-slate-400">Conserved for revival phase</div>
            </div>
          </div>

          {/* Mass Broadcast Trigger Button */}
          <button
            onClick={handleBroadcast}
            disabled={broadcastSent}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              broadcastSent
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
            }`}
          >
            {broadcastSent ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.broadcastSuccess}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-emerald-400" />
                <span>{t.broadcastAlert} ({selectedPanchayat.name})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

function panchayatDataOrRegion(lang: Language) {
  if (lang === 'mr') return 'घाटंजी तालुका नकाशा';
  if (lang === 'hi') return 'घाटनजी ब्लॉक मानचित्र';
  if (lang === 'te') return 'ఘటాంజి ప్రాంత పటం';
  if (lang === 'ta') return 'கட்டஞ்சி வட்டார வரைபடம்';
  return 'Ghatanji Block Map';
}
