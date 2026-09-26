import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Code, 
  Palette, 
  BookOpen, 
  Check, 
  Copy, 
  Database,
  ExternalLink
} from 'lucide-react';
import { PanchayatData, ClimateSignals } from '../../types';
import { playHapticSound } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedPanchayat: PanchayatData;
  climateSignals: ClimateSignals;
}

export const FigmaInspectPanel: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedPanchayat,
  climateSignals,
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'api' | 'tokens'>('architecture');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonPayload = {
    panchayat_id: selectedPanchayat.id,
    panchayat_name: selectedPanchayat.name,
    block: selectedPanchayat.block,
    district: selectedPanchayat.district,
    state: selectedPanchayat.state,
    coordinates: {
      latitude: selectedPanchayat.lat,
      longitude: selectedPanchayat.lng,
    },
    forecast_horizon_days: '7-30',
    probabilistic_outlook: {
      rainfall_probability: selectedPanchayat.rainfallProbability,
      false_onset_risk: selectedPanchayat.falseOnsetRisk,
      dry_spell_break_risk: selectedPanchayat.drySpellRisk,
      forecast_confidence: selectedPanchayat.forecastConfidence,
      expected_rainfall_mm: selectedPanchayat.totalRainfallExpectedMm,
      break_duration_days: selectedPanchayat.breakDurationDays,
    },
    primary_advisory: selectedPanchayat.primaryAdvisory,
    crop_verdict: {
      cotton: selectedPanchayat.crops.cotton.decision,
      soybean: selectedPanchayat.crops.soybean.decision,
      paddy: selectedPanchayat.crops.paddy.decision,
      groundnut: selectedPanchayat.crops.groundnut.decision,
    },
    climate_indices_fused: {
      enso: climateSignals.enso,
      iod: climateSignals.iod,
      mjo_phase: climateSignals.mjo.phase,
      soil_moisture_smap_deficit_mm: climateSignals.soilMoistureSMAP.deficitMm,
    },
    model_calibration: {
      rmse_mm: 11.4,
      f1_event_score: 0.864,
      ece_reliability: 0.038,
    },
  };

  const handleCopyJson = () => {
    playHapticSound('success');
    navigator.clipboard.writeText(JSON.stringify(jsonPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="fixed top-12 right-0 bottom-0 w-full sm:w-[480px] bg-[#1a1a1a] text-slate-200 border-l border-white/10 shadow-2xl z-50 flex flex-col select-none overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#242424]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <h2 className="text-sm font-bold text-white tracking-wide">
            Agromet System Architecture & Specs
          </h2>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-[#141414] border-b border-white/10 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`flex-1 py-2 rounded-lg text-center cursor-pointer transition-colors ${
            activeTab === 'architecture' ? 'bg-[#2a2a2a] text-cyan-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          System Pipeline
        </button>
        <button
          onClick={() => setActiveTab('api')}
          className={`flex-1 py-2 rounded-lg text-center cursor-pointer transition-colors ${
            activeTab === 'api' ? 'bg-[#2a2a2a] text-cyan-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          API JSON Schema
        </button>
        <button
          onClick={() => setActiveTab('tokens')}
          className={`flex-1 py-2 rounded-lg text-center cursor-pointer transition-colors ${
            activeTab === 'tokens' ? 'bg-[#2a2a2a] text-cyan-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Design Tokens
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin">
        {activeTab === 'architecture' && (
          <div className="space-y-4">
            {/* Core Overview */}
            <div className="bg-[#242424] p-3.5 rounded-2xl border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-cyan-400 font-bold">
                <span>Monsoon Guard Core Engine</span>
                <span className="text-[10px] bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">Production Ready</span>
              </div>
              <p className="text-white font-semibold">Hyperlocal Monsoon Onset & Break Intelligence</p>
              <p className="text-slate-400 text-[11px]">
                Fuses oceanic-atmospheric teleconnections (ENSO, IOD, MJO) with satellite soil moisture (SMAP) and downscaled rainfall to guide panchayat-level farm decisions.
              </p>
            </div>

            {/* Proposed Solution */}
            <div className="bg-[#242424] p-3.5 rounded-2xl border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>Core Probabilistic Engine</span>
                <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">Verified</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg font-mono text-[11px] text-amber-300">
                OUTPUT: Panchayat probabilistic outlook → Risk Heatmap → Crop Action<br/>
                PREDICTION: Rain 82% • False 68% • Dry 72% • Verdict: WAIT
              </div>
              <ul className="list-disc pl-4 text-slate-300 text-[11px] space-y-1">
                <li>Downscales to Block/Panchayat using hybrid ML + time-series model</li>
                <li>Predicts onset, false onset, break, and revival over 7–30 days</li>
                <li>Reaches farmers via mobile web, 2G SMS and WhatsApp in local language</li>
              </ul>
            </div>

            {/* Technical Pipeline */}
            <div className="bg-[#242424] p-3.5 rounded-2xl border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between text-blue-400 font-bold">
                <span>8-Step Technical Architecture</span>
                <span className="text-[10px] bg-blue-950 px-2 py-0.5 rounded border border-blue-800">Pipeline</span>
              </div>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <p><strong>1. Collect Data:</strong> ENSO, IOD, MJO, GPM, SMAP, IMD</p>
                <p><strong>2. Build Features:</strong> Temporal + spatial downscaled weather features</p>
                <p><strong>3. Predict Rainfall:</strong> Hybrid ML (Target RMSE &lt; 15mm, achieved 11.4mm)</p>
                <p><strong>4. Detect Events:</strong> Onset, false onset, break (F1 &gt; 0.80, achieved 0.864)</p>
                <p><strong>5. Risk Scores:</strong> ECE &lt; 0.05 probability calibration</p>
                <p><strong>6. Crop Advice:</strong> Sow / Wait / Protect tailored to seed sensitivity</p>
                <p><strong>7. Push Alerts:</strong> SMS, WhatsApp, regional audio synthesis</p>
                <p><strong>8. Validate & Learn:</strong> Continuous ground truth retrains weights</p>
              </div>
            </div>

            {/* Research & Satellite Citations */}
            <div className="bg-[#242424] p-3.5 rounded-2xl border border-white/5 space-y-1.5">
              <div className="text-indigo-400 font-bold">
                Data & Research Grounding
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-300">
                <div className="p-1.5 bg-black/40 rounded">IMD GKMS (mausam.imd.gov.in)</div>
                <div className="p-1.5 bg-black/40 rounded">NASA GPM IMERG</div>
                <div className="p-1.5 bg-black/40 rounded">NASA SMAP Soil Moisture</div>
                <div className="p-1.5 bg-black/40 rounded">UCSB CHIRPS Rainfall</div>
                <div className="p-1.5 bg-black/40 rounded">ECMWF ERA5 Reanalysis</div>
                <div className="p-1.5 bg-black/40 rounded">ISRO Bhuvan / MOSDAC</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                GET /api/v1/panchayat/{selectedPanchayat.id}/forecast
              </span>
              <button
                onClick={handleCopyJson}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[11px] text-white cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
              </button>
            </div>

            <pre className="p-3 bg-[#0d0d0d] rounded-2xl border border-white/5 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
              {JSON.stringify(jsonPayload, null, 2)}
            </pre>
          </div>
        )}

        {activeTab === 'tokens' && (
          <div className="space-y-3 text-xs">
            <div className="bg-[#242424] p-3 rounded-2xl border border-white/5 space-y-2">
              <div className="font-bold text-white">Semantic Color Palette</div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-amber-500" />
                    <span>False-Onset Warning (WAIT)</span>
                  </span>
                  <span className="font-mono text-slate-400">#F59E0B</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-emerald-600" />
                    <span>True Monsoon (SOW)</span>
                  </span>
                  <span className="font-mono text-slate-400">#059669</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-blue-600" />
                    <span>Moisture Defense (PROTECT)</span>
                  </span>
                  <span className="font-mono text-slate-400">#2563EB</span>
                </div>
              </div>
            </div>

            <div className="bg-[#242424] p-3 rounded-2xl border border-white/5 space-y-1">
              <div className="font-bold text-white">Typography & Accessibility</div>
              <p className="text-[11px] text-slate-300">
                • Display / Headline: Plus Jakarta Sans (Clean Title-Case)<br/>
                • Tabular Numerics: Font Monospace Tabular-Nums (82%, 68%, 72%)<br/>
                • Touch targets: Minimum 44px × 44px for outdoor field use<br/>
                • Audio Speech Synthesis: Multi-dialect Indian accents
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
