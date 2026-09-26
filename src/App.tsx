import React, { useState, useEffect } from 'react';
import { 
  PanchayatData, 
  ClimateSignals, 
  ValidationRecord, 
  Language, 
  UserRole, 
  ScreenId, 
  FarmerUser 
} from './types';
import { 
  PANCHAYATS_DATA, 
  CURRENT_CLIMATE_SIGNALS, 
  INITIAL_VALIDATION_RECORDS,
  DEFAULT_FARMER_USER 
} from './data/mockData';
import { AppHeader } from './components/common/AppHeader';
import { MobileNavigation } from './components/mobile/MobileNavigation';
import { DesktopCommandCenter } from './components/desktop/DesktopCommandCenter';
import { PanchayatSelectorScreen } from './components/mobile/PanchayatSelectorScreen';
import { RiskOutlookScreen } from './components/mobile/RiskOutlookScreen';
import { CropAdvisoryScreen } from './components/mobile/CropAdvisoryScreen';
import { SmartIrrigationScreen } from './components/irrigation/SmartIrrigationScreen';
import { RiverWaterAdvisoryScreen } from './components/river/RiverWaterAdvisoryScreen';
import { PanchayatRiskMapScreen } from './components/mobile/PanchayatRiskMapScreen';
import { DeliveryHubScreen } from './components/mobile/DeliveryHubScreen';
import { PublicBroadcastHubScreen } from './components/broadcast/PublicBroadcastHubScreen';
import { PanchayatOfficeScreen } from './components/panchayat/PanchayatOfficeScreen';
import { ValidateLearnScreen } from './components/mobile/ValidateLearnScreen';
import { FarmerAuthModal } from './components/auth/FarmerAuthModal';
import { LandingSignInPage } from './components/landing/LandingSignInPage';

export default function App() {
  const [panchayats, setPanchayats] = useState<PanchayatData[]>(PANCHAYATS_DATA);
  const [selectedPanchayat, setSelectedPanchayat] = useState<PanchayatData>(PANCHAYATS_DATA[0]);
  const [climateSignals, setClimateSignals] = useState<ClimateSignals>(CURRENT_CLIMATE_SIGNALS);
  const [validationRecords, setValidationRecords] = useState<ValidationRecord[]>(INITIAL_VALIDATION_RECORDS);
  
  // Farmer Auth State
  const [currentUser, setCurrentUser] = useState<FarmerUser | null>(DEFAULT_FARMER_USER);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Auto-detect Device Screen Size (Mobile vs Desktop)
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Primary User-Facing Views: 'landing-signin' or 'dashboard'
  const [currentView, setCurrentView] = useState<'landing-signin' | 'dashboard'>('landing-signin');
  const [language, setLanguage] = useState<Language>('en');
  const [userRole, setUserRole] = useState<UserRole>('farmer');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('crop-advisory');

  const handleAddValidationRecord = (record: ValidationRecord) => {
    setValidationRecords((prev) => [record, ...prev]);
  };

  const handleOpenLocationSelector = () => {
    setCurrentView('dashboard');
    setCurrentScreen('panchayat-select');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Clean User-Friendly Header */}
      <AppHeader
        currentView={currentView}
        onSelectView={setCurrentView}
        selectedPanchayat={selectedPanchayat}
        onOpenLocationSelector={handleOpenLocationSelector}
        language={language}
        onSelectLanguage={setLanguage}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        isMobile={isMobileScreen}
      />

      {/* Main Dynamic Workspace Area */}
      <main className="flex-1 flex flex-col relative overflow-x-hidden">
        
        {/* ================= VIEW 1: WELCOME & ONBOARDING PORTAL ================= */}
        {currentView === 'landing-signin' && (
          <LandingSignInPage
            currentUser={currentUser}
            onSaveUser={(user) => {
              setCurrentUser(user);
              if (user) {
                const matched = panchayats.find(p => p.name.toLowerCase() === user.panchayatName.toLowerCase()) || panchayats[0];
                setSelectedPanchayat(matched);
              }
            }}
            onEnterApp={() => {
              setCurrentView('dashboard');
            }}
            language={language}
            onSelectLanguage={setLanguage}
            selectedPanchayat={selectedPanchayat}
            onSelectPanchayat={setSelectedPanchayat}
            allPanchayats={panchayats}
          />
        )}

        {/* ================= VIEW 2: AUTO-ADAPTIVE AGROMET DASHBOARD ================= */}
        {/* Automatically runs in mobile format on mobile, or desktop format on PC/desktop */}
        {currentView === 'dashboard' && (
          isMobileScreen ? (
            /* Native Edge-to-Edge Mobile Layout */
            <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 min-h-screen relative pb-20 max-w-lg mx-auto w-full shadow-2xl">
              {currentScreen === 'crop-advisory' && (
                <CropAdvisoryScreen
                  panchayat={selectedPanchayat}
                  language={language}
                  onNavigate={setCurrentScreen}
                  showHotspots={false}
                />
              )}
              {currentScreen === 'irrigation-schedule' && (
                <div className="p-3 bg-slate-50 min-h-full">
                  <SmartIrrigationScreen
                    panchayat={selectedPanchayat}
                    language={language}
                  />
                </div>
              )}
              {currentScreen === 'risk-outlook' && (
                <RiskOutlookScreen
                  panchayat={selectedPanchayat}
                  language={language}
                  onNavigate={setCurrentScreen}
                  showHotspots={false}
                />
              )}
              {currentScreen === 'river-water' && (
                <RiverWaterAdvisoryScreen
                  panchayat={selectedPanchayat}
                  language={language}
                  onNavigate={setCurrentScreen}
                  showHotspots={false}
                />
              )}
              {currentScreen === 'panchayat-select' && (
                <PanchayatSelectorScreen
                  panchayats={panchayats}
                  selectedPanchayat={selectedPanchayat}
                  onSelectPanchayat={setSelectedPanchayat}
                  climateSignals={climateSignals}
                  language={language}
                  onNavigate={setCurrentScreen}
                  showHotspots={false}
                />
              )}
              {currentScreen === 'panchayat-office' && (
                <PanchayatOfficeScreen
                  panchayat={selectedPanchayat}
                  language={language}
                  onNavigate={setCurrentScreen}
                  showHotspots={false}
                />
              )}
              {currentScreen === 'delivery-hub' && (
                <DeliveryHubScreen
                  panchayat={selectedPanchayat}
                  language={language}
                  onNavigate={setCurrentScreen}
                  showHotspots={false}
                />
              )}
              {currentScreen === 'risk-map' && (
                <PanchayatRiskMapScreen
                  panchayats={panchayats}
                  selectedPanchayat={selectedPanchayat}
                  onSelectPanchayat={setSelectedPanchayat}
                  language={language}
                  onNavigate={setCurrentScreen}
                  showHotspots={false}
                />
              )}
              {currentScreen === 'public-broadcast' && (
                <PublicBroadcastHubScreen
                  panchayat={selectedPanchayat}
                  language={language}
                  onNavigate={setCurrentScreen}
                  showHotspots={false}
                />
              )}
              {currentScreen === 'validate-learn' && (
                <ValidateLearnScreen
                  panchayat={selectedPanchayat}
                  validationRecords={validationRecords}
                  onAddValidationRecord={handleAddValidationRecord}
                  language={language}
                  onNavigate={setCurrentScreen}
                  showHotspots={false}
                />
              )}

              {/* User-Friendly Mobile Bottom Navigation (Ordered by Priority) */}
              <MobileNavigation
                currentScreen={currentScreen}
                onNavigate={setCurrentScreen}
                language={language}
              />
            </div>
          ) : (
            /* Responsive Command Center for PC / Desktop */
            <div className="flex-1 bg-slate-100 dark:bg-slate-950 py-4 transition-colors">
              <DesktopCommandCenter
                panchayats={panchayats}
                selectedPanchayat={selectedPanchayat}
                onSelectPanchayat={setSelectedPanchayat}
                climateSignals={climateSignals}
                validationRecords={validationRecords}
                onAddValidationRecord={handleAddValidationRecord}
                language={language}
                userRole={userRole}
                onSelectRole={setUserRole}
              />
            </div>
          )
        )}
      </main>

      {/* Farmer Authentication & Profile Modal */}
      <FarmerAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onSaveUser={(user) => {
          setCurrentUser(user);
          if (user) {
            const matched = panchayats.find(p => p.name.toLowerCase() === user.panchayatName.toLowerCase()) || panchayats[0];
            setSelectedPanchayat(matched);
          }
        }}
        language={language}
      />
    </div>
  );
}
