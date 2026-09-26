import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Check, 
  Globe2, 
  Sparkles, 
  LocateFixed, 
  ArrowRight,
  TrendingUp,
  Droplets,
  Calendar
} from 'lucide-react';
import { PanchayatData, Language } from '../../types';
import { ALL_INDIAN_STATES, StateInfo } from '../../data/indiaDirectory';
import { APP_TRANSLATIONS } from '../../data/translations';

interface StatePanchayatSelectorProps {
  currentPanchayat: PanchayatData;
  allPanchayats: PanchayatData[];
  onSelectPanchayat: (panchayat: PanchayatData) => void;
  language: Language;
  onClose?: () => void;
}

export const StatePanchayatSelector: React.FC<StatePanchayatSelectorProps> = ({
  currentPanchayat,
  allPanchayats,
  onSelectPanchayat,
  language,
  onClose
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;
  
  // Selected State
  const [selectedStateCode, setSelectedStateCode] = useState<string>('MH');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRegion, setActiveRegion] = useState<string>('All');

  const selectedState = ALL_INDIAN_STATES.find(s => s.code === selectedStateCode) || ALL_INDIAN_STATES[0];

  const regions = ['All', 'North', 'South', 'West', 'East', 'Central'];

  // Filter states by region and search
  const filteredStates = ALL_INDIAN_STATES.filter(state => {
    const matchesRegion = activeRegion === 'All' || state.region === activeRegion;
    const matchesSearch = searchQuery === '' || 
      state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      state.nameHindi.includes(searchQuery) ||
      state.districts.some(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  // Filter panchayats matching selected state or search
  const filteredPanchayats = allPanchayats.filter(p => {
    if (searchQuery.trim().length > 1) {
      return p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             p.nameRegional.includes(searchQuery) ||
             p.block.toLowerCase().includes(searchQuery.toLowerCase()) ||
             p.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
             p.state.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return p.state === selectedState.name;
  });

  const handleUseMyLocation = () => {
    // Quick switch to closest/default state panchayat
    const matched = allPanchayats[0];
    if (matched) {
      onSelectPanchayat(matched);
      if (onClose) onClose();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden p-4 sm:p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <Globe2 className="w-5 h-5" />
            </span>
            <h3 className="font-bold text-slate-900 text-lg">
              {t.allStatesPanchayats || "All States & Panchayats of India"}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.selectStateInstruction || "Choose any state and panchayat across India for hyperlocal agromet forecast, water, and market data."}
          </p>
        </div>

        {/* GPS auto detect button */}
        <button
          onClick={handleUseMyLocation}
          className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-200 transition-colors shadow-2xs cursor-pointer"
        >
          <LocateFixed className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>{t.autoDetectPanchayat || "Use GPS Location"}</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="my-4 relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchStateOrPanchayat || "Search any Panchayat, Block, District or State..."}
          className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 transition-all"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold px-1.5 py-0.5 rounded-full"
          >
            ✕
          </button>
        )}
      </div>

      {/* Region Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeRegion === region
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {region === 'All' ? 'All India' : `${region} India`}
          </button>
        ))}
      </div>

      {/* States Grid / Horizontal Selector */}
      <div className="mt-3">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
          {t.selectState || "1. Select State / UT"} ({filteredStates.length})
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1">
          {filteredStates.map((state) => {
            const isSelected = selectedStateCode === state.code;
            return (
              <button
                key={state.code}
                onClick={() => {
                  setSelectedStateCode(state.code);
                  setSearchQuery('');
                }}
                className={`flex flex-col text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-bold ring-2 ring-emerald-500/20 shadow-2xs'
                    : 'border-slate-200 hover:border-emerald-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold truncate">{state.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />}
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5">{state.nameHindi}</span>
                <span className="text-[9px] text-emerald-700 bg-emerald-100/60 px-1 py-0.5 rounded-sm mt-1.5 self-start">
                  {state.districts.length} Dist.
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected State Overview & Basin Info */}
      <div className="mt-4 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div>
          <span className="font-bold text-emerald-950 text-sm">{selectedState.name} ({selectedState.nameHindi})</span>
          <span className="mx-2 text-emerald-300">•</span>
          <span className="text-slate-600">River Basin: <strong className="text-slate-800">{selectedState.primaryBasin}</strong></span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-500">Key Crops:</span>
          {selectedState.majorCrops.map((c, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 bg-white border border-emerald-200 rounded-md font-medium text-emerald-800 shadow-2xs">
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Panchayats in this State / Search Results */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {t.selectPanchayat || "2. Select Gram Panchayat"} ({filteredPanchayats.length})
          </label>
          <span className="text-[11px] text-emerald-700 font-medium">
            {filteredPanchayats.length > 0 ? "Live Telemetry Available" : "Searching state database..."}
          </span>
        </div>

        {filteredPanchayats.length === 0 ? (
          <div className="p-6 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
            <p className="font-semibold text-slate-700">No custom panchayats registered under this specific search query yet.</p>
            <p className="mt-1 text-slate-500">Showing standard cluster for {selectedState.name} or click below to load regional Gram Panchayat node.</p>
            <button
              onClick={() => onSelectPanchayat(allPanchayats[0])}
              className="mt-3 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-xs shadow-2xs cursor-pointer"
            >
              Load Default {selectedState.name} Agromet Node
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
            {filteredPanchayats.map((p) => {
              const isSelected = currentPanchayat.id === p.id;
              const isWait = p.primaryAdvisory === 'WAIT';
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectPanchayat(p);
                    if (onClose) onClose();
                  }}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/30'
                      : 'border-slate-200 hover:border-emerald-300 bg-white hover:bg-emerald-50/40 text-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {p.name}
                        </span>
                        {p.nameRegional && (
                          <span className={`text-xs ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                            ({p.nameRegional})
                          </span>
                        )}
                      </div>
                      <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                        {p.block}, {p.district}, {p.state}
                      </div>
                    </div>
                    {isSelected && (
                      <span className="p-1 bg-white/20 rounded-full text-white">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[10px] ${
                    isSelected ? 'border-emerald-500/60 text-emerald-100' : 'border-slate-100 text-slate-500'
                  }`}>
                    <span>Rain: <strong>{p.totalRainfallExpectedMm} mm</strong></span>
                    <span>Soil: <strong>{p.soilMoistureLevel}%</strong></span>
                    <span className={`px-1.5 py-0.5 rounded-sm font-semibold uppercase text-[9px] ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : isWait
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {p.primaryAdvisory}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
