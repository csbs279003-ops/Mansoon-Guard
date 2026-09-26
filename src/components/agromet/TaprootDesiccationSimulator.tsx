import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Flame, 
  Sprout, 
  Droplet, 
  Sun, 
  ShieldCheck, 
  Clock, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { Language, PanchayatData, CropType } from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { playHapticSound } from '../../utils/audio';

interface Props {
  panchayat: PanchayatData;
  language: Language;
}

export const TaprootDesiccationSimulator: React.FC<Props> = ({ panchayat, language }) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;
  const [day, setDay] = useState<number>(6); // Day 0 to 15
  const [activeCrop, setActiveCrop] = useState<CropType>('cotton');

  // Soil dynamics as a function of the day in the dry break spell
  // Day 0 = Pre-monsoon showers (24mm, 24% soil moisture)
  // Day 1-3 = Surface dries under 38°C sun
  // Day 4-10 = Dry spell intensifies, cracks form in black cotton soil, moisture drops to 8%
  // Day 11-15 = Ground temperature hits 44°C, germinated seedlings without roots >15cm scorch and die
  const topMoisture = Math.max(6, Math.round(24 - (day * 1.2)));
  const midMoisture = Math.max(9, Math.round(22 - (day * 0.85)));
  const deepMoisture = Math.max(14, Math.round(19 - (day * 0.3)));
  const soilTemp = Math.min(46, Math.round(32 + (day * 0.95)));

  // Seedling status
  const isPrematureDead = day >= 7;
  const rootDepthCm = Math.min(6, Math.round(1 + (day * 0.5)));

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-4 sm:p-5 border border-slate-800 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">
              {t.taprootSimTitle}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
            {t.taprootSimSubtitle}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-800 px-2.5 py-1 rounded-xl text-xs font-mono text-emerald-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Timeline: Day {day} of {panchayat.breakDurationDays}</span>
        </div>
      </div>

      {/* Interactive Day Slider */}
      <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-400">Progression Slider:</span>
          <span className="text-amber-400 font-mono text-sm">
            Day {day} ({day <= 3 ? 'Early Showers' : day <= 12 ? 'Severe Dry Spell Break' : 'Revival Approaching'})
          </span>
        </div>
        <input
          type="range"
          min="0"
          max={panchayat.breakDurationDays}
          value={day}
          onChange={(e) => {
            playHapticSound('tap');
            setDay(parseInt(e.target.value, 10));
          }}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>Day 0 (Pre-Monsoon Burst)</span>
          <span className="text-rose-400 font-bold">Day 6–8 (Seedling Scorch Peak)</span>
          <span className="text-emerald-400 font-bold">Day {panchayat.breakDurationDays} (True Revival)</span>
        </div>
      </div>

      {/* Cross-section comparison: Premature Sowing vs Waiting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        
        {/* Scenario A: Premature Sowing (During False Onset) */}
        <div className={`p-3.5 rounded-2xl border transition-all ${
          isPrematureDead 
            ? 'bg-rose-950/40 border-rose-800/80 ring-1 ring-rose-500' 
            : 'bg-slate-950 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>{t.prematureSown}</span>
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              isPrematureDead ? 'bg-rose-600 text-white' : 'bg-amber-500/20 text-amber-300'
            }`}>
              {isPrematureDead ? 'GERMINATION FAILED (100% LOSS)' : 'STRESSED SEEDLING'}
            </span>
          </div>

          {/* Graphical Soil cross section */}
          <div className="space-y-1.5 p-2 bg-black/40 rounded-xl border border-white/5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-slate-400">
              <span>0–5cm Topsoil Crust:</span>
              <span className={`font-bold ${topMoisture < 12 ? 'text-rose-400' : 'text-amber-400'}`}>
                {topMoisture}% moisture ({soilTemp}°C)
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${topMoisture < 12 ? 'bg-rose-600' : 'bg-amber-500'}`} 
                style={{ width: `${(topMoisture / 25) * 100}%` }}
              />
            </div>

            <div className="pt-2 text-slate-300 text-[11px] font-sans leading-relaxed">
              {isPrematureDead ? (
                <div className="text-rose-300 font-medium">
                  ❌ <strong>Root Death:</strong> Taproot halted at {rootDepthCm}cm. Topsoil moisture collapsed below permanent wilting point (11%). Seedling dehydrated and desiccated. Farmer forced to buy new seed at ₹3,400/acre.
                </div>
              ) : (
                <div className="text-amber-200">
                  ⚠️ <strong>Extreme Stress:</strong> Young radicle emerging, but rapid moisture depletion will scorch cotyledons within {7 - day} days if rains do not resume.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scenario B: Recommended Monsoon Guard Strategy (WAIT) */}
        <div className="p-3.5 rounded-2xl border bg-emerald-950/40 border-emerald-800/80 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.delayedSown}</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              ZERO LOSS GUARANTEE
            </span>
          </div>

          <div className="p-2 bg-black/40 rounded-xl border border-white/5 font-mono text-[11px] space-y-1.5">
            <div className="flex items-center justify-between text-slate-300">
              <span>Seed State in Storage:</span>
              <span className="text-emerald-400 font-bold">100% Viable (Safe Indoors)</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 text-[10px]">
              <span>Money Saved on Re-Sowing:</span>
              <span className="text-emerald-300 font-bold tabular-nums">
                ₹{panchayat.crops.cotton.seedCostSavedPerAcre}/acre
              </span>
            </div>
            <div className="pt-1 text-emerald-200 text-[11px] font-sans leading-relaxed">
              ✓ <strong>Protected:</strong> Seeds remain dry and unexposed during the {panchayat.breakDurationDays}-day hot break. Sowing on <strong>{panchayat.crops.cotton.recommendedRevivalWindow}</strong> ensures deep soil wetting and 94% emergence.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
