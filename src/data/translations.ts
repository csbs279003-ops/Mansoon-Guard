import { Language, CropType } from '../types';

export interface AppTranslation {
  appTitle: string;
  tagline: string;
  badgeSystem: string;
  focusBlock: string;
  allIndiaCoverage?: string;
  primaryVerdict: string;
  selectPanchayat: string;
  selectCrop: string;
  confidence: string;
  viewWorkflow: string;
  viewPhoneFrame: string;
  viewAllDevices: string;
  hotspotsToggle: string;
  restart: string;
  specs: string;
  advisorySow: string;
  advisoryWait: string;
  advisoryProtect: string;
  whyWait: string;
  whySow: string;
  whyProtect: string;
  seedCostAvoided: string;
  acres: string;
  recommendedSowingWindow: string;
  currentSoilMoisture: string;
  soilDeficit: string;
  checklistTitle: string;
  checkItem1: string;
  checkItem2: string;
  checkItem3: string;
  shareWhatsApp: string;
  copyShareText: string;
  copied: string;
  simulateDelivery: string;
  listenAdvisory: string;
  stopAudio: string;
  playingAudio: string;
  rainfallProbability: string;
  falseOnsetRisk: string;
  drySpellRisk: string;
  timelineTitle: string;
  timelineSubtitle: string;
  timelinePhase1Title: string;
  timelinePhase1Desc: string;
  timelinePhase1Badge: string;
  timelinePhase2Title: string;
  timelinePhase2Desc: string;
  timelinePhase2Badge: string;
  timelinePhase3Title: string;
  timelinePhase3Desc: string;
  timelinePhase3Badge: string;
  compOtherApps: string;
  compMonsoonGuard: string;
  economicBenefit: string;
  farmSize: string;
  riskMapTitle: string;
  riskMapSubtitle: string;
  spatialCadastre: string;
  tabsLocation: string;
  tabsOutlook: string;
  tabsAdvisory: string;
  tabsIrrigation: string;
  tabsRiverWater: string;
  tabsRiskMap: string;
  tabsAlerts: string;
  tabsPublicBroadcast: string;
  tabsOffice: string;
  tabsLearn: string;
  validateLearnTitle: string;
  validateLearnSubtitle: string;
  logGroundTruth: string;
  submitGroundReading: string;
  measuredRainMm: string;
  didDryBreakFollow: string;
  yesDryBreak: string;
  noRainsContinued: string;
  observerNotes: string;
  submitAndRetrain: string;
  cancel: string;
  mobileNumber: string;
  pushAlert: string;
  alertSentSuccess: string;
  decisionHeader: string;
  // Delivery hub
  deliveryHubTitle?: string;
  deliveryHubSubtitle?: string;
  dispatchToPhone?: string;
  // Risk Map & Relief
  highRiskWait?: string;
  moderateRisk?: string;
  safeToSow?: string;
  seedReserveBuffer?: string;
  canalWaterRelease?: string;
  broadcastSuccess?: string;
  broadcastAlert?: string;
  // Risk outlook & comparison
  soilMoisture?: string;
  forecastConfidence?: string;
  comparisonTitle?: string;
  compHyperlocal?: string;
  compOtherDistOnly?: string;
  compMgPanchayat?: string;
  compFalseOnset?: string;
  compOtherNotAvail?: string;
  compMgDedicated?: string;
  compBreak?: string;
  compMgPredictsBreak?: string;
  compAdvisory?: string;
  compOtherGeneric?: string;
  compMgCropActions?: string;
  compLang?: string;
  compOtherEngOnly?: string;
  compMg5Langs?: string;
  // Validate & Retrain
  calibrateStatus?: string;
  modelEvalBenchmark?: string;
  groundTruthLogs?: string;
  predicted?: string;
  actualGauge?: string;
  // Office additions
  officeStatusFieldVisit?: string;
  workingHours?: string;
  helpdeskHelpline?: string;
  latestNotice?: string;
  // River & plant additions
  estReturn?: string;
  whyThisPlant?: string;
  highlyRecommended?: string;
  suitableWithIrrigation?: string;
  avoidDeficit?: string;
  realAlertsTitle?: string;
  realAlertsSubtitle?: string;
  copyAlertText?: string;
  communityRadioStation?: string;
  // Smart Irrigation additions
  shouldIRunPumpToday?: string;
  pumpDecisionYes?: string;
  pumpDecisionNo?: string;
  dripRuntime?: string;
  sprinklerRuntime?: string;
  floodPumpRuntime?: string;
  waterVolumeNeeded?: string;
  energyCostSaved?: string;
  soilDepthProfile?: string;
  weeklyWaterPlan?: string;
  // Radar simulator keys
  radarTitle?: string;
  radarSubtitle?: string;
  radarPlay?: string;
  radarPause?: string;
  // Taproot simulator keys
  taprootSimTitle?: string;
  taprootSimSubtitle?: string;
  prematureSown?: string;
  delayedSown?: string;
  // Farmer Auth Modal keys
  myFarmProfile?: string;
  farmerLoginTitle?: string;
  farmerRegisterTitle?: string;
  logout?: string;
  signIn?: string;
  register?: string;
  guestDemoLogin?: string;
  farmSizeAcresLabel?: string;
  primaryCropLabel?: string;
  irrigationMethodLabel?: string;
  soilTypeLabel?: string;
  // Public Broadcast Screen keys
  publicRadioTab?: string;
  publicTvTab?: string;
  fullscreenTvMode?: string;
  exitFullscreenTv?: string;
  onAirLive?: string;
  radioScriptTitle?: string;
  villageTvDisplay?: string;
  // River & Plant selection keys
  riverWaterTitle: string;
  riverWaterSubtitle: string;
  riverGaugeHeight: string;
  canalDischarge: string;
  reservoirStorage: string;
  groundwaterDepth: string;
  waterSituation: string;
  bestPlantsTitle: string;
  bestPlantsSubtitle: string;
  waterRequirement: string;
  cropDuration: string;
  // Office keys
  officeStatusOpen: string;
  officeStatusClosed: string;
  officersOnDuty: string;
  seedStockAvailable: string;
  callOfficer: string;
  // Broadcast keys
  radioTitle: string;
  broadcastRadioTts: string;
  stopRadioTts: string;
  openRealWhatsApp: string;
  openRealSms: string;
  // Irrigation keys
  irrigationTitle: string;
  irrigationSubtitle: string;
  waterRequirementPerAcre: string;
  dripRunTime: string;
  sprinklerRun: string;
  floodRun: string;
  powerSaved: string;
  // Market price keys
  marketPriceTitle: string;
  apmcMandi: string;
  currentModalPrice: string;
  mspPrice: string;
  avgYieldPerAcre: string;
  estimatedInputCost: string;
  projectedNetProfit: string;
  bestHarvestWindow: string;
  trendBullish: string;
  trendBearish: string;
  perQuintal: string;
  advisoryVerdict: string;
  loginRegister: string;
  allStatesPanchayats: string;
  selectStateInstruction: string;
  autoDetectPanchayat: string;
  searchStateOrPanchayat: string;
  selectState: string;
}

export const APP_TRANSLATIONS: Record<Language, AppTranslation> = {
  en: {
    appTitle: "Monsoon Guard",
    tagline: "Hyperlocal Agromet Intelligence for Sowing & Irrigation",
    badgeSystem: "Agromet AI · IMD / NOAA / SMAP",
    focusBlock: "Pan-India · 28 States & UTs",
    allIndiaCoverage: "All India · 28 States & 700+ Districts",
    primaryVerdict: "Action Verdict",
    selectPanchayat: "Select Panchayat",
    selectCrop: "Select Crop",
    confidence: "Confidence",
    viewWorkflow: "Workflow Flowchart",
    viewPhoneFrame: "Interactive Mobile App",
    viewAllDevices: "Responsive Desktop / Tablet",
    hotspotsToggle: "Show Clickable Hotspots",
    restart: "Restart Flow",
    specs: "System Specs",
    advisorySow: "SOW NOW",
    advisoryWait: "WAIT - DO NOT SOW",
    advisoryProtect: "PROTECT MOISTURE",
    whyWait: "Why You Must Wait",
    whySow: "Why Sowing is Safe",
    whyProtect: "Protective Irrigation Needed",
    seedCostAvoided: "Seed Investment Loss Avoided",
    acres: "Acres",
    recommendedSowingWindow: "True Sowing Window",
    currentSoilMoisture: "Current Soil Moisture (0-30cm)",
    soilDeficit: "Moisture Deficit",
    checklistTitle: "Farmer Field Checklist",
    checkItem1: "Hold back certified seed bags in clean storage",
    checkItem2: "Prepare conservation furrows across field slope",
    checkItem3: "Inspect borewell head & drip line emitters",
    shareWhatsApp: "WhatsApp Advisory",
    copyShareText: "Copy Advisory Text",
    copied: "Copied to Clipboard!",
    simulateDelivery: "Community Alert Dispatcher",
    listenAdvisory: "Listen in Local Language",
    stopAudio: "Stop Voice Audio",
    playingAudio: "Broadcasting Voice Audio...",
    rainfallProbability: "Pre-Monsoon Rain Chance",
    falseOnsetRisk: "False-Onset Risk",
    drySpellRisk: "Post-Rain Dry Break Risk",
    timelineTitle: "Critical 30-Day Agromet Risk Matrix",
    timelineSubtitle: "Forecasting false-onset rain traps and subsequent dry spells",
    timelinePhase1Title: "Phase 1: Isolated Rain Event",
    timelinePhase1Desc: "15–40mm convection showers expected over 48h.",
    timelinePhase1Badge: "Rain Trap Danger",
    timelinePhase2Title: "Phase 2: Severe 10–14 Day Dry Break",
    timelinePhase2Desc: "Rain completely stops; high evapotranspiration burns roots.",
    timelinePhase2Badge: "Desiccation Zone",
    timelinePhase3Title: "Phase 3: True Monsoon Sowing Window",
    timelinePhase3Desc: "Sustained monsoon revival with continuous deep root recharge.",
    timelinePhase3Badge: "Optimal Sowing",
    compOtherApps: "Standard Weather Apps",
    compMonsoonGuard: "Monsoon Guard",
    economicBenefit: "Calculated Economic Benefit",
    farmSize: "Farm Size",
    riskMapTitle: "Panchayat Risk & Spatial Reliever",
    riskMapSubtitle: "Hyperlocal False-Onset & Soil Deficit Cadastre",
    spatialCadastre: "Spatial Cadastre",
    tabsLocation: "Panchayat",
    tabsOutlook: "Risk Outlook",
    tabsAdvisory: "Sowing",
    tabsIrrigation: "Irrigation",
    tabsRiverWater: "River & Water",
    tabsRiskMap: "Risk Map",
    tabsAlerts: "SMS & WhatsApp",
    tabsPublicBroadcast: "Radio & TV",
    tabsOffice: "Office & Staff",
    tabsLearn: "Validate & Retrain",
    validateLearnTitle: "Continuous Model Retraining",
    validateLearnSubtitle: "Ground rain gauge calibration and seasonal recalibration",
    logGroundTruth: "Log Ground Truth",
    submitGroundReading: "Submit Actual Field Reading",
    measuredRainMm: "Actual Rain Measured (mm)",
    didDryBreakFollow: "Did a dry break follow after rain?",
    yesDryBreak: "Yes - Severe Dry Break Occurred",
    noRainsContinued: "No - Rain Continued Normally",
    observerNotes: "Observer Notes & Seedbed Status",
    submitAndRetrain: "Submit & Retrain Weights",
    cancel: "Cancel",
    mobileNumber: "Enter 10-digit mobile number",
    pushAlert: "Dispatch Alert",
    alertSentSuccess: "Alert Dispatched Successfully!",
    decisionHeader: "Agronomic Decision",
    riverWaterTitle: "River & Canal Hydrology Status",
    riverWaterSubtitle: "Surface water, reservoir storage and best crop planting",
    riverGaugeHeight: "River Gauge Height",
    canalDischarge: "Canal Discharge Flow",
    reservoirStorage: "Reservoir Storage",
    groundwaterDepth: "Groundwater Table Depth",
    waterSituation: "Hydrological Situation",
    bestPlantsTitle: "Ranked Best Plants & Crops for this Situation",
    bestPlantsSubtitle: "Selected based on water availability, heat tolerance and soil type",
    waterRequirement: "Water Requirement",
    cropDuration: "Crop Duration",
    officeStatusOpen: "Office Open - Officers Available",
    officeStatusClosed: "Office Closed - Field Inspection",
    officersOnDuty: "Staff On Duty & Contact Numbers",
    seedStockAvailable: "Subsidized Buffer Seed Stock in Warehouse",
    callOfficer: "Call Staff Directly",
    radioTitle: "Gram Panchayat Agromet Radio 90.4 FM",
    broadcastRadioTts: "Broadcast Loudspeaker Audio",
    stopRadioTts: "Stop Loudspeaker Broadcast",
    openRealWhatsApp: "Open Real WhatsApp",
    openRealSms: "Open Real SMS",
    irrigationTitle: "Smart Automated Irrigation Scheduling",
    irrigationSubtitle: "Real-time pump running schedule based on rainfall & SMAP soil moisture",
    waterRequirementPerAcre: "Water Requirement per Acre",
    dripRunTime: "Drip Irrigation Running Time",
    sprinklerRun: "Sprinkler Running Time",
    floodRun: "Borewell / Canal Flood Run",
    powerSaved: "Estimated Power & Diesel Cost Saved",
    marketPriceTitle: "Live Market Prices & APMC Mandi Rates",
    apmcMandi: "APMC Mandi",
    currentModalPrice: "Current Modal Price",
    mspPrice: "Govt MSP Price",
    avgYieldPerAcre: "Estimated Yield per Acre",
    estimatedInputCost: "Input Cost per Acre",
    projectedNetProfit: "Projected Net Profit",
    bestHarvestWindow: "Best Harvest & Selling Month",
    trendBullish: "Bullish (+₹120)",
    trendBearish: "Stable",
    perQuintal: "/ Quintal",
    advisoryVerdict: "Sowing & Weather Advisory",
    loginRegister: "Login / Register",
    allStatesPanchayats: "All States & Panchayats of India",
    selectStateInstruction: "Choose any state and panchayat across India for hyperlocal agromet forecast, water, and market data.",
    autoDetectPanchayat: "Use GPS Location",
    searchStateOrPanchayat: "Search any Panchayat, Block, District or State...",
    selectState: "Select State / UT",
    deliveryHubTitle: "Community Alert Dispatcher",
    deliveryHubSubtitle: "Real-time GSM SMS, IVR Voice and WhatsApp Dispatcher",
    dispatchToPhone: "Dispatch to Registered Phone",
    highRiskWait: "High False-Onset Risk (WAIT)",
    moderateRisk: "Moderate Risk (Watch)",
    safeToSow: "Optimal Sowing Window (SOW)",
    seedReserveBuffer: "Panchayat Seed Reserve Buffer",
    canalWaterRelease: "Canal Water Release Rotation",
    broadcastSuccess: "Broadcast Alert Sent to 480 Farmers",
    broadcastAlert: "Broadcast Alert to Village",
    soilMoisture: "Soil Moisture (0-30cm)",
    forecastConfidence: "Forecast Confidence",
    comparisonTitle: "Monsoon Guard vs Conventional Weather Apps",
    compHyperlocal: "Resolution & Downscaling",
    compOtherDistOnly: "District level only (40km+)",
    compMgPanchayat: "Panchayat & Field level (2km)",
    compFalseOnset: "False-Onset Detection",
    compOtherNotAvail: "Not calculated",
    compMgDedicated: "Dedicated coupled index",
    compBreak: "Post-Rain Dry Break Warning",
    compMgPredictsBreak: "Predicts 10-14 day gap",
    compAdvisory: "Crop Action Guidance",
    compOtherGeneric: "General rain info",
    compMgCropActions: "Definite SOW / WAIT / PROTECT",
    compLang: "Languages & Delivery",
    compOtherEngOnly: "English / Hindi only",
    compMg5Langs: "5 Regional Languages + Voice TTS",
    calibrateStatus: "Model Calibrated with Ground Rain Gauge",
    modelEvalBenchmark: "ML Model Benchmarks",
    groundTruthLogs: "Field Rain Gauge Logs",
    predicted: "Forecast",
    actualGauge: "Actual Gauge",
    officeStatusFieldVisit: "In Field Visit",
    workingHours: "Office Working Hours",
    helpdeskHelpline: "Farmer Helpdesk Hotline",
    latestNotice: "Latest Panchayat Bulletin",
    estReturn: "Estimated Net Profit",
    whyThisPlant: "Why Plant This Crop?",
    highlyRecommended: "Highly Recommended for Current Hydrology",
    suitableWithIrrigation: "Suitable with Light Protective Irrigation",
    avoidDeficit: "Avoid: Critical Water Deficit",
    realAlertsTitle: "Real-time Mobile Alert Gateway",
    realAlertsSubtitle: "Send actual WhatsApp or SMS to farmers",
    copyAlertText: "Copy Alert Text",
    communityRadioStation: "Community Agromet Radio 90.4 FM",
    shouldIRunPumpToday: "Should I Run Water Pump Today?",
    pumpDecisionYes: "YES - RUN PUMP",
    pumpDecisionNo: "NO - KEEP PUMP OFF",
    dripRuntime: "Drip Irrigation Running Time",
    sprinklerRuntime: "Sprinkler Running Time",
    floodPumpRuntime: "Flood Pump Running Time",
    waterVolumeNeeded: "Water Volume Required",
    energyCostSaved: "Electricity & Diesel Cost Saved",
    soilDepthProfile: "Soil Moisture by Root Depth Profile",
    weeklyWaterPlan: "5-Day Intelligent Irrigation Schedule",
    radarTitle: "Radar Downscaling Simulation",
    radarSubtitle: "Doppler radar & satellite precipitation downscaled to field boundaries",
    radarPlay: "Play Radar Loop",
    radarPause: "Pause Radar Loop",
    taprootSimTitle: "Taproot Desiccation Simulator",
    taprootSimSubtitle: "Simulating seedling survival under post-onset dry spells",
    prematureSown: "Premature Sown (Caught in False-Onset)",
    delayedSown: "Optimally Sown (True Monsoon Revival)",
    myFarmProfile: "My Farm Profile",
    farmerLoginTitle: "Farmer Login / Sign In",
    farmerRegisterTitle: "New Farmer Registration",
    logout: "Log Out",
    signIn: "Sign In",
    register: "Register Farmer",
    guestDemoLogin: "Demo Farmer Login",
    farmSizeAcresLabel: "Farm Size (Acres)",
    primaryCropLabel: "Primary Sowing Crop",
    irrigationMethodLabel: "Irrigation Facility",
    soilTypeLabel: "Soil Type",
    publicRadioTab: "Public Agromet Radio",
    publicTvTab: "Gram Panchayat TV Notice Board",
    fullscreenTvMode: "Fullscreen TV Display",
    exitFullscreenTv: "Exit Fullscreen",
    onAirLive: "ON AIR LIVE",
    radioScriptTitle: "Official Audio Broadcast Script",
    villageTvDisplay: "Village Square Public TV Display"
  },
  hi: {
    appTitle: "मानसून गार्ड",
    tagline: "बोवाई एवं स्मार्ट सिंचाई के लिए पंचायत स्तर मौसम सलाह",
    badgeSystem: "मौसम पूर्वानुमान · IMD / NOAA / SMAP",
    focusBlock: "अखिल भारतीय · २८ राज्य एवं केंद्रशासित प्रदेश",
    allIndiaCoverage: "संपूर्ण भारत · २८ राज्य एवं ७००+ जिले",
    primaryVerdict: "निर्णय",
    selectPanchayat: "ग्राम पंचायत चुनें",
    selectCrop: "फसल चुनें",
    confidence: "सटीकता",
    viewWorkflow: "प्रक्रिया चार्ट",
    viewPhoneFrame: "मोबाइल ऐप देखें",
    viewAllDevices: "डेस्कटॉप / टैबलेट स्क्रीन",
    hotspotsToggle: "हॉटस्पॉट देखें",
    restart: "पुनः शुरू करें",
    specs: "सिस्टम विवरण",
    advisorySow: "बोवाई करें",
    advisoryWait: "प्रतीक्षा करें - न बोएं",
    advisoryProtect: "ओलावा सुरक्षित रखें",
    whyWait: "बोवाई क्यों रोकें?",
    whySow: "बोवाई क्यों सुरक्षित है?",
    whyProtect: "सुरक्षात्मक सिंचाई दें",
    seedCostAvoided: "बचत किया गया बीज खर्च",
    acres: "एकड़",
    recommendedSowingWindow: "सुरक्षित बोवाई का समय",
    currentSoilMoisture: "वर्तमान मिट्टी नमी (०-३० सेमी)",
    soilDeficit: "नमी की कमी",
    checklistTitle: "किसान खेत चेकलिस्ट",
    checkItem1: "प्रमाणित बीज पैकेट सुरक्षित गोदाम में रखें",
    checkItem2: "ढलान के आड़े समोच्च मेड़बंदी तैयार करें",
    checkItem3: "ड्रिप और बोरवेल पंप की जांच करें",
    shareWhatsApp: "व्हाट्सएप पर भेजें",
    copyShareText: "सलाह कॉपी करें",
    copied: "कॉपी हो गया!",
    simulateDelivery: "चेतावनी प्रेषक",
    listenAdvisory: "अपनी भाषा में सुनें",
    stopAudio: "आवाज बंद करें",
    playingAudio: "आवाज चल रही है...",
    rainfallProbability: "शुरुआती बारिश की संभावना",
    falseOnsetRisk: "झूठे मानसून का खतरा",
    drySpellRisk: "बारिश बाद सूखे दौर का खतरा",
    timelineTitle: "३० दिनों का मौसम जोखिम चक्र",
    timelineSubtitle: "झूठे मानसून और उसके बाद आने वाले सूखे दौर का सटीक पूर्वानुमान",
    timelinePhase1Title: "चरण १: शुरुआती बारिश",
    timelinePhase1Desc: "१५-४० मिमी संवहन बारिश अपेक्षित।",
    timelinePhase1Badge: "बारिश का जाल",
    timelinePhase2Title: "चरण २: १०-१४ दिन का सूखा दौर",
    timelinePhase2Desc: "बारिश पूरी तरह थमेगी; तेज धूप से अंकुर झुलस जाएगा।",
    timelinePhase2Badge: "सूखा काल",
    timelinePhase3Title: "चरण ३: वास्तविक मानसून बोवाई",
    timelinePhase3Desc: "सच्चे मानसून का आगमन, जड़ों तक संपूर्ण नमी।",
    timelinePhase3Badge: "सुरक्षित बोवाई",
    compOtherApps: "साधारण मौसम ऐप्स",
    compMonsoonGuard: "मानसून गार्ड",
    economicBenefit: "अनुमानित आर्थिक लाभ",
    farmSize: "खेत का आकार",
    riskMapTitle: "पंचायत जोखिम नक्शा",
    riskMapSubtitle: "झूठा मानसून और नमी कमी का नक्शा",
    spatialCadastre: "क्षेत्रीय नक्शा",
    tabsLocation: "पंचायत",
    tabsOutlook: "पूर्वानुमान",
    tabsAdvisory: "बोवाई",
    tabsIrrigation: "स्मार्ट सिंचाई",
    tabsRiverWater: "नदी व पानी",
    tabsRiskMap: "नक्शा",
    tabsAlerts: "अलर्ट व संदेश",
    tabsPublicBroadcast: "रेडियो व टीवी",
    tabsOffice: "कार्यालय व कर्मचारी",
    tabsLearn: "सत्यापन व सुधार",
    validateLearnTitle: "मॉडल का निरंतर सुधार",
    validateLearnSubtitle: "वास्तविक बारिश का डेटा डालकर एआई को सटीक बनाएं",
    logGroundTruth: "वास्तविक डेटा दर्ज करें",
    submitGroundReading: "खेत में दर्ज बारिश सबमिट करें",
    measuredRainMm: "मापी गई बारिश (मिमी)",
    didDryBreakFollow: "क्या बारिश के बाद सूखा दौर आया?",
    yesDryBreak: "हाँ - तीव्र सूखा दौर आया",
    noRainsContinued: "नहीं - बारिश नियमित जारी रही",
    observerNotes: "निरीक्षक की टिप्पणी",
    submitAndRetrain: "सबमिट कर मॉडल री-ट्रेन करें",
    cancel: "रद्द करें",
    mobileNumber: "१० अंकों का मोबाइल नंबर",
    pushAlert: "अलर्ट भेजें",
    alertSentSuccess: "अलर्ट सफलतापूर्वक भेजा गया!",
    decisionHeader: "कृषि निर्णय",
    riverWaterTitle: "नदी व नहर जल उपलब्धता",
    riverWaterSubtitle: "नदी स्तर, बांध भंडारण और सर्वश्रेष्ठ फसल चयन",
    riverGaugeHeight: "नदी जलस्तर",
    canalDischarge: "नहर प्रवाह दर",
    reservoirStorage: "बांध भंडारण",
    groundwaterDepth: "भूजल स्तर गहराई",
    waterSituation: "जल स्थिति",
    bestPlantsTitle: "वर्तमान स्थिति हेतु सर्वश्रेष्ठ फसलें",
    bestPlantsSubtitle: "पानी की उपलब्धता, तापमान सहनशीलता एवं मिट्टी के अनुसार",
    waterRequirement: "जल आवश्यकता",
    cropDuration: "फसल अवधि",
    officeStatusOpen: "कार्यालय खुला है - अधिकारी उपस्थित",
    officeStatusClosed: "कार्यालय बंद - क्षेत्रीय निरीक्षण",
    officersOnDuty: "उपस्थित अधिकारी एवं फोन नंबर",
    seedStockAvailable: "गोदाम में रियायती बफर बीज स्टॉक",
    callOfficer: "अधिकारी को फोन लगाएं",
    radioTitle: "ग्राम पंचायत मौसम रेडियो ९०.४ एफएम",
    broadcastRadioTts: "लाउडस्पीकर प्रसारण शुरू करें",
    stopRadioTts: "प्रसारण रोकें",
    openRealWhatsApp: "सीधा व्हाट्सएप खोलें",
    openRealSms: "सीधा एसएमएस खोलें",
    irrigationTitle: "स्मार्ट स्वचालित सिंचाई समय-सारणी",
    irrigationSubtitle: "बारिश के पैटर्न और मिट्टी की नमी के आधार पर पंप चलाने का समय",
    waterRequirementPerAcre: "प्रति एकड़ जल आवश्यकता",
    dripRunTime: "ड्रिप सिंचाई चलने का समय",
    sprinklerRun: "स्प्रिंकलर चलने का समय",
    floodRun: "बोरवेल/नहर फ्लड समय",
    powerSaved: "बचाई गई बिजली व डीजल लागत",
    marketPriceTitle: "लाइव मंडी भाव एवं एपीएमसी दरें",
    apmcMandi: "एपीएमसी मंडी",
    currentModalPrice: "मॉडल भाव",
    mspPrice: "सरकारी एमएसपी",
    avgYieldPerAcre: "अनुमानित उत्पादन प्रति एकड़",
    estimatedInputCost: "लागत प्रति एकड़",
    projectedNetProfit: "अनुमानित शुद्ध लाभ",
    bestHarvestWindow: "सर्वोत्तम बिक्री का समय",
    trendBullish: "तेजी (+₹120)",
    trendBearish: "स्थिर",
    perQuintal: "/ क्विंटल",
    advisoryVerdict: "बोवाई एवं मौसम सलाह",
    loginRegister: "लॉगिन / पंजीकरण",
    allStatesPanchayats: "भारत के सभी राज्य एवं पंचायतें",
    selectStateInstruction: "हाइपरलोकल मौसम, पानी और मंडी भाव के लिए भारत का कोई भी राज्य व पंचायत चुनें।",
    autoDetectPanchayat: "जीपीएस से खोजें",
    searchStateOrPanchayat: "पंचायत, ब्लॉक, जिला या राज्य खोजें...",
    selectState: "राज्य चुनें"
  },
  mr: {
    appTitle: "मान्सून गार्ड",
    tagline: "पेरणी व स्मार्ट सिंचनासाठी पंचायत पातळीवर अचूक हवामान सल्ला",
    badgeSystem: "कृषी हवामान एआय · IMD / NOAA / SMAP",
    focusBlock: "अखिल भारतीय · २८ राज्ये व केंद्रशासित प्रदेश",
    allIndiaCoverage: "संपूर्ण भारत · २८ राज्ये आणि ७००+ जिल्हे",
    primaryVerdict: "निर्णय",
    selectPanchayat: "ग्रामपंचायत निवडा",
    selectCrop: "पीक निवडा",
    confidence: "विश्वासार्हता",
    viewWorkflow: "कार्यपद्धती फ्लोचार्ट",
    viewPhoneFrame: "मोबाईल ॲप पहा",
    viewAllDevices: "डेस्कटॉप / टॅबलेट स्क्रीन",
    hotspotsToggle: "हॉटस्पॉट दाखवा",
    restart: "प्रारंभापासून सुरू करा",
    specs: "प्रणाली तपशील",
    advisorySow: "पेरणी करा",
    advisoryWait: "थांबा - पेरणी करू नका",
    advisoryProtect: "ओलावा वाचवा",
    whyWait: "पेरणी का रोखावी?",
    whySow: "पेरणी का सुरक्षित आहे?",
    whyProtect: "संरक्षक पाणी द्या",
    seedCostAvoided: "दुबार पेरणीचे वाचलेले भांडवल",
    acres: "एकर",
    recommendedSowingWindow: "खऱ्या पेरणीची सुरक्षित वेळ",
    currentSoilMoisture: "मातीतील ओलावा (०-३० सेमी)",
    soilDeficit: "ओलाव्याची तूट",
    checklistTitle: "शेतकरी कृती यादी",
    checkItem1: "प्रमाणित बियाणे पिशव्या कोरड्या गोदामात ठेवा",
    checkItem2: "उताराला आडवे समपातळी चर काढा",
    checkItem3: "ठिबक सिंचन आणि विहिरीचा पंप तपासा",
    shareWhatsApp: "व्हॉट्सॲपवर पाठवा",
    copyShareText: "सल्ला कॉपी करा",
    copied: "कॉपी झाले!",
    simulateDelivery: "अलर्ट पाठवा",
    listenAdvisory: "मराठीत ऐका",
    stopAudio: "आवाज थांबवा",
    playingAudio: "आवाज सुरू आहे...",
    rainfallProbability: "सुरुवातीच्या पावसाची शक्यता",
    falseOnsetRisk: "खोट्या मान्सूनचा धोका",
    drySpellRisk: "पावसानंतर कोरड्या खंडाचा धोका",
    timelineTitle: "३० दिवसांचे हवामान जोखीम चक्र",
    timelineSubtitle: "खोटा पाऊस आणि त्यानंतर येणाऱ्या कोरड्या खंडाचा अंदाज",
    timelinePhase1Title: "टप्पा १: सुरुवातीचा वळीव पाऊस",
    timelinePhase1Desc: "१५-४० मिमी पाऊस पुढील ४८ तासांत अपेक्षित.",
    timelinePhase1Badge: "पावसाचा सापळा",
    timelinePhase2Title: "टप्पा २: १०-१४ दिवसांचा कडक उन्हाचा खंड",
    timelinePhase2Desc: "पाऊस पूर्ण थांबेल; कडक उन्हाने कोवळे अंकुर जळून जाईल.",
    timelinePhase2Badge: "कोरडा काळ",
    timelinePhase3Title: "टप्पा ३: खरी मान्सून पेरणी वेळ",
    timelinePhase3Desc: "नियमित मान्सूनचे आगमन, मुळांच्या थरात मुबलक ओलावा.",
    timelinePhase3Badge: "योग्य पेरणी",
    compOtherApps: "इतर हवामान ॲप्स",
    compMonsoonGuard: "मान्सून गार्ड",
    economicBenefit: "शेतकऱ्याचा निव्वळ आर्थिक फायदा",
    farmSize: "शेतीचे क्षेत्र",
    riskMapTitle: "पंचायत जोखीम नकाशा",
    riskMapSubtitle: "खोटा पाऊस आणि ओलावा तुटीचा नकाशा",
    spatialCadastre: "क्षेत्रीय नकाशा",
    tabsLocation: "पंचायत",
    tabsOutlook: "अंदाज",
    tabsAdvisory: "पेरणी",
    tabsIrrigation: "स्मार्ट सिंचन",
    tabsRiverWater: "नदी व पाणी",
    tabsRiskMap: "नकाशा",
    tabsAlerts: "अलर्ट व संदेश",
    tabsPublicBroadcast: "रेडिओ व टीव्ही",
    tabsOffice: "कार्यालय व कर्मचारी",
    tabsLearn: "सत्यापन व शिकणे",
    validateLearnTitle: "मॉडेलचे सातत्यपूर्ण प्रशिक्षण",
    validateLearnSubtitle: "प्रत्यक्ष पावसाची नोंद करून अंदाज अधिक अचूक करणे",
    logGroundTruth: "खरे वाचन नोंदवा",
    submitGroundReading: "शेतकऱ्यांनी नोंदवलेला पाऊस जमा करा",
    measuredRainMm: "मोजलेला पाऊस (मिमी)",
    didDryBreakFollow: "पावसानंतर कोरडा खंड पडला का?",
    yesDryBreak: "होय - कडक उन्हाचा खंड पडला",
    noRainsContinued: "नाही - पाऊस नियमित सुरू राहिला",
    observerNotes: "निरीक्षकांच्या नोंदी",
    submitAndRetrain: "सबमिट करून मॉडेल री-ट्रेन करा",
    cancel: "रद्द करा",
    mobileNumber: "१० अंकी मोबाईल नंबर",
    pushAlert: "अलर्ट पाठवा",
    alertSentSuccess: "अलर्ट यशस्वीरीत्या पाठवला!",
    decisionHeader: "कृषी सल्ला",
    riverWaterTitle: "नदी व कालवा जलसाठा स्थिती",
    riverWaterSubtitle: "नदी पातळी, धरण साठा व योग्य पीक निवड",
    riverGaugeHeight: "नदी पाणी पातळी",
    canalDischarge: "कालवा विसर्ग",
    reservoirStorage: "धरण पाणी साठा",
    groundwaterDepth: "भूजल पातळी खोली",
    waterSituation: "पाणी परिस्थिती",
    bestPlantsTitle: "सध्याच्या परिस्थितीसाठी सर्वोत्तम पिके",
    bestPlantsSubtitle: "पाण्याची उपलब्धता, हवामान व जमिनीनुसार निवडलेली",
    waterRequirement: "पाण्याची गरज",
    cropDuration: "कालावधी",
    officeStatusOpen: "कार्यालय उघडे - अधिकारी उपस्थित",
    officeStatusClosed: "कार्यालय बंद - क्षेत्रीय पाहणी",
    officersOnDuty: "उपस्थित अधिकारी व संपर्क क्रमांक",
    seedStockAvailable: "गोदामात उपलब्ध अनुदानित बफर बियाणे",
    callOfficer: "अधिकाऱ्याला थेट फोन करा",
    radioTitle: "ग्रामपंचायत कृषी रेडिओ ९०.४ एफएम",
    broadcastRadioTts: "लाऊडस्पीकर प्रसारण सुरू करा",
    stopRadioTts: "प्रसारण थांबवा",
    openRealWhatsApp: "थेट व्हॉट्सॲप उघडा",
    openRealSms: "थेट एसएमएस उघडा",
    irrigationTitle: "स्मार्ट स्वयंचलित सिंचन वेळापत्रक",
    irrigationSubtitle: "स्थानिक पाऊस व मातीतील ओलाव्यावर आधारित पंप चालवण्याचा सल्ला",
    waterRequirementPerAcre: "प्रति एकर पाण्याची गरज",
    dripRunTime: "ठिबक सिंचन चालवण्याची वेळ",
    sprinklerRun: "तुषार सिंचन वेळ",
    floodRun: "पाटपाणी / विहीर पंप वेळ",
    powerSaved: "वाचलेली वीज व डिझेल बचत",
    marketPriceTitle: "थेट बाजारभाव व एपीएमसी हमीभाव",
    apmcMandi: "कृषी उत्पन्न बाजार समिती",
    currentModalPrice: "मॉडल भाव",
    mspPrice: "हमीभाव (MSP)",
    avgYieldPerAcre: "अपेक्षित उत्पादन प्रति एकर",
    estimatedInputCost: "खर्च प्रति एकर",
    projectedNetProfit: "अपेक्षित निव्वळ नफा",
    bestHarvestWindow: "उत्कृष्ट विक्रीचा महिना",
    trendBullish: "तेजी (+₹120)",
    trendBearish: "स्थिर",
    perQuintal: "/ क्विंटल",
    advisoryVerdict: "पेरणी व हवामान सल्ला",
    loginRegister: "लॉगिन / नोंदणी",
    allStatesPanchayats: "भारतातील सर्व राज्ये व पंचायती",
    selectStateInstruction: "स्थानिक हवामान अंदाज, पाणी उपलब्धता आणि बाजारभावासाठी भारतातील कोणतेही राज्य व पंचायत निवडा.",
    autoDetectPanchayat: "जीपीएसने शोधा",
    searchStateOrPanchayat: "पंचायत, तालुका, जिल्हा किंवा राज्य शोधा...",
    selectState: "राज्य निवडा"
  },
  te: {
    appTitle: "మాన్సూన్ గార్డ్",
    tagline: "పంచాయతీ స్థాయి వ్యవసాయ మరియు సాగునీటి సలహా",
    badgeSystem: "వ్యవసాయ వాతావరణం · IMD / NOAA / SMAP",
    focusBlock: "అఖిల భారత · 28 రాష్ట్రాలు",
    allIndiaCoverage: "భారతదేశం మొత్తం · 28 రాష్ట్రాలు",
    primaryVerdict: "నిర్ణయం",
    selectPanchayat: "గ్రామ పంచాయతీని ఎంచుకోండి",
    selectCrop: "పంటను ఎంచుకోండి",
    confidence: "ఖచ్చితత్వం",
    viewWorkflow: "ఫ్లోచార్ట్",
    viewPhoneFrame: "మొబైల్ యాప్",
    viewAllDevices: "డెస్క్‌టాప్ స్క్రీన్",
    hotspotsToggle: "హాట్‌స్పాట్స్",
    restart: "మళ్లీ ప్రారంభించండి",
    specs: "వివరాలు",
    advisorySow: "విత్తనం వేయండి",
    advisoryWait: "వేచి ఉండండి - విత్తవద్దు",
    advisoryProtect: "తేమను కాపాడండి",
    whyWait: "ఎందుకు ఆగాలి?",
    whySow: "ఎందుకు విత్తవచ్చు?",
    whyProtect: "రక్షక తడులు ఇవ్వండి",
    seedCostAvoided: "ఆదా చేసిన విత్తన వ్యయం",
    acres: "ఎకరాలు",
    recommendedSowingWindow: "సరైన విత్తే సమయం",
    currentSoilMoisture: "ప్రస్తుత నేల తేమ",
    soilDeficit: "తేమ లోపం",
    checklistTitle: "రైతు తనిఖీ జాబితా",
    checkItem1: "విత్తనాలను సురక్షిత గోదాములో ఉంచండి",
    checkItem2: "వాలుకు అడ్డంగా బోదెలు సిద్ధం చేయండి",
    checkItem3: "డ్రిప్ మరియు మోటార్ తనిఖీ చేయండి",
    shareWhatsApp: "వాట్సాప్ సందేశం",
    copyShareText: "టెక్స్ట్ కాపీ చేయండి",
    copied: "కాపీ చేయబడింది!",
    simulateDelivery: "హెచ్చరికలు",
    listenAdvisory: "వినండి",
    stopAudio: "ఆపండి",
    playingAudio: "ఆడియో వినబడుతోంది...",
    rainfallProbability: "వర్షపాతం అవకాశం",
    falseOnsetRisk: "నకిలీ వర్షం ప్రమాదం",
    drySpellRisk: "పొడి వాతావరణ ప్రమాదం",
    timelineTitle: "30 రోజుల వాతావరణ అంచనా",
    timelineSubtitle: "నకిలీ వర్షం మరియు పొడి విరామం అంచనా",
    timelinePhase1Title: "దశ 1: ముందస్తు వర్షం",
    timelinePhase1Desc: "15-40 మిమీ వర్షం కురిసే అవకాశం.",
    timelinePhase1Badge: "వర్షపు ఉచ్చు",
    timelinePhase2Title: "దశ 2: 10-14 రోజుల తీవ్ర పొడి విరామం",
    timelinePhase2Desc: "వర్షం ఆగిపోతుంది; అధిక ఎండ వల్ల విత్తనం ఎండిపోతుంది.",
    timelinePhase2Badge: "పొడి కాలం",
    timelinePhase3Title: "దశ 3: నిజమైన విత్తే సమయం",
    timelinePhase3Desc: "నిరంతర ఋతుపవన వర్షాలు మొదలవుతాయి.",
    timelinePhase3Badge: "సరైన విత్తనం",
    compOtherApps: "ఇతర యాప్స్",
    compMonsoonGuard: "మాన్సూన్ గార్డ్",
    economicBenefit: "ఆర్థిక ప్రయోజనం",
    farmSize: "పొలం పరిమాణం",
    riskMapTitle: "రిస్క్ మ్యాప్",
    riskMapSubtitle: "తేమ లోపం మ్యాప్",
    spatialCadastre: "ప్రాంతీయ మ్యాప్",
    tabsLocation: "పంచాయతీ",
    tabsOutlook: "అంచనా",
    tabsAdvisory: "విత్తడం",
    tabsIrrigation: "నీటిపారుదల",
    tabsRiverWater: "నది & నీరు",
    tabsRiskMap: "మ్యాప్",
    tabsAlerts: "హెచ్చరికలు",
    tabsPublicBroadcast: "రేడియో & టీవీ",
    tabsOffice: "కార్యాలయం",
    tabsLearn: "శిక్షణ",
    validateLearnTitle: "మోడల్ అభివృద్ధి",
    validateLearnSubtitle: "క్షేత్ర స్థాయి రీడింగులు",
    logGroundTruth: "డేటా నమోదు",
    submitGroundReading: "రీడింగ్ సబ్మిట్ చేయండి",
    measuredRainMm: "కొలిచిన వర్షం (మిమీ)",
    didDryBreakFollow: "పొడి విరామం వచ్చిందా?",
    yesDryBreak: "అవును - పొడి కాలం వచ్చింది",
    noRainsContinued: "లేదు - వర్షం పడింది",
    observerNotes: "గమనికలు",
    submitAndRetrain: "రీ-ట్రైన్ చేయండి",
    cancel: "రద్దు",
    mobileNumber: "మొబైల్ నంబర్",
    pushAlert: "పంపండి",
    alertSentSuccess: "సందేశం పంపబడింది!",
    decisionHeader: "వ్యవసాయ నిర్ణయం",
    riverWaterTitle: "నది మరియు కాలువ నీటి లభ్యత",
    riverWaterSubtitle: "నది స్థాయి మరియు పంట ఎంపిక",
    riverGaugeHeight: "నది నీటి మట్టం",
    canalDischarge: "కాలువ నీటి ప్రవాహం",
    reservoirStorage: "జలాశయ నిల్వ",
    groundwaterDepth: "భూగర్భ జలాల లోతు",
    waterSituation: "నీటి పరిస్థితి",
    bestPlantsTitle: "ప్రస్తుత పరిస్థితికి ఉత్తమ పంటలు",
    bestPlantsSubtitle: "నీటి లభ్యత ఆధారంగా సిఫార్సు చేసినవి",
    waterRequirement: "నీటి అవసరం",
    cropDuration: "పంట కాలం",
    officeStatusOpen: "కార్యాలయం తెరిచి ఉంది",
    officeStatusClosed: "కార్యాలయం మూసివేయబడింది",
    officersOnDuty: "అందుబాటులో ఉన్న అధికారులు",
    seedStockAvailable: "సబ్సిడీ విత్తనాల నిల్వ",
    callOfficer: "అధికారికి కాల్ చేయండి",
    radioTitle: "గ్రామ పంచాయతీ రేడియో 90.4 FM",
    broadcastRadioTts: "రేడియో ప్రారంభించండి",
    stopRadioTts: "ఆపండి",
    openRealWhatsApp: "వాట్సాప్ తెరవండి",
    openRealSms: "SMS తెరవండి",
    irrigationTitle: "స్మార్ట్ ఆటోమేటెడ్ నీటిపారుదల",
    irrigationSubtitle: "వర్షం మరియు నేల తేమ ఆధారంగా పంప్ రన్ సమయం",
    waterRequirementPerAcre: "ఎకరానికి నీటి అవసరం",
    dripRunTime: "డ్రిప్ రన్ టైమ్",
    sprinklerRun: "స్ప్రింక్లర్ రన్ టైమ్",
    floodRun: "బోర్‌వెల్ రన్ టైమ్",
    powerSaved: "ఆదా అయిన కరెంట్ ఖర్చు",
    marketPriceTitle: "మార్కెట్ ధరలు & APMC",
    apmcMandi: "మార్కెట్ యార్డ్",
    currentModalPrice: "మార్కెట్ ధర",
    mspPrice: "మద్దతు ధర (MSP)",
    avgYieldPerAcre: "ఎకరానికి దిగుబడి",
    estimatedInputCost: "పెట్టుబడి ఖర్చు",
    projectedNetProfit: "నికర లాభం",
    bestHarvestWindow: "అమ్మకపు నెల",
    trendBullish: "పెరుగుతోంది",
    trendBearish: "స్థిరంగా ఉంది",
    perQuintal: "/ క్వింటాల్",
    advisoryVerdict: "విత్తే మరియు వాతావరణ సలహా",
    loginRegister: "లాగిన్ / రిజిస్టర్",
    allStatesPanchayats: "భారతదేశంలోని అన్ని రాష్ట్రాలు & పంచాయతీలు",
    selectStateInstruction: "హైపర్‌లోకల్ అంచనా కొరకు ఏదైనా రాష్ట్రాన్ని ఎంచుకోండి.",
    autoDetectPanchayat: "GPS ఉపయోగించండి",
    searchStateOrPanchayat: "పంచాయతీని వెతకండి...",
    selectState: "రాష్ట్రాన్ని ఎంచుకోండి"
  },
  ta: {
    appTitle: "மான்சூன் கார்ட்",
    tagline: "பஞ்சாயத்து அளவிலான வேளாண் மற்றும் பாசன நுண்ணறிவு",
    badgeSystem: "வானிலை நுண்ணறிவு · IMD / NOAA / SMAP",
    focusBlock: "அகில இந்திய · 28 மாநிலங்கள்",
    allIndiaCoverage: "முழு இந்தியா · 28 மாநிலங்கள்",
    primaryVerdict: "முடிவு",
    selectPanchayat: "கிராம பஞ்சாயத்தைத் தேர்ந்தெடுக்கவும்",
    selectCrop: "பயிரைத் தேர்ந்தெடுக்கவும்",
    confidence: "துல்லியம்",
    viewWorkflow: "செயல்முறை வரைபடம்",
    viewPhoneFrame: "மொபைல் செயலி",
    viewAllDevices: "டெஸ்க்டாப் திரை",
    hotspotsToggle: "ஹாட்ஸ்பாட்கள்",
    restart: "மீண்டும் தொடங்கவும்",
    specs: "விவரக்குறிப்புகள்",
    advisorySow: "விதைக்கவும்",
    advisoryWait: "காத்திருக்கவும் - விதைக்க வேண்டாம்",
    advisoryProtect: "ஈரப்பதத்தைப் பாதுகாக்கவும்",
    whyWait: "ஏன் தாமதிக்க வேண்டும்?",
    whySow: "ஏன் விதைக்கலாம்?",
    whyProtect: "பாதுகாப்பு பாசனம் தேவை",
    seedCostAvoided: "சேமிக்கப்பட்ட விதை செலவு",
    acres: "ஏக்கர்",
    recommendedSowingWindow: "உண்மையான விதைப்பு காலம்",
    currentSoilMoisture: "மண் ஈரப்பதம்",
    soilDeficit: "ஈரப்பத பற்றாக்குறை",
    checklistTitle: "விவசாயி சரிபார்ப்பு பட்டியல்",
    checkItem1: "சான்றளிக்கப்பட்ட விதைகளை பாதுகாப்பாக வைக்கவும்",
    checkItem2: "சரிவுக்கு குறுக்கே வரப்புகளை அமைக்கவும்",
    checkItem3: "சொட்டு நீர் பாசனத்தை சரிபார்க்கவும்",
    shareWhatsApp: "வாட்ஸ்அப் பகிர்வு",
    copyShareText: "நகலெடுக்கவும்",
    copied: "நகலெடுக்கப்பட்டது!",
    simulateDelivery: "எச்சரிக்கைகள்",
    listenAdvisory: "கேட்கவும்",
    stopAudio: "நிறுத்தவும்",
    playingAudio: "ஒலி இயங்குகிறது...",
    rainfallProbability: "மழைக்கான வாய்ப்பு",
    falseOnsetRisk: "போலி பருவமழை ஆபத்து",
    drySpellRisk: "வறட்சி ஆபத்து",
    timelineTitle: "30 நாள் வானிலை சுழற்சி",
    timelineSubtitle: "போலி மழை மற்றும் வறட்சி இடைவெளி முன்னறிவிப்பு",
    timelinePhase1Title: "கட்டம் 1: ஆரம்ப மழை",
    timelinePhase1Desc: "15-40 மிமீ மழை பெய்ய வாய்ப்பு.",
    timelinePhase1Badge: "மழைப் பொறி",
    timelinePhase2Title: "கட்டம் 2: 10-14 நாள் வறட்சி",
    timelinePhase2Desc: "மழை நிற்கும்; கடுமையான வெயிலால் முளை கருகும்.",
    timelinePhase2Badge: "வறட்சி காலம்",
    timelinePhase3Title: "கட்டம் 3: உண்மையான விதைப்பு காலம்",
    timelinePhase3Desc: "உண்மையான பருவமழை தொடக்கம்.",
    timelinePhase3Badge: "சிறந்த விதைப்பு",
    compOtherApps: "பிற செயலிகள்",
    compMonsoonGuard: "மான்சூன் கார்ட்",
    economicBenefit: "பொருளாதார பயன்",
    farmSize: "நில அளவு",
    riskMapTitle: "ஆபத்து வரைபடம்",
    riskMapSubtitle: "ஈரப்பத பற்றாக்குறை வரைபடம்",
    spatialCadastre: "பகுதி வரைபடம்",
    tabsLocation: "பஞ்சாயத்து",
    tabsOutlook: "முன்னறிவிப்பு",
    tabsAdvisory: "விதைப்பு",
    tabsIrrigation: "பாசனம்",
    tabsRiverWater: "நதி & நீர்",
    tabsRiskMap: "வரைபடம்",
    tabsAlerts: "எச்சரிக்கைகள்",
    tabsPublicBroadcast: "வானொலி & டிவி",
    tabsOffice: "அலுவலகம்",
    tabsLearn: "கற்றல்",
    validateLearnTitle: "மாதிரி மேம்பாடு",
    validateLearnSubtitle: "கள அளவீடுகள்",
    logGroundTruth: "பதிவு செய்யவும்",
    submitGroundReading: "அளவீட்டை சமர்ப்பிக்கவும்",
    measuredRainMm: "மழை அளவு (மிமீ)",
    didDryBreakFollow: "வறட்சி இடைவெளி ஏற்பட்டதா?",
    yesDryBreak: "ஆம் - வறட்சி ஏற்பட்டது",
    noRainsContinued: "இல்லை - மழை தொடர்ந்தது",
    observerNotes: "குறிப்புகள்",
    submitAndRetrain: "சமர்ப்பிக்கவும்",
    cancel: "ரத்து செய்",
    mobileNumber: "மொபைல் எண்",
    pushAlert: "அனுப்பவும்",
    alertSentSuccess: "எச்சரிக்கை அனுப்பப்பட்டது!",
    decisionHeader: "வேளாண் முடிவு",
    riverWaterTitle: "நதி மற்றும் கால்வாய் நீர் இருப்பு",
    riverWaterSubtitle: "நீர் நிலை மற்றும் பயிர் தேர்வு",
    riverGaugeHeight: "நதி நீர் மட்டம்",
    canalDischarge: "கால்வாய் பாய்ச்சல்",
    reservoirStorage: "நீர்த்தேக்க இருப்பு",
    groundwaterDepth: "நிலத்தடி நீர் ஆழம்",
    waterSituation: "நீர் நிலைமை",
    bestPlantsTitle: "தற்போதைய நிலைக்கு சிறந்த பயிர்கள்",
    bestPlantsSubtitle: "நீர் இருப்பின் அடிப்படையில் பரிந்துரை",
    waterRequirement: "நீர் தேவை",
    cropDuration: "பயிர் காலம்",
    officeStatusOpen: "அலுவலகம் திறந்துள்ளது",
    officeStatusClosed: "அலுவலகம் மூடப்பட்டுள்ளது",
    officersOnDuty: "பணியில் உள்ள அதிகாரிகள்",
    seedStockAvailable: "மானிய விதை இருப்பு",
    callOfficer: "அதிகாரியை அழைக்கவும்",
    radioTitle: "கிராம பஞ்சாயத்து வானொலி 90.4 FM",
    broadcastRadioTts: "ஒலிபரப்பவும்",
    stopRadioTts: "நிறுத்தவும்",
    openRealWhatsApp: "வாட்ஸ்அப் திறக்கவும்",
    openRealSms: "SMS திறக்கவும்",
    irrigationTitle: "தானியங்கி பாசன அட்டவணை",
    irrigationSubtitle: "மழை மற்றும் மண் ஈரப்பதம் அடிப்படையில் பம்ப் இயக்கும் நேரம்",
    waterRequirementPerAcre: "ஏக்கருக்கு நீர் தேவை",
    dripRunTime: "சொட்டு நீர் பாசன நேரம்",
    sprinklerRun: "தெளிப்பான் இயங்கும் நேரம்",
    floodRun: "பாய்வு பாசன நேரம்",
    powerSaved: "சேமிக்கப்பட்ட மின்சார செலவு",
    marketPriceTitle: "சந்தை விலை & APMC",
    apmcMandi: "சந்தை மையம்",
    currentModalPrice: "சந்தை விலை",
    mspPrice: "ஆதரவு விலை (MSP)",
    avgYieldPerAcre: "மகசூல் / ஏக்கர்",
    estimatedInputCost: "உற்பத்தி செலவு",
    projectedNetProfit: "நிகர லாபம்",
    bestHarvestWindow: "விற்பனை மாதம்",
    trendBullish: "விலை உயர்வு",
    trendBearish: "நிலையானது",
    perQuintal: "/ குவிண்டால்",
    advisoryVerdict: "விதைப்பு மற்றும் வானிலை ஆலோசனை",
    loginRegister: "உள்நுழைய / பதிவு செய்ய",
    allStatesPanchayats: "இந்தியாவின் அனைத்து மாநிலங்கள் & பஞ்சாயத்துகள்",
    selectStateInstruction: "வானிலை மற்றும் சந்தை விவரங்களுக்கு பஞ்சாயத்தைத் தேர்ந்தெடுக்கவும்.",
    autoDetectPanchayat: "GPS பயன்படுத்தவும்",
    searchStateOrPanchayat: "பஞ்சாயத்தைத் தேடவும்...",
    selectState: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்"
  }
};
