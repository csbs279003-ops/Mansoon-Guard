export interface AgriImageItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  caption?: string;
  tag?: string;
}

export const AGRI_HERO_IMAGES = {
  farmerPortrait: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1200&q=80', // Dignified Indian farmer in green field
  monsoonField: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80', // Lush agricultural field with clouds
  paddyTerraces: 'https://images.unsplash.com/photo-1536780250812-9c4174b7f140?auto=format&fit=crop&w=1200&q=80', // Verdant rice paddies
  villageCommunity: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80', // Rural community farm
};

export const CROP_REFERENCE_IMAGES: Record<string, AgriImageItem> = {
  cotton: {
    id: 'cotton',
    title: 'Bt Cotton (कपास / Bt పత్తి)',
    subtitle: 'Deep taproot, vulnerable to premature false-onset sowing',
    url: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80',
    caption: 'Requires at least 50-60mm deep soil moisture profile for sustained germination.',
    tag: 'Black Cotton Regur Soil'
  },
  soybean: {
    id: 'soybean',
    title: 'Soybean (सोयाबीन / சோயாபீன்)',
    subtitle: 'Delicate seed coat, high moisture sensitivity in first 10 days',
    url: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23d83?auto=format&fit=crop&w=800&q=80',
    caption: 'If sown during isolated pre-monsoon showers, 12-day dry spell causes 100% germination failure.',
    tag: 'High Re-sowing Risk'
  },
  paddy: {
    id: 'paddy',
    title: 'Paddy / Rice (धान / भात / நெல்)',
    subtitle: 'High water requirement, nursery bed vs direct seeded (DSR)',
    url: 'https://images.unsplash.com/photo-1536780250812-9c4174b7f140?auto=format&fit=crop&w=800&q=80',
    caption: 'Transplanting requires assured standing water; direct seeding requires calibrated moisture.',
    tag: 'Canal & Basin Irrigation'
  },
  groundnut: {
    id: 'groundnut',
    title: 'Groundnut (मूंगफली / भुईमूग / వేరుశనగ)',
    subtitle: 'Pod development requires loose, well-drained sandy loam',
    url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    caption: 'Sensitive to crust formation and waterlogging in early stages.',
    tag: 'Sandy Loam & Red Soil'
  },
  pulses: {
    id: 'pulses',
    title: 'Red Gram / Tur (तूर / अरहर / కందులు)',
    subtitle: 'Drought-hardy deep root system, ideal intercrop with cotton',
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    caption: 'Intercropped to hedge against prolonged dry breaks; enriches soil nitrogen.',
    tag: 'Drought Resilient'
  },
  millets: {
    id: 'millets',
    title: 'Pearl Millet / Bajra (बाजरा / बाजरी)',
    subtitle: 'Exceptional heat and drought tolerance with low water need',
    url: 'https://images.unsplash.com/photo-1607672632458-9eb56696346b?auto=format&fit=crop&w=800&q=80',
    caption: 'Consumes 65% less water than rice; matures within 75–85 days.',
    tag: 'Nutri-Cereal'
  },
  wheat: {
    id: 'wheat',
    title: 'Wheat (गेहूं / गहू / గోధుమలు)',
    subtitle: 'Rabi season staple crop requiring critical crown root irrigation',
    url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    caption: 'Optimal yield relies on timed water release during crown root initiation (CRI).',
    tag: 'Alluvial Basin'
  },
  mustard: {
    id: 'mustard',
    title: 'Mustard (सरसों / मोहरी / ఆవాలు)',
    subtitle: 'High oilseed value with modest protective irrigation',
    url: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=800&q=80',
    caption: 'Low pest incidence and thrives in cool winter temperatures.',
    tag: 'Oilseed MSP Crop'
  },
  sugarcane: {
    id: 'sugarcane',
    title: 'Sugarcane (गन्ना / ऊस / చెరకు)',
    subtitle: 'Perennial heavy water crop needing strict drip scheduling',
    url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    caption: 'Drip automation saves up to 45% canal water compared to furrow flooding.',
    tag: 'Heavy Feeder'
  }
};

export const IRRIGATION_REFERENCE_IMAGES = {
  drip: {
    title: 'Precision Drip Irrigation',
    url: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80',
    desc: 'Direct root-zone micro-emitters. Runs 90-120 mins to save up to 60% water.'
  },
  sprinkler: {
    title: 'Overhead Sprinkler System',
    url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    desc: 'Uniform droplet distribution for pulses and oilseeds on undulating terrains.'
  },
  floodPump: {
    title: 'Borewell & Canal Pump Head',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    desc: '5 HP submersible pump flood irrigation; automated shutoff saves power.'
  }
};

export const HYDROLOGY_REFERENCE_IMAGES = {
  riverCanal: {
    title: 'Irrigation Canal Discharge',
    url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    desc: 'Regulated gravity canal network supplying secondary distributor channels.'
  },
  reservoirStorage: {
    title: 'Dam Water Reservoir',
    url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    desc: 'Live basin telemetry measuring live storage capacity against historical averages.'
  }
};

export const MARKET_REFERENCE_IMAGES = {
  mandiAuction: {
    title: 'APMC Grain Market & e-NAM Trading',
    url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80',
    desc: 'Transparent modal price discovery verified across state agricultural markets.'
  }
};

export const DESICCATION_REFERENCE_IMAGES = {
  dryCracks: {
    title: 'Premature Sown Root Desiccation',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    desc: 'Shallow root trapped in top 8cm dry crust during post-onset rain break.'
  },
  healthySeedling: {
    title: 'Optimal Deep Root Establishment',
    url: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=800&q=80',
    desc: 'Deep 25cm taproot penetrating moist subsoil during true monsoon revival.'
  }
};
