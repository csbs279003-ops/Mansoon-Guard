import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Radar, 
  Layers, 
  CloudRain, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import { PanchayatData, Language } from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { playHapticSound } from '../../utils/audio';

interface Props {
  panchayats: PanchayatData[];
  selectedPanchayat: PanchayatData;
  onSelectPanchayat: (p: PanchayatData) => void;
  language: Language;
}

export const DownscaledRadarSimulator: React.FC<Props> = ({
  panchayats,
  selectedPanchayat,
  onSelectPanchayat,
  language,
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;
  const [isPlaying, setIsPlaying] = useState(true);
  const [frame, setFrame] = useState(0); // 0 to 5 (e.g. -12h, -6h, Now, +6h, +12h, +24h)

  const timeLabels = ['-12h', '-6h', 'Now (Live)', '+6h', '+12h', '+24h'];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setFrame((prev) => (prev + 1) % timeLabels.length);
      }, 1400);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlay = () => {
    playHapticSound('tap');
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-4 sm:p-5 border border-slate-800 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Radar className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              {t.radarTitle}
            </h3>
            <p className="text-[11px] text-slate-400">
              {t.radarSubtitle}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer shadow-sm active:scale-95 transition-all"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? t.radarPause : t.radarPlay}</span>
          </button>
          <span className="text-xs font-mono bg-slate-800 px-2.5 py-1 rounded-xl text-cyan-300 font-bold">
            {timeLabels[frame]}
          </span>
        </div>
      </div>

      {/* Radar Map Canvas Representation */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#0c141f] rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
        {/* Radar concentric circular distance rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 rounded-full border border-cyan-500/20" />
          <div className="w-64 h-64 rounded-full border border-cyan-500/15" />
          <div className="w-96 h-96 rounded-full border border-cyan-500/10" />
          <div className="absolute w-full h-[1px] bg-cyan-500/10" />
          <div className="absolute h-full w-[1px] bg-cyan-500/10" />
        </div>

        {/* Sweeping radar beam */}
        <div 
          className="absolute inset-0 pointer-events-none origin-center animate-spin"
          style={{ 
            animationDuration: '4s',
            background: 'conic-gradient(from 0deg, rgba(6,182,212,0.18) 0deg, transparent 60deg, transparent 360deg)'
          }}
        />

        {/* Simulated dynamic precipitation radar reflectivity cells based on frame */}
        <div 
          className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-60"
          style={{
            background: frame === 0
              ? 'radial-gradient(ellipse 200px 120px at 40% 45%, rgba(59,130,246,0.5), transparent 70%)'
              : frame === 1
              ? 'radial-gradient(ellipse 260px 140px at 48% 50%, rgba(16,185,129,0.6), rgba(59,130,246,0.3), transparent 70%)'
              : frame === 2
              ? 'radial-gradient(ellipse 280px 160px at 52% 48%, rgba(245,158,11,0.65), rgba(16,185,129,0.5), transparent 70%)'
              : frame === 3
              ? 'radial-gradient(ellipse 200px 100px at 62% 40%, rgba(16,185,129,0.4), transparent 70%)'
              : frame === 4
              ? 'radial-gradient(ellipse 140px 70px at 75% 35%, rgba(59,130,246,0.25), transparent 70%)'
              : 'none' // Dry spell cessation
          }}
        />

        {/* Panchayat spatial node markers */}
        <div className="relative z-10 w-full h-full p-4 grid grid-cols-4 gap-2 items-center justify-items-center">
          {panchayats.map((p) => {
            const isSelected = p.id === selectedPanchayat.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  playHapticSound('tap');
                  onSelectPanchayat(p);
                }}
                className={`p-2 rounded-xl border backdrop-blur-md transition-all flex flex-col items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900/90 border-cyan-400 ring-2 ring-cyan-400/50 scale-105 shadow-lg'
                    : 'bg-slate-950/70 border-slate-700/60 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${
                    p.falseOnsetRisk > 60 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
                  }`} />
                  <span className="text-[11px] font-bold text-white">{p.name}</span>
                </div>
                <div className="text-[9px] text-cyan-300 font-mono mt-0.5">
                  {p.rainfallProbability}% rain · {p.falseOnsetRisk}% false
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Radar Reflectivity Legend & Interpretation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <span>Reflectivity (dBZ):</span>
          <div className="flex items-center gap-1 font-mono text-[9px]">
            <span className="w-4 h-2 bg-blue-500 rounded-xs" /> 10-20 (Drizzle)
            <span className="w-4 h-2 bg-emerald-500 rounded-xs ml-1" /> 20-35 (Moderate)
            <span className="w-4 h-2 bg-amber-500 rounded-xs ml-1" /> 35-50 (Convective Burst)
          </div>
        </div>
        <div className="text-cyan-400 font-medium">
          Source: NASA GPM IMERG + IMD Radar Downscaling
        </div>
      </div>
    </div>
  );
};
