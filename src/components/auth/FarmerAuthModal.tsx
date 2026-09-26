import React, { useState } from 'react';
import { 
  X, 
  User, 
  Phone, 
  MapPin, 
  Sprout, 
  Droplet, 
  CheckCircle2, 
  Sparkles, 
  LogOut, 
  Layers, 
  ShieldCheck,
  Smartphone,
  KeyRound,
  ArrowRight
} from 'lucide-react';
import { FarmerUser, CropType, Language } from '../../types';
import { ALL_INDIAN_STATES } from '../../data/indiaDirectory';
import { APP_TRANSLATIONS } from '../../data/translations';
import { playHapticSound } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUser: FarmerUser | null;
  onSaveUser: (user: FarmerUser | null) => void;
  language: Language;
}

export const FarmerAuthModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentUser,
  onSaveUser,
  language,
}) => {
  const t = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.en;
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');

  // Form fields
  const [name, setName] = useState(currentUser?.name || 'Rameshwar Patil');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98234 56789');
  const [pin, setPin] = useState('1234');
  const [selectedState, setSelectedState] = useState(currentUser?.state || 'Maharashtra');
  const [district, setDistrict] = useState(currentUser?.district || 'Yavatmal');
  const [block, setBlock] = useState(currentUser?.block || 'Ghatanji');
  const [panchayatName, setPanchayatName] = useState(currentUser?.panchayatName || 'Tiwsala');
  const [farmSize, setFarmSize] = useState<number>(currentUser?.farmSizeAcres || 4);
  const [primaryCrop, setPrimaryCrop] = useState<CropType>(currentUser?.primaryCrop || 'cotton');
  const [soilType, setSoilType] = useState<FarmerUser['soilType']>(currentUser?.soilType || 'black_cotton');
  const [irrigationMethod, setIrrigationMethod] = useState<FarmerUser['irrigationMethod']>(currentUser?.irrigationMethod || 'drip');
  
  const [otpSent, setOtpSent] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  if (!isOpen) return null;

  const handleQuickDemoLogin = () => {
    playHapticSound('success');
    const demoUser: FarmerUser = {
      id: 'farmer-demo-01',
      name: 'Rameshwar Patil',
      phone: '+91 98234 56789',
      state: 'Maharashtra',
      district: 'Yavatmal',
      block: 'Ghatanji',
      panchayatId: 'tiwsala',
      panchayatName: 'Tiwsala',
      farmSizeAcres: 4,
      primaryCrop: 'cotton',
      soilType: 'black_cotton',
      irrigationMethod: 'drip',
      isLoggedIn: true,
      avatarSeed: 'rameshwar',
    };
    onSaveUser(demoUser);
    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      onClose();
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playHapticSound('success');
    const updatedUser: FarmerUser = {
      id: currentUser?.id || `farmer-${Date.now()}`,
      name,
      phone,
      state: selectedState,
      district,
      block,
      panchayatId: panchayatName.toLowerCase().replace(/\s+/g, '-'),
      panchayatName,
      farmSizeAcres: farmSize,
      primaryCrop,
      soilType,
      irrigationMethod,
      isLoggedIn: true,
      avatarSeed: name.toLowerCase().replace(/\s+/g, ''),
    };
    onSaveUser(updatedUser);
    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      onClose();
    }, 1200);
  };

  const handleLogout = () => {
    playHapticSound('tap');
    onSaveUser(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative space-y-4 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {currentUser?.isLoggedIn ? t.myFarmProfile : authMode === 'signin' ? t.farmerLoginTitle : t.farmerRegisterTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalized agromet alerts & water suggestions for your land
            </p>
          </div>
        </div>

        {/* If Already Logged In: Show Profile Summary & Edit */}
        {currentUser?.isLoggedIn ? (
          <div className="space-y-4">
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  {currentUser.name[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {currentUser.name}
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {currentUser.phone}
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                ACTIVE PROFILE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                <span className="text-[10px] text-slate-400 block uppercase">Location</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {currentUser.panchayatName}, {currentUser.district}
                </span>
                <span className="text-[10px] text-slate-400 block">{currentUser.state}</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                <span className="text-[10px] text-slate-400 block uppercase">Farm Details</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {currentUser.farmSizeAcres} Acres ({currentUser.primaryCrop})
                </span>
                <span className="text-[10px] text-slate-400 block uppercase">
                  {currentUser.irrigationMethod} irrigation
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 rounded-xl border border-rose-300 dark:border-rose-900 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                {t.logout}
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Tab Switcher: Sign In vs Register */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  authMode === 'signin'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t.signIn}
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  authMode === 'register'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t.register}
              </button>
            </div>

            {/* Quick Demo Login Pill for Instant Testing */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-500/30 rounded-2xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-amber-900 dark:text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Want to test immediately?</span>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="px-3 py-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                {t.guestDemoLogin}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Farmer Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rameshwar Tukaram Patil"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mobile Number (+91)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98234 56789"
                    className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      playHapticSound('tap');
                      setOtpSent(true);
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer shrink-0"
                  >
                    {otpSent ? 'OTP Sent ✓' : 'Send OTP'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  4-Digit Security PIN / OTP
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono tracking-widest text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              {authMode === 'register' && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        State
                      </label>
                      <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      >
                        {ALL_INDIAN_STATES.map((s) => (
                          <option key={s.code} value={s.name}>
                            {s.name} ({s.nameHindi})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Panchayat / Village
                      </label>
                      <input
                        type="text"
                        value={panchayatName}
                        onChange={(e) => setPanchayatName(e.target.value)}
                        placeholder="e.g. Tiwsala"
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {t.farmSizeAcresLabel}
                      </label>
                      <input
                        type="number"
                        min={0.5}
                        max={100}
                        step={0.5}
                        value={farmSize}
                        onChange={(e) => setFarmSize(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {t.primaryCropLabel}
                      </label>
                      <select
                        value={primaryCrop}
                        onChange={(e) => setPrimaryCrop(e.target.value as CropType)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      >
                        <option value="cotton">Cotton (कापूस)</option>
                        <option value="soybean">Soybean (सोयाबीन)</option>
                        <option value="paddy">Paddy / Rice (भात)</option>
                        <option value="millets">Millets / Bajra (बाजरी)</option>
                        <option value="pulses">Pulses / Tur (तूर)</option>
                        <option value="groundnut">Groundnut (भुईमूग)</option>
                        <option value="wheat">Wheat (गहू)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {t.irrigationMethodLabel}
                      </label>
                      <select
                        value={irrigationMethod}
                        onChange={(e) => setIrrigationMethod(e.target.value as any)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      >
                        <option value="drip">Drip Irrigation (ठिबक)</option>
                        <option value="sprinkler">Sprinkler (तुषार)</option>
                        <option value="canal_flood">Canal Flow (कालवा)</option>
                        <option value="borewell_flood">Borewell Motor (बोअरवेल)</option>
                        <option value="rainfed">Rainfed Only (जिरायती)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {t.soilTypeLabel}
                      </label>
                      <select
                        value={soilType}
                        onChange={(e) => setSoilType(e.target.value as any)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      >
                        <option value="black_cotton">Black Cotton (काळी माती)</option>
                        <option value="alluvial">Alluvial / Loam (गाळाची माती)</option>
                        <option value="red_loamy">Red Loamy (तांबडी माती)</option>
                        <option value="sandy_loam">Sandy Loam (वाळुसर)</option>
                        <option value="clay">Clay Soil (चिकणमाती)</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-600/20 mt-4"
              >
                <span>{authMode === 'signin' ? t.signIn : t.register}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Success Toast */}
        {successToast && (
          <div className="absolute bottom-4 left-6 right-6 p-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            Profile Saved Successfully!
          </div>
        )}
      </div>
    </div>
  );
};
