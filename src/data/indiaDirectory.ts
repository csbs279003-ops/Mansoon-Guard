import { PanchayatData, CropType, AdvisoryDecision } from '../types';

export interface StateInfo {
  code: string;
  name: string;
  nameHindi: string;
  region: 'North' | 'South' | 'West' | 'East' | 'Central';
  primaryBasin: string;
  majorCrops: CropType[];
  districts: {
    name: string;
    blocks: {
      name: string;
      panchayats: string[];
    }[];
  }[];
}

export const ALL_INDIAN_STATES: StateInfo[] = [
  {
    code: 'MH',
    name: 'Maharashtra',
    nameHindi: 'महाराष्ट्र',
    region: 'West',
    primaryBasin: 'Godavari / Penganga / Krishna',
    majorCrops: ['cotton', 'soybean', 'pulses', 'sugarcane', 'groundnut'],
    districts: [
      {
        name: 'Yavatmal',
        blocks: [
          { name: 'Ghatanji', panchayats: ['Tiwsala', 'Sayat', 'Lingi', 'Khadsangi', 'Yevati', 'Marathwakdi', 'Arvi', 'Kopri'] },
          { name: 'Pusad', panchayats: ['Wanwarla', 'Kumbhari', 'Shendi', 'Khandala'] },
          { name: 'Pandharkawada', panchayats: ['Kelapur', 'Bori', 'Karegaon', 'Mohda'] },
        ],
      },
      {
        name: 'Nashik',
        blocks: [
          { name: 'Niphad', panchayats: ['Pimpalgaon', 'Pimpalas', 'Kundewadi', 'Ozar'] },
          { name: 'Dindori', panchayats: ['Vani', 'Janori', 'Khedgaon', 'Mokhada'] },
        ],
      },
      {
        name: 'Chhatrapati Sambhajinagar',
        blocks: [
          { name: 'Paithan', panchayats: ['Pimpalwadi', 'Bidkin', 'Balepir', 'Dhorkin'] },
          { name: 'Gangapur', panchayats: ['Manjri', 'Lasur', 'Harsul', 'Bhendala'] },
        ],
      },
    ],
  },
  {
    code: 'PB',
    name: 'Punjab',
    nameHindi: 'पंजाब',
    region: 'North',
    primaryBasin: 'Sutlej / Beas Basin',
    majorCrops: ['paddy', 'wheat', 'cotton', 'maize', 'mustard'],
    districts: [
      {
        name: 'Ludhiana',
        blocks: [
          { name: 'Jagraon', panchayats: ['Aligarh', 'Kaonke Kalan', 'Sidhwan Bet', 'Bhundri'] },
          { name: 'Samrala', panchayats: ['Bondli', 'Machiwara', 'Kubba', 'Seh'] },
        ],
      },
      {
        name: 'Bathinda',
        blocks: [
          { name: 'Talwandi Sabo', panchayats: ['Bhagi Wander', 'Raman', 'Koreana', 'Jassi'] },
          { name: 'Maur', panchayats: ['Maisar Khana', 'Kotli Kalan', 'Mansa Khurd'] },
        ],
      },
    ],
  },
  {
    code: 'UP',
    name: 'Uttar Pradesh',
    nameHindi: 'उत्तर प्रदेश',
    region: 'North',
    primaryBasin: 'Ganga / Yamuna / Ghaghara',
    majorCrops: ['wheat', 'paddy', 'sugarcane', 'pulses', 'mustard'],
    districts: [
      {
        name: 'Varanasi',
        blocks: [
          { name: 'Pindra', panchayats: ['Kathiraon', 'Mangari', 'Phoolpur', 'Babatpur'] },
          { name: 'Sevapuri', panchayats: ['Kalikadham', 'Kapsethi', 'Chiraigaon'] },
        ],
      },
      {
        name: 'Gorakhpur',
        blocks: [
          { name: 'Bansgaon', panchayats: ['Uruwa', 'Khorabar', 'Pipraich', 'Sahjanwa'] },
        ],
      },
    ],
  },
  {
    code: 'MP',
    name: 'Madhya Pradesh',
    nameHindi: 'मध्य प्रदेश',
    region: 'Central',
    primaryBasin: 'Narmada / Chambal / Betwa',
    majorCrops: ['soybean', 'wheat', 'pulses', 'mustard', 'cotton'],
    districts: [
      {
        name: 'Ujjain',
        blocks: [
          { name: 'Barnagar', panchayats: ['Ingoriya', 'Jahangirpur', 'Sundarlak', 'Runeja'] },
          { name: 'Mahidpur', panchayats: ['Khedawad', 'Ghatia', 'Tarana'] },
        ],
      },
      {
        name: 'Sehore',
        blocks: [
          { name: 'Ashta', panchayats: ['Kothri', 'Jawar', 'Metwada', 'Khajuria'] },
        ],
      },
    ],
  },
  {
    code: 'GJ',
    name: 'Gujarat',
    nameHindi: 'गुजरात',
    region: 'West',
    primaryBasin: 'Narmada / Tapi / Sabarmati',
    majorCrops: ['cotton', 'groundnut', 'millets', 'mustard', 'pulses'],
    districts: [
      {
        name: 'Rajkot',
        blocks: [
          { name: 'Gondal', panchayats: ['Dholra', 'Bhojpara', 'Gomta', 'Kotda Sangani'] },
          { name: 'Jasdan', panchayats: ['Atkot', 'Vinchhiya', 'Bhadla'] },
        ],
      },
      {
        name: 'Anand',
        blocks: [
          { name: 'Petlad', panchayats: ['Dharmaj', 'Sojitra', 'Tarapur', 'Borsad'] },
        ],
      },
    ],
  },
  {
    code: 'KA',
    name: 'Karnataka',
    nameHindi: 'कर्नाटक',
    region: 'South',
    primaryBasin: 'Krishna / Cauvery / Tungabhadra',
    majorCrops: ['cotton', 'paddy', 'sugarcane', 'groundnut', 'millets'],
    districts: [
      {
        name: 'Dharwad',
        blocks: [
          { name: 'Hubballi', panchayats: ['Kusugal', 'Bhairidevarakoppa', 'Navalur', 'Unkal'] },
          { name: 'Kalghatgi', panchayats: ['Mishrikoti', 'Alnavar', 'Dummavada'] },
        ],
      },
      {
        name: 'Mandya',
        blocks: [
          { name: 'Maddur', panchayats: ['Besagarahalli', 'Koppa', 'Kikkeri', 'Srirangapatna'] },
        ],
      },
    ],
  },
  {
    code: 'AP',
    name: 'Andhra Pradesh',
    nameHindi: 'आंध्र प्रदेश',
    region: 'South',
    primaryBasin: 'Godavari / Krishna Delta',
    majorCrops: ['paddy', 'cotton', 'pulses', 'groundnut', 'millets'],
    districts: [
      {
        name: 'Guntur',
        blocks: [
          { name: 'Tenali', panchayats: ['Angalakuduru', 'Pedalanka', 'Chavali', 'Kolakaluru'] },
          { name: 'Narasaraopet', panchayats: ['Sattenapalle', 'Vinukonda', 'Chilakaluripet'] },
        ],
      },
    ],
  },
  {
    code: 'TG',
    name: 'Telangana',
    nameHindi: 'तेलंगाना',
    region: 'South',
    primaryBasin: 'Godavari / Krishna Basins',
    majorCrops: ['cotton', 'paddy', 'maize', 'pulses', 'soybean'],
    districts: [
      {
        name: 'Warangal',
        blocks: [
          { name: 'Narsampet', panchayats: ['Chennaraopet', 'Duggondi', 'Khanapur', 'Pakhal'] },
          { name: 'Parkal', panchayats: ['Atmakur', 'Geesugonda', 'Shayampet'] },
        ],
      },
    ],
  },
  {
    code: 'TN',
    name: 'Tamil Nadu',
    nameHindi: 'तमिलनाडु',
    region: 'South',
    primaryBasin: 'Cauvery / Vaigai',
    majorCrops: ['paddy', 'millets', 'groundnut', 'sugarcane', 'pulses'],
    districts: [
      {
        name: 'Thanjavur',
        blocks: [
          { name: 'Kumbakonam', panchayats: ['Papanasam', 'Thiruvidaimarudur', 'Swamimalai', 'Dharasuram'] },
          { name: 'Pattukkottai', panchayats: ['Madukkur', 'Peravurani', 'Adirampattinam'] },
        ],
      },
    ],
  },
  {
    code: 'RJ',
    name: 'Rajasthan',
    nameHindi: 'राजस्थान',
    region: 'North',
    primaryBasin: 'Indira Gandhi Canal / Chambal',
    majorCrops: ['millets', 'mustard', 'pulses', 'groundnut', 'wheat'],
    districts: [
      {
        name: 'Sri Ganganagar',
        blocks: [
          { name: 'Suratgarh', panchayats: ['Manaksar', 'Rajiasar', 'Birmana', 'Pilibanga'] },
          { name: 'Anupgarh', panchayats: ['Ramsinghpur', 'Gharsana', 'Rawatsar'] },
        ],
      },
    ],
  },
  {
    code: 'BR',
    name: 'Bihar',
    nameHindi: 'बिहार',
    region: 'East',
    primaryBasin: 'Ganga / Kosi / Gandak',
    majorCrops: ['paddy', 'maize', 'wheat', 'pulses', 'sugarcane'],
    districts: [
      {
        name: 'Muzaffarpur',
        blocks: [
          { name: 'Kanti', panchayats: ['Damodarpur', 'Marwan', 'Motipur', 'Sahebganj'] },
        ],
      },
    ],
  },
  {
    code: 'WB',
    name: 'West Bengal',
    nameHindi: 'पश्चिम बंगाल',
    region: 'East',
    primaryBasin: 'Hooghly / Damodar / Teesta',
    majorCrops: ['paddy', 'mustard', 'pulses', 'maize'],
    districts: [
      {
        name: 'Burdwan (Purba Bardhaman)',
        blocks: [
          { name: 'Kalna', panchayats: ['Dhatrigram', 'Anukha', 'Baghnapara', 'Samudragarh'] },
        ],
      },
    ],
  },
  {
    code: 'HR',
    name: 'Haryana',
    nameHindi: 'हरियाणा',
    region: 'North',
    primaryBasin: 'Yamuna / Ghaggar',
    majorCrops: ['wheat', 'paddy', 'mustard', 'cotton', 'sugarcane'],
    districts: [
      {
        name: 'Karnal',
        blocks: [
          { name: 'Gharaunda', panchayats: ['Bastara', 'Kutail', 'Chaura', 'Kohand'] },
        ],
      },
    ],
  },
  {
    code: 'OD',
    name: 'Odisha',
    nameHindi: 'ओडिशा',
    region: 'East',
    primaryBasin: 'Mahanadi Basin',
    majorCrops: ['paddy', 'pulses', 'groundnut', 'millets'],
    districts: [
      {
        name: 'Bargarh',
        blocks: [
          { name: 'Attabira', panchayats: ['Godbhaga', 'Lachhipur', 'Kadobahal', 'Paharsigira'] },
        ],
      },
    ],
  },
  {
    code: 'KL',
    name: 'Kerala',
    nameHindi: 'केरल',
    region: 'South',
    primaryBasin: 'Bharatappuzha / Periyar',
    majorCrops: ['paddy', 'sugarcane', 'pulses'],
    districts: [
      {
        name: 'Palakkad',
        blocks: [
          { name: 'Chittur', panchayats: ['Nallepilly', 'Pattanchery', 'Perumatty', 'Kozhinjampara'] },
        ],
      },
    ],
  },
];
