import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  ArrowRight, 
  Play, 
  Layers, 
  Sparkles, 
  ExternalLink, 
  Info 
} from 'lucide-react';
import { PanchayatData, ClimateSignals, ValidationRecord, Language, ScreenId } from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { PanchayatSelectorScreen } from '../mobile/PanchayatSelectorScreen';
import { RiskOutlookScreen } from '../mobile/RiskOutlookScreen';
import { CropAdvisoryScreen } from '../mobile/CropAdvisoryScreen';
import { SmartIrrigationScreen } from '../irrigation/SmartIrrigationScreen';
import { PanchayatRiskMapScreen } from '../mobile/PanchayatRiskMapScreen';
import { DeliveryHubScreen } from '../mobile/DeliveryHubScreen';
import { ValidateLearnScreen } from '../mobile/ValidateLearnScreen';
import { playHapticSound } from '../../utils/audio';

interface Props {
  panchayats: PanchayatData[];
  selectedPanchayat: PanchayatData;
  onSelectPanchayat: (panchayat: PanchayatData) => void;
  climateSignals: ClimateSignals;
  validationRecords: ValidationRecord[];
  onAddValidationRecord: (record: ValidationRecord) => void;
  language: Language;
  onSelectScreenForInteractive: (screen: ScreenId) => void;
}

export const FigmaCanvas: React.FC<Props> = ({
  panchayats,
  selectedPanchayat,
  onSelectPanchayat,
  climateSignals,
  validationRecords,
  onAddValidationRecord,
  language,
  onSelectScreenForInteractive,
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;
  const [zoomLevel, setZoomLevel] = useState<number>(0.75);

  const screensConfig: {
    id: ScreenId;
    title: string;
    badge: string;
    description: string;
    flowStep: string;
  }[] = [
    {
      id: 'panchayat-select',
      title: `01. ${t.tabsLocation}`,
      badge: 'Step 1 & 2',
      description: 'Ingests ENSO, IOD, MJO, SMAP soil moisture, and downscales to Panchayat boundaries.',
      flowStep: 'Entry Trigger → Downscales to Ghatanji Block (8 Panchayats)',
    },
    {
      id: 'risk-outlook',
      title: `02. ${t.tabsOutlook}`,
      badge: 'Step 4 & 5',
      description: 'Calculates Rainfall Prob (82%), False-Onset Risk (68%), and Dry-Spell Break (72%) with confidence.',
      flowStep: 'Passes Probability Matrix to Crop Generator',
    },
    {
      id: 'crop-advisory',
      title: `03. ${t.tabsAdvisory}`,
      badge: 'Step 6',
      description: 'Crop-specific guidance (Bt Cotton, Soybean, Paddy), live APMC market prices, and seed savings calculator.',
      flowStep: 'Action Verdict: WAIT (Avoids 12-day dry break loss)',
    },
    {
      id: 'irrigation-schedule',
      title: `04. ${t.tabsIrrigation || "Smart Irrigation"}`,
      badge: 'Automated Water',
      description: 'Calculates pump running hours (Drip/Sprinkler/Flood) based on rainfall patterns and SMAP soil moisture.',
      flowStep: 'Advises farmers: Turn pump ON or keep pump OFF to save electricity & groundwater',
    },
    {
      id: 'risk-map',
      title: `05. ${t.tabsRiskMap}`,
      badge: 'Spatial Relief',
      description: 'Block officers inspect false-onset heatmap, pre-position seed buffers, and ration water canals.',
      flowStep: 'Block-wide coordination & Agromet broadcast trigger',
    },
    {
      id: 'delivery-hub',
      title: `05. ${t.tabsAlerts}`,
      badge: 'Step 7',
      description: 'Dual-mode delivery in regional languages for both basic 2G phones and smartphones.',
      flowStep: 'Dispatches last-mile push to registered farmers',
    },
    {
      id: 'validate-learn',
      title: `06. ${t.tabsLearn}`,
      badge: 'Step 8 (Retrain)',
      description: 'Compares forecast vs ground truth rain gauge, recalibrates feature weights every season.',
      flowStep: 'Loops actual rainfall back to Step 2 for continuous retraining',
    },
  ];

  return (
    <div className="w-full min-h-[920px] bg-[#1e1e1e] text-white p-6 relative overflow-x-auto select-none">
      {/* Background Dot Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Floating Canvas Controls */}
      <div className="sticky left-6 top-6 z-40 flex items-center gap-3 bg-[#2c2c2c]/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-xl max-w-fit">
        <div className="flex items-center gap-2 pr-3 border-r border-white/10 text-xs font-semibold text-slate-300">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>{t.viewWorkflow}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoomLevel(Math.max(0.4, zoomLevel - 0.1))}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-xs cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-mono w-12 text-center text-slate-300">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel(Math.min(1.2, zoomLevel + 0.1))}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-xs cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(0.75)}
            className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-[11px] font-medium text-slate-300 ml-1 cursor-pointer"
          >
            Fit
          </button>
        </div>

        <div className="pl-3 border-l border-white/10 text-[11px] text-cyan-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Prototype Flow</span>
        </div>
      </div>

      {/* Artboards Layout Container with Zoom scaling */}
      <div 
        className="mt-6 flex items-start gap-12 transition-transform duration-200 origin-top-left pb-16"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {screensConfig.map((sc, index) => {
          return (
            <div key={sc.id} className="relative flex-shrink-0 group">
              {/* Artboard Header */}
              <div className="flex items-center justify-between mb-3 px-1 text-slate-300">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white tracking-wide">
                      {sc.title}
                    </span>
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 px-2 py-0.5 rounded font-mono font-bold">
                      {sc.badge}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 max-w-[380px]">
                    {sc.description}
                  </div>
                </div>

                <button
                  onClick={() => {
                    playHapticSound('tap');
                    onSelectScreenForInteractive(sc.id);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-transform active:scale-95"
                >
                  <Play className="w-3 h-3 fill-slate-950" />
                  <span>Test</span>
                </button>
              </div>

              {/* Mobile Screen Artboard Frame */}
              <div className="w-[390px] h-[844px] bg-slate-50 rounded-[36px] overflow-hidden shadow-2xl border-2 border-white/20 relative ring-4 ring-black/40">
                <div className="w-full h-full overflow-y-auto scrollbar-none">
                  {sc.id === 'panchayat-select' && (
                    <PanchayatSelectorScreen
                      panchayats={panchayats}
                      selectedPanchayat={selectedPanchayat}
                      onSelectPanchayat={onSelectPanchayat}
                      climateSignals={climateSignals}
                      language={language}
                      onNavigate={onSelectScreenForInteractive}
                      showHotspots={true}
                    />
                  )}
                  {sc.id === 'risk-outlook' && (
                    <RiskOutlookScreen
                      panchayat={selectedPanchayat}
                      language={language}
                      onNavigate={onSelectScreenForInteractive}
                      showHotspots={true}
                    />
                  )}
                  {sc.id === 'crop-advisory' && (
                    <CropAdvisoryScreen
                      panchayat={selectedPanchayat}
                      language={language}
                      onNavigate={onSelectScreenForInteractive}
                      showHotspots={true}
                    />
                  )}
                  {sc.id === 'irrigation-schedule' && (
                    <div className="p-3 bg-slate-50 min-h-full">
                      <SmartIrrigationScreen
                        panchayat={selectedPanchayat}
                        language={language}
                      />
                    </div>
                  )}
                  {sc.id === 'risk-map' && (
                    <PanchayatRiskMapScreen
                      panchayats={panchayats}
                      selectedPanchayat={selectedPanchayat}
                      onSelectPanchayat={onSelectPanchayat}
                      language={language}
                      onNavigate={onSelectScreenForInteractive}
                      showHotspots={true}
                    />
                  )}
                  {sc.id === 'delivery-hub' && (
                    <DeliveryHubScreen
                      panchayat={selectedPanchayat}
                      language={language}
                      onNavigate={onSelectScreenForInteractive}
                      showHotspots={true}
                    />
                  )}
                  {sc.id === 'validate-learn' && (
                    <ValidateLearnScreen
                      panchayat={selectedPanchayat}
                      validationRecords={validationRecords}
                      onAddValidationRecord={onAddValidationRecord}
                      language={language}
                      onNavigate={onSelectScreenForInteractive}
                      showHotspots={true}
                    />
                  )}
                </div>
              </div>

              {/* Connecting Prototype Wire Noodle to the Next Artboard */}
              {index < screensConfig.length - 1 && (
                <div className="absolute -right-12 top-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center">
                  <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rotate-45" />
                    <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                  </div>
                </div>
              )}

              {/* Wire description label */}
              <div className="mt-3 bg-[#2a2a2a] p-2.5 rounded-xl border border-white/10 text-xs text-slate-300 max-w-[390px]">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-0.5">
                  Prototype Interaction Hook
                </span>
                {sc.flowStep}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
