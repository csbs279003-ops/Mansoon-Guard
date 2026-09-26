export type Language = 'en' | 'hi' | 'mr' | 'te' | 'ta';

export type UserRole = 'farmer' | 'officer' | 'kvk';

export type ScreenId = 
  | 'panchayat-select'
  | 'risk-outlook'
  | 'crop-advisory'
  | 'irrigation-schedule'
  | 'river-water'
  | 'risk-map'
  | 'delivery-hub'
  | 'public-broadcast'
  | 'panchayat-office'
  | 'validate-learn';

export type CropType = 
  | 'cotton' 
  | 'soybean' 
  | 'paddy' 
  | 'groundnut' 
  | 'pulses' 
  | 'millets' 
  | 'maize' 
  | 'sugarcane'
  | 'wheat'
  | 'mustard';

export type AdvisoryDecision = 'SOW' | 'WAIT' | 'PROTECT';

export type WaterAvailabilityStatus = 'critical_deficit' | 'low' | 'moderate' | 'optimal' | 'flood_alert';

export interface CropMarketPrice {
  mandiName: string;
  modalPricePerQuintal: number; // e.g. ₹7,250
  mspPricePerQuintal: number; // e.g. ₹7,121 (MSP 2026)
  priceTrend: 'BULLISH' | 'BEARISH' | 'STABLE';
  percentageChange7d: number; // e.g. +4.2%
  projectedYieldQuintalsPerAcre: number; // e.g. 9.5
  estGrossRevenuePerAcre: number; // e.g. ₹68,875
  estInputCostPerAcre: number; // e.g. ₹22,000
  netProfitPerAcre: number; // e.g. ₹46,875
  peakArrivalMonths: string; // e.g. "October - December"
  demandForecast: string; // e.g. "Strong domestic demand & MSP procurement assured"
}

export interface RecommendedCrop {
  cropKey: CropType;
  cropName: string;
  cropNameRegional: string;
  suitabilityScore: number; // 0 - 100
  waterNeedMm: number;
  durationDays: number;
  recommendationVerdict: 'HIGHLY_RECOMMENDED' | 'SUITABLE_WITH_IRRIGATION' | 'AVOID_WATER_DEFICIT';
  rationale: string;
  rationaleRegional: string;
  estimatedReturnPerAcre: number; // INR
  marketPrice: CropMarketPrice;
}

export interface IrrigationSchedule {
  id: string;
  panchayatId: string;
  currentSoilMoisturePercent: number; // e.g. 19%
  fieldCapacityPercent: number; // e.g. 35%
  wiltingPointPercent: number; // e.g. 12%
  dailyEvapotranspirationMm: number; // e.g. 5.6 mm/day
  upcomingRainfallMm: number; // e.g. 26 mm in next 3 days
  irrigationDecision: 'SKIP_RAIN_APPROACHING' | 'IRRIGATE_NOW' | 'DEFICIT_IRRIGATION_ONLY' | 'DELAY_2_DAYS';
  decisionHeadline: string;
  decisionHeadlineRegional: string;
  decisionRationale: string;
  decisionRationaleRegional: string;
  recommendedTiming: string; // e.g. "Tomorrow Early Morning (05:30 AM - 07:30 AM)"
  waterRequirementLitresPerAcre: number; // e.g. 36,000 L/acre
  dripRunTimeMinutes: number; // e.g. 90 mins
  sprinklerRunTimeMinutes: number; // e.g. 140 mins
  floodPumpRunTimeHours: number; // e.g. 2.0 hours (5 HP)
  costSavingsINR: number; // e.g. ₹580 saved in power/diesel
  soilDepthWetness: {
    zone: string;
    zoneRegional: string;
    depthCm: string;
    moisturePercent: number;
    status: 'CRITICAL_DRY' | 'ADEQUATE' | 'SATURATED';
  }[];
  weeklySchedule: {
    day: string;
    date: string;
    action: 'IRRIGATE' | 'SKIP_RAIN' | 'REST' | 'LIGHT_DRIP';
    amountMm: number;
    rainExpectedMm: number;
    notes: string;
  }[];
}

export interface RiverWaterData {
  riverName: string;
  riverNameRegional: string;
  basin: string;
  nearestCanal: string;
  storageLevelPercent: number;
  currentDischargeCusecs: number;
  gaugeHeightMeters: number;
  normalGaugeHeightMeters: number;
  status: WaterAvailabilityStatus;
  statusLabel: string;
  groundwaterDepthMeters: number;
  rainfallCatchmentLast48hMm: number;
  forecastSupplyNext15Days: string;
  recommendedCrops: RecommendedCrop[];
}

export interface PanchayatOfficeInfo {
  officeName: string;
  officeNameRegional: string;
  currentStatus: 'OPEN' | 'IN_FIELD_VISIT' | 'CLOSED';
  statusReason: string;
  workingHours: string;
  buildingLocation: string;
  officersOnDuty: {
    role: string;
    roleRegional: string;
    name: string;
    phone: string;
    status: 'AVAILABLE' | 'ON_FIELD_INSPECTION' | 'OFF_DUTY';
  }[];
  helplinePhone: string;
  emergencyHotline: string;
  seedBufferStock: {
    crop: string;
    availableBags: number;
    variety: string;
    subsidizedRatePerBag: number;
  }[];
  latestPublicAnnouncement: {
    timestamp: string;
    headline: string;
    details: string;
    urgent: boolean;
  };
}

export interface ClimateSignals {
  enso: {
    status: string;
    anomaly: string;
    signal: 'neutral' | 'el_nino' | 'la_nina';
  };
  iod: {
    status: string;
    index: string;
    signal: 'positive' | 'neutral' | 'negative';
  };
  mjo: {
    phase: number;
    amplitude: number;
    convectiveSupport: 'favorable' | 'moderate' | 'suppressed';
  };
  soilMoistureSMAP: {
    volumetricPercent: number;
    status: 'dry' | 'moderate' | 'saturated';
    deficitMm: number;
  };
  gpmPrecipitation: {
    last24hMm: number;
    intensity: string;
  };
}

export interface PanchayatData {
  id: string;
  name: string;
  nameRegional: string;
  block: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
  rainfallProbability: number;
  falseOnsetRisk: number;
  drySpellRisk: number;
  forecastConfidence: number;
  primaryAdvisory: AdvisoryDecision;
  totalRainfallExpectedMm: number;
  soilMoistureLevel: number;
  breakDurationDays: number;
  riverWater: RiverWaterData;
  irrigationSchedule: IrrigationSchedule;
  officeInfo: PanchayatOfficeInfo;
  falseOnsetTimeline: {
    day1to3: string;
    day4to15: string;
    day16to30: string;
  };
  crops: Record<string, {
    name: string;
    nameRegional: string;
    decision: AdvisoryDecision;
    rationale: string;
    rationaleRegional: string;
    seedCostSavedPerAcre: number;
    moistureThresholdMm: number;
    recommendedRevivalWindow: string;
    marketPrice?: CropMarketPrice;
  }>;
}

export interface FarmerUser {
  id: string;
  name: string;
  phone: string;
  state: string;
  district: string;
  block: string;
  panchayatId: string;
  panchayatName: string;
  farmSizeAcres: number;
  primaryCrop: CropType;
  soilType: 'black_cotton' | 'alluvial' | 'red_loamy' | 'sandy_loam' | 'clay';
  irrigationMethod: 'drip' | 'sprinkler' | 'canal_flood' | 'borewell_flood' | 'rainfed';
  isLoggedIn: boolean;
  avatarSeed?: string;
}

export interface ValidationRecord {
  id: string;
  date: string;
  panchayat: string;
  predictedRainMm: number;
  actualObservedMm: number;
  predictedFalseOnset: boolean;
  actualFalseOnsetOccurred: boolean;
  reporterName: string;
  reporterRole: string;
  status: 'verified' | 'calibrating';
  feedbackNotes: string;
}

export interface PrototypeWire {
  fromScreen: ScreenId;
  toScreen: ScreenId;
  trigger: string;
  description: string;
}
