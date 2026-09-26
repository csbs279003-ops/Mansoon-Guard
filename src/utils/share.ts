import { PanchayatData, CropType, Language } from '../types';
import { APP_TRANSLATIONS } from '../data/translations';
import { playHapticSound } from './audio';

export function generateLocalizedAlertText(
  panchayat: PanchayatData,
  cropKey: CropType,
  lang: Language
): string {
  const crop = panchayat.crops[cropKey] || Object.values(panchayat.crops)[0];
  const t = APP_TRANSLATIONS[lang] || APP_TRANSLATIONS.en;
  const river = panchayat.riverWater;

  if (lang === 'mr') {
    return `🚨 [मान्सून गार्ड] अति-स्थानिक शेती व नदी जल इशारा
📍 ग्रामपंचायत: ${panchayat.nameRegional} (${panchayat.block}, यवतमाळ)
🌧️ पावसाची शक्यता: ${panchayat.rainfallProbability}%
⚠️ खोट्या मान्सूनचा धोका (False Onset): ${panchayat.falseOnsetRisk}%
☀️ पावसाचा खंड: ${panchayat.drySpellRisk}% (${panchayat.breakDurationDays} दिवस)
🌊 नदी पातळी: ${river ? `${river.riverNameRegional} - गेज ${river.gaugeHeightMeters}m (${river.statusLabel})` : 'पैनगंगा खोरे'}
📢 निर्णायक सल्ला: ${crop.decision === 'WAIT' ? 'थांबा / पेरणी करू नका (WAIT)' : crop.decision === 'SOW' ? 'पेरणी सुरू करा (SOW)' : 'ओलावा संरक्षण करा (PROTECT)'}
🌾 पीक: ${crop.nameRegional}
💡 कारण: सुरुवातीच्या पावसानंतर ${panchayat.breakDurationDays} दिवस तीव्र कोरडा काळ येणार आहे. घाईत पेरल्यास बी जळून दुबार पेरणीचा ₹${crop.seedCostSavedPerAcre}/एकर फटका बसेल.
🌱 खरी पेरणी वेळ: ${crop.recommendedRevivalWindow}
📞 ग्रामपंचायत कार्यालय हेल्पलाइन: ${panchayat.officeInfo?.helplinePhone || '1800-180-1551'}`;
  }

  if (lang === 'hi') {
    return `🚨 [मानसून गार्ड] अति-स्थानीय कृषि मौसम एवं नदी जल चेतावनी
📍 ग्राम पंचायत: ${panchayat.name} (${panchayat.block}, यवतमाल)
🌧️ वर्षा की संभावना: ${panchayat.rainfallProbability}%
⚠️ झूठे मानसून का जोखिम: ${panchayat.falseOnsetRisk}%
☀️ सूखे का दौर: ${panchayat.drySpellRisk}% (${panchayat.breakDurationDays} दिन)
🌊 नदी जलस्तर: ${river ? `${river.riverName} - गेज ${river.gaugeHeightMeters}m (${river.statusLabel})` : 'पैनगंगा बेसिन'}
📢 कृषि निर्णय: ${crop.decision === 'WAIT' ? 'प्रतीक्षा करें (WAIT)' : crop.decision === 'SOW' ? 'बोवाई करें (SOW)' : 'संरक्षण करें (PROTECT)'}
🌾 फसल: ${crop.name}
💡 कारण: अगले ${panchayat.breakDurationDays} दिन तेज धूप और सूखा रहेगा। जल्दबाजी में बोने पर ₹${crop.seedCostSavedPerAcre}/एकड़ का बीज नुकसान होगा।
🌱 सुरक्षित बोवाई समय: ${crop.recommendedRevivalWindow}
📞 किसान हेल्पलाइन: ${panchayat.officeInfo?.helplinePhone || '1800-180-1551'}`;
  }

  if (lang === 'te') {
    return `🚨 [మాన్సూన్ గార్డ్] అతి-స్థానిక వ్యవసాయ మరియు నది నీటి హెచ్చరిక
📍 పంచాయతీ: ${panchayat.name} (${panchayat.block})
🌧️ వర్షపాత సంభావ్యత: ${panchayat.rainfallProbability}%
⚠️ నకిలీ వర్షం ప్రమాదం: ${panchayat.falseOnsetRisk}%
☀️ వర్షపు విరామం: ${panchayat.drySpellRisk}% (${panchayat.breakDurationDays} రోజులు)
🌊 నది నీటిమట్టం: ${river ? `${river.riverName} (${river.gaugeHeightMeters}m)` : 'పెంగంగా బేసిన్'}
📢 కీలక సలహా: ${crop.decision === 'WAIT' ? 'వేచి ఉండండి (WAIT)' : crop.decision === 'SOW' ? 'విత్తండి (SOW)' : 'రక్షించండి (PROTECT)'}
🌾 పంట: ${crop.name}
💡 సిఫార్సు చేయబడిన విత్తే సమయం: ${crop.recommendedRevivalWindow}
📞 హెల్ప్‌లైన్: ${panchayat.officeInfo?.helplinePhone || '1800-180-1551'}`;
  }

  if (lang === 'ta') {
    return `🚨 [மான்சூன் கார்ட்] உள்ளூர் வேளாண் வானிலை & ஆற்று நீர் எச்சரிக்கை
📍 ஊராட்சி: ${panchayat.name} (${panchayat.block})
🌧️ மழை வாய்ப்பு: ${panchayat.rainfallProbability}%
⚠️ போலி பருவமழை ஆபத்து: ${panchayat.falseOnsetRisk}%
☀️ வறட்சி இடைவெளி: ${panchayat.drySpellRisk}% (${panchayat.breakDurationDays} நாட்கள்)
🌊 ஆற்று நீர்மட்டம்: ${river ? `${river.riverName} (${river.gaugeHeightMeters}m)` : 'பென்கங்கா படுகை'}
📢 வேளாண் முடிவு: ${crop.decision === 'WAIT' ? 'காத்திருக்கவும் (WAIT)' : crop.decision === 'SOW' ? 'விதைக்கவும் (SOW)' : 'பாதுகாக்கவும் (PROTECT)'}
🌾 பயிர்: ${crop.name}
💡 பாதுகாப்பான விதைப்பு காலம்: ${crop.recommendedRevivalWindow}
📞 உதவி எண்: ${panchayat.officeInfo?.helplinePhone || '1800-180-1551'}`;
  }

  // English fallback
  return `🚨 [MONSOON GUARD] Hyperlocal Agromet & River Water Warning
📍 Panchayat: ${panchayat.name} (${panchayat.block} Block)
🌧️ Rainfall Probability: ${panchayat.rainfallProbability}%
⚠️ False-Onset Risk: ${panchayat.falseOnsetRisk}%
☀️ Dry-Spell Break: ${panchayat.drySpellRisk}% (${panchayat.breakDurationDays} Days)
🌊 River Basin Water: ${river ? `${river.riverName} - Gauge ${river.gaugeHeightMeters}m (${river.statusLabel})` : 'Penganga Basin'}
📢 VERDICT: ${crop.decision}
🌾 Crop: ${crop.name}
💡 Analysis: Initial rain is followed by a severe ${panchayat.breakDurationDays}-day dry spell. Premature sowing risks seedling desiccation and ₹${crop.seedCostSavedPerAcre}/acre seed loss.
🌱 Recommended True Sowing Window: ${crop.recommendedRevivalWindow}
📞 Panchayat Kisan Helpline: ${panchayat.officeInfo?.helplinePhone || '1800-180-1551'}`;
}

export function openWhatsAppShare(text: string, phone: string = '') {
  playHapticSound('success');
  const encoded = encodeURIComponent(text);
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const url = cleanPhone 
    ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`
    : `https://api.whatsapp.com/send?text=${encoded}`;
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

export function openRealSmsShare(text: string, phone: string = '') {
  playHapticSound('success');
  const encoded = encodeURIComponent(text);
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const separator = isIOS ? '&' : '?';
  const url = cleanPhone ? `sms:${cleanPhone}${separator}body=${encoded}` : `sms:${separator}body=${encoded}`;
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
}

export async function shareOrCopy(text: string, title: string = 'Monsoon Guard Alert'): Promise<boolean> {
  playHapticSound('tap');
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title,
        text,
      });
      return true;
    } catch {
      // User cancelled or unsupported, fallback to clipboard
    }
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      playHapticSound('success');
      return true;
    } catch {
      return false;
    }
  }
  return false;
}
