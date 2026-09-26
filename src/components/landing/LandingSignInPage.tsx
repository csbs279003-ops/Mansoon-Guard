import React, { useState } from 'react';
import { 
  Sprout, 
  Droplets, 
  MapPin, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Phone, 
  User, 
  Compass, 
  TrendingUp, 
  Waves, 
  IndianRupee, 
  Globe2, 
  LogIn, 
  UserPlus, 
  Eye, 
  Calendar,
  CloudRain,
  Clock,
  Check
} from 'lucide-react';
import { 
  FarmerUser, 
  Language, 
  PanchayatData, 
  CropType 
} from '../../types';
import { APP_TRANSLATIONS } from '../../data/translations';
import { ALL_INDIAN_STATES } from '../../data/indiaDirectory';
import { 
  AGRI_HERO_IMAGES, 
  CROP_REFERENCE_IMAGES, 
  IRRIGATION_REFERENCE_IMAGES, 
  HYDROLOGY_REFERENCE_IMAGES, 
  MARKET_REFERENCE_IMAGES,
  DESICCATION_REFERENCE_IMAGES 
} from '../../data/agriImages';
import { playHapticSound } from '../../utils/audio';

interface Props {
  currentUser: FarmerUser | null;
  onSaveUser: (user: FarmerUser | null) => void;
  onEnterApp: () => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  selectedPanchayat: PanchayatData;
  onSelectPanchayat: (p: PanchayatData) => void;
  allPanchayats: PanchayatData[];
}

export const LandingSignInPage: React.FC<Props> = ({
  currentUser,
  onSaveUser,
  onEnterApp,
  language,
  onSelectLanguage,
  selectedPanchayat,
  onSelectPanchayat,
  allPanchayats,
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;

  const [authTab, setAuthTab] = useState<'signin' | 'register' | 'guest'>('signin');
  const [mobileNumber, setMobileNumber] = useState<string>('9823456789');
  const [pinCode, setPinCode] = useState<string>('1234');
  
  // Registration Form State
  const [regName, setRegName] = useState<string>('Ganesh Deshmukh');
  const [regPhone, setRegPhone] = useState<string>('9876543210');
  const [regState, setRegState] = useState<string>('Maharashtra');
  const [regDistrict, setRegDistrict] = useState<string>('Yavatmal');
  const [regBlock, setRegBlock] = useState<string>('Ghatanji');
  const [regPanchayat, setRegPanchayat] = useState<string>('Sayat');
  const [regAcres, setRegAcres] = useState<number>(5);
  const [regCrop, setRegCrop] = useState<CropType>('cotton');
  const [regSoil, setRegSoil] = useState<'black_cotton' | 'alluvial' | 'red_loamy' | 'sandy_loam' | 'clay'>('black_cotton');
  const [regIrrigation, setRegIrrigation] = useState<'drip' | 'sprinkler' | 'canal_flood' | 'borewell_flood' | 'rainfed'>('drip');

  const [loginSuccessToast, setLoginSuccessToast] = useState<boolean>(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    playHapticSound('success');
    const matchedPanchayat = allPanchayats.find(p => p.state.toLowerCase() === regState.toLowerCase()) || allPanchayats[0];
    
    const user: FarmerUser = {
      id: `usr-${Date.now()}`,
      name: mobileNumber === '9823456789' ? 'Ramesh Patil' : 'Registered Farmer',
      phone: mobileNumber,
      state: matchedPanchayat.state,
      district: matchedPanchayat.district,
      block: matchedPanchayat.block,
      panchayatId: matchedPanchayat.id,
      panchayatName: matchedPanchayat.name,
      farmSizeAcres: 4,
      primaryCrop: 'cotton',
      soilType: 'black_cotton',
      irrigationMethod: 'drip',
      isLoggedIn: true,
    };
    onSaveUser(user);
    onSelectPanchayat(matchedPanchayat);
    setLoginSuccessToast(true);
    setTimeout(() => {
      onEnterApp();
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    playHapticSound('success');
    const matchedPanchayat = allPanchayats.find(p => p.state.toLowerCase() === regState.toLowerCase()) || allPanchayats[0];

    const newUser: FarmerUser = {
      id: `usr-${Date.now()}`,
      name: regName,
      phone: regPhone,
      state: regState,
      district: regDistrict,
      block: regBlock,
      panchayatId: matchedPanchayat.id,
      panchayatName: regPanchayat || matchedPanchayat.name,
      farmSizeAcres: regAcres,
      primaryCrop: regCrop,
      soilType: regSoil,
      irrigationMethod: regIrrigation,
      isLoggedIn: true,
    };
    onSaveUser(newUser);
    onSelectPanchayat(matchedPanchayat);
    setLoginSuccessToast(true);
    setTimeout(() => {
      onEnterApp();
    }, 800);
  };

  const handleDemoLogin = () => {
    playHapticSound('success');
    const matchedPanchayat = allPanchayats[0];
    const demoUser: FarmerUser = {
      id: 'demo-farmer-01',
      name: 'Ramesh Patil',
      phone: '9823456789',
      state: 'Maharashtra',
      district: 'Yavatmal',
      block: 'Ghatanji',
      panchayatId: matchedPanchayat.id,
      panchayatName: 'Sayat',
      farmSizeAcres: 4,
      primaryCrop: 'cotton',
      soilType: 'black_cotton',
      irrigationMethod: 'drip',
      isLoggedIn: true,
    };
    onSaveUser(demoUser);
    onSelectPanchayat(matchedPanchayat);
    setLoginSuccessToast(true);
    setTimeout(() => {
      onEnterApp();
    }, 700);
  };

  return (
    <div className="min-h-full bg-slate-950 text-slate-100 flex flex-col font-sans select-none pb-20">
      
      {/* Top Banner Navigation */}
      <div className="bg-slate-900/90 backdrop-blur-md border-b border-emerald-900/40 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-black text-slate-950 text-base shadow-lg shadow-emerald-500/20">
            MG
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base sm:text-lg tracking-tight text-white">{t.appTitle}</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded-full font-mono font-bold">
                {t.badgeSystem}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {t.allIndiaCoverage || "All India 28 States & UTs Hyperlocal Agromet Intelligence"}
            </p>
          </div>
        </div>

        {/* Language selector & Enter App Button */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-slate-800/90 rounded-xl p-1 border border-slate-700/80 text-xs">
            {(['en', 'hi', 'mr', 'te', 'ta'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  playHapticSound('tap');
                  onSelectLanguage(lang);
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  language === lang
                    ? 'bg-emerald-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिन्दी' : lang === 'mr' ? 'मराठी' : lang === 'te' ? 'తెలుగు' : 'தமிழ்'}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              playHapticSound('tap');
              onEnterApp();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>{currentUser ? "Go to Dashboard" : "Enter App"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Hero & Sign-In Section */}
      <div className="relative overflow-hidden pt-8 pb-12 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        
        {/* Glow ambient background elements */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Dignified Hero & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>Initial Agromet Portal · 28 States & 700+ Districts</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Hyperlocal Sowing & Smart Irrigation for Every Indian Farmer.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Generic weather apps only tell you rain chance (60%). They don't warn you that it's followed by a <strong>12-day dry spell</strong> that burns seeds. Monsoon Guard models deep root desiccation, automates daily pump hours, and guarantees maximum harvest profit.
            </p>

            {/* Reference Image Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl group max-w-2xl">
              <img 
                src={AGRI_HERO_IMAGES.farmerPortrait} 
                alt="Indian Farmer in Field" 
                className="w-full h-56 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Real Indian Agromet Telemetry (NOAA · NASA · IMD · SMAP)</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-white">
                  Protecting Bt Cotton, Soybean, Paddy & Oilseed Investments
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Over ₹6,500/acre in re-sowing seed costs saved per farmer during false-onset spells.
                </div>
              </div>
            </div>

            {/* Live Stats Pill Banner */}
            <div className="grid grid-cols-3 gap-3 max-w-2xl pt-2">
              <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-center">
                <div className="text-xl sm:text-2xl font-black text-emerald-400">28 States</div>
                <div className="text-[11px] text-slate-400 mt-0.5">All India Coverage</div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-center">
                <div className="text-xl sm:text-2xl font-black text-amber-400">100% 0-Loss</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Re-sowing Prevention</div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-center">
                <div className="text-xl sm:text-2xl font-black text-teal-400">5 Languages</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Voice Audio Readout</div>
              </div>
            </div>

          </div>

          {/* Right Column: Sign In & Onboarding Card (Initial of All) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-emerald-500/30 p-5 sm:p-7 shadow-2xl shadow-emerald-950/50 relative overflow-hidden">
              
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                    <User className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {currentUser ? "Farmer Account Active" : "Farmer Portal Sign In"}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {currentUser ? "Personalized recommendations ready" : "Sign in or register your agricultural plot"}
                    </p>
                  </div>
                </div>

                {currentUser && (
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Logged In</span>
                  </span>
                )}
              </div>

              {/* Already Logged In Card State */}
              {currentUser ? (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Active Farmer</span>
                      <span className="text-xs text-slate-400 font-mono">{currentUser.phone}</span>
                    </div>
                    <div className="text-xl font-black text-white">{currentUser.name}</div>
                    <div className="text-xs text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{currentUser.panchayatName} Gram Panchayat, {currentUser.district}, {currentUser.state}</span>
                    </div>
                    <div className="pt-2 border-t border-emerald-800/40 flex items-center justify-between text-xs text-emerald-200">
                      <span>Plot: <strong>{currentUser.farmSizeAcres} Acres</strong></span>
                      <span>Crop: <strong className="capitalize">{currentUser.primaryCrop}</strong></span>
                      <span>Irrigation: <strong className="capitalize">{currentUser.irrigationMethod}</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playHapticSound('tap');
                      onEnterApp();
                    }}
                    className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer"
                  >
                    <span>Proceed to Full Agromet Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => {
                        playHapticSound('tap');
                        onSaveUser(null);
                      }}
                      className="text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      Sign Out / Switch Profile
                    </button>
                    <button
                      onClick={() => {
                        playHapticSound('tap');
                        onEnterApp();
                      }}
                      className="text-xs text-emerald-400 hover:underline font-bold cursor-pointer"
                    >
                      Change Gram Panchayat →
                    </button>
                  </div>
                </div>
              ) : (
                /* Not Logged In: Sign In / Register / Guest Tabs */
                <div className="space-y-4">
                  {/* Subtabs */}
                  <div className="flex bg-slate-800/80 p-1 rounded-2xl border border-slate-700/80 text-xs font-bold">
                    <button
                      onClick={() => setAuthTab('signin')}
                      className={`flex-1 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        authTab === 'signin' ? 'bg-emerald-500 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Quick Sign In</span>
                    </button>
                    <button
                      onClick={() => setAuthTab('register')}
                      className={`flex-1 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        authTab === 'register' ? 'bg-emerald-500 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>New Farmer</span>
                    </button>
                    <button
                      onClick={() => setAuthTab('guest')}
                      className={`flex-1 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        authTab === 'guest' ? 'bg-emerald-500 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Guest</span>
                    </button>
                  </div>

                  {/* TAB 1: QUICK SIGN IN */}
                  {authTab === 'signin' && (
                    <form onSubmit={handleSignIn} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">
                          Registered Mobile Number
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                          <input
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder="e.g. 9823456789"
                            required
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-hidden focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">
                          4-Digit Security PIN or OTP
                        </label>
                        <input
                          type="password"
                          value={pinCode}
                          onChange={(e) => setPinCode(e.target.value)}
                          placeholder="••••"
                          maxLength={4}
                          required
                          className="w-full px-3 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-hidden focus:border-emerald-500 tracking-widest text-center font-mono font-bold"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl shadow-md active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Sign In to My Farm</span>
                      </button>

                      {/* 1-Click Test Demo Login button */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleDemoLogin}
                          className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-750 border border-emerald-500/40 text-emerald-300 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>1-Click Test: Ramesh Patil (4 Acres Cotton · Sayat)</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* TAB 2: NEW FARMER REGISTRATION */}
                  {authTab === 'register' && (
                    <form onSubmit={handleRegister} className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="e.g. Ganesh Deshmukh"
                          required
                          className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Mobile Phone</label>
                          <input
                            type="tel"
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                            placeholder="10-digit phone"
                            required
                            className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Farm Acres</label>
                          <input
                            type="number"
                            value={regAcres}
                            onChange={(e) => setRegAcres(Number(e.target.value))}
                            min={1}
                            max={100}
                            required
                            className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">State</label>
                        <select
                          value={regState}
                          onChange={(e) => setRegState(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white"
                        >
                          {ALL_INDIAN_STATES.map(s => (
                            <option key={s.code} value={s.name}>{s.name} ({s.nameHindi})</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">District</label>
                          <input
                            type="text"
                            value={regDistrict}
                            onChange={(e) => setRegDistrict(e.target.value)}
                            placeholder="District"
                            className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Gram Panchayat</label>
                          <input
                            type="text"
                            value={regPanchayat}
                            onChange={(e) => setRegPanchayat(e.target.value)}
                            placeholder="Panchayat Name"
                            className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Primary Crop</label>
                          <select
                            value={regCrop}
                            onChange={(e) => setRegCrop(e.target.value as CropType)}
                            className="w-full px-2.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white"
                          >
                            <option value="cotton">Bt Cotton</option>
                            <option value="soybean">Soybean</option>
                            <option value="paddy">Paddy / Rice</option>
                            <option value="groundnut">Groundnut</option>
                            <option value="pulses">Red Gram (Tur)</option>
                            <option value="wheat">Wheat</option>
                            <option value="mustard">Mustard</option>
                            <option value="sugarcane">Sugarcane</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Irrigation Method</label>
                          <select
                            value={regIrrigation}
                            onChange={(e) => setRegIrrigation(e.target.value as any)}
                            className="w-full px-2.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white"
                          >
                            <option value="drip">Drip Irrigation</option>
                            <option value="sprinkler">Sprinkler</option>
                            <option value="canal_flood">Canal Flood</option>
                            <option value="borewell_flood">Borewell Flood</option>
                            <option value="rainfed">Rainfed (Dryland)</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer mt-1"
                      >
                        Register & Launch Farm Advisory
                      </button>
                    </form>
                  )}

                  {/* TAB 3: GUEST EXPLORER */}
                  {authTab === 'guest' && (
                    <div className="space-y-3 p-3 bg-slate-800/60 rounded-2xl border border-slate-700 text-center">
                      <Compass className="w-8 h-8 text-emerald-400 mx-auto" />
                      <h4 className="text-sm font-bold text-white">Explore All-India as Guest</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Access all 28 states, radar simulators, crop desiccation models, and automated irrigation schedules without logging in.
                      </p>
                      <button
                        onClick={() => {
                          playHapticSound('tap');
                          onEnterApp();
                        }}
                        className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
                      >
                        <span>Enter All-India Explorer</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                </div>
              )}

              {/* Login Toast Notification */}
              {loginSuccessToast && (
                <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fadeIn z-30">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mb-3">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Sign In Successful!</h4>
                  <p className="text-xs text-emerald-300 mt-1">Loading localized Agromet telemetry & farm data...</p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Visual Reference Showcase: Core 5 Pillars with Decent Reference Images */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 w-full">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Visual Reference & Telemetry Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Understanding What Protects Your Farm
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Clear visual photographic references for soil moisture, crops, irrigation equipment, and market channels.
          </p>
        </div>

        {/* 4-Card Pillar Grid with Photographic References */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Pillar 1: Taproot Desiccation Sowing Advisory */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-lg group hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="h-44 overflow-hidden relative">
                <img 
                  src={DESICCATION_REFERENCE_IMAGES.dryCracks.url} 
                  alt="Dry Soil Cracks" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                  Sowing Alert: WAIT
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-emerald-400" />
                  <span>Sowing Decision Engine</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Couples IMD 10-day rainfall forecasts with SMAP root-zone soil moisture to prevent sowing before false-onset dry spells.
                </p>
              </div>
            </div>
            <div className="p-4 pt-0">
              <div className="p-2.5 bg-slate-800/80 rounded-xl text-[11px] text-amber-300 font-semibold border border-amber-500/20">
                Saves up to ₹7,200/acre in Bt Cotton & Soybean re-sowing seed loss.
              </div>
            </div>
          </div>

          {/* Pillar 2: Smart Automated Irrigation */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-lg group hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="h-44 overflow-hidden relative">
                <img 
                  src={IRRIGATION_REFERENCE_IMAGES.drip.url} 
                  alt="Drip Irrigation Line" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-teal-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                  Pump Schedule
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-teal-400" />
                  <span>Smart Automated Irrigation</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Tells you exactly whether to run your pump today or keep it off. Computes runtime in minutes for Drip, Sprinkler, and Borewell.
                </p>
              </div>
            </div>
            <div className="p-4 pt-0">
              <div className="p-2.5 bg-slate-800/80 rounded-xl text-[11px] text-teal-300 font-semibold border border-teal-500/20">
                Saves 180+ kWh power and preserves critical groundwater table.
              </div>
            </div>
          </div>

          {/* Pillar 3: River Water, Canal & Hydrology */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-lg group hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="h-44 overflow-hidden relative">
                <img 
                  src={HYDROLOGY_REFERENCE_IMAGES.riverCanal.url} 
                  alt="Canal Water Discharge" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-blue-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                  Basin Gauge
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-1.5">
                  <Waves className="w-4 h-4 text-blue-400" />
                  <span>River & Canal Hydrology</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Monitors upstream reservoir storage, canal discharge rates (cusecs), and ranks crops best suited for present hydrological reserves.
                </p>
              </div>
            </div>
            <div className="p-4 pt-0">
              <div className="p-2.5 bg-slate-800/80 rounded-xl text-[11px] text-blue-300 font-semibold border border-blue-500/20">
                Matches crops to real water supply: Godavari, Krishna, Ganga & Cauvery.
              </div>
            </div>
          </div>

          {/* Pillar 4: APMC Mandi & Profit Predictor */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-lg group hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="h-44 overflow-hidden relative">
                <img 
                  src={MARKET_REFERENCE_IMAGES.mandiAuction.url} 
                  alt="APMC Market Harvest" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                  Mandi Rates
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-amber-400" />
                  <span>APMC Market Prices & Profit</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Real-time modal market prices compared against Govt MSP with estimated yield, input expenses, and net profit per acre.
                </p>
              </div>
            </div>
            <div className="p-4 pt-0">
              <div className="p-2.5 bg-slate-800/80 rounded-xl text-[11px] text-emerald-300 font-semibold border border-emerald-500/20">
                Helps plan sowing according to peak arrival months and e-NAM trends.
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Crop Reference Gallery with Decent Photos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Field Crop Directory
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Supported Crops with Photographic Reference
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select any crop inside the app to load tailored agromet moisture thresholds and MSP returns.
            </p>
          </div>

          <button
            onClick={() => {
              playHapticSound('tap');
              onEnterApp();
            }}
            className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-xl cursor-pointer"
          >
            <span>Explore All in Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {Object.entries(CROP_REFERENCE_IMAGES).map(([key, item]) => (
            <div 
              key={key} 
              onClick={() => {
                playHapticSound('tap');
                onEnterApp();
              }}
              className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 hover:shadow-lg transition-all cursor-pointer group flex flex-col"
            >
              <div className="h-28 overflow-hidden relative">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <span className="absolute bottom-1 right-1 bg-slate-950/80 text-emerald-300 text-[9px] font-mono px-1.5 py-0.5 rounded">
                  {key}
                </span>
              </div>
              <div className="p-2.5 flex-1 flex flex-col justify-between">
                <div className="text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-300 transition-colors">
                  {item.title.split('(')[0]}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  {item.tag || "Kharif Crop"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 mt-6 w-full">
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Ready to safeguard your harvest?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80">
              Access live radar feeds, dry-spell timers, and pump automation across all 28 Indian States.
            </p>
          </div>
          <button
            onClick={() => {
              playHapticSound('tap');
              onEnterApp();
            }}
            className="px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm rounded-2xl shadow-lg active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            Launch Monsoon Guard
          </button>
        </div>
      </div>

    </div>
  );
};
