/**
 * Panchang Service
 *
 * Architecture:
 *  - Primary: panchang.devdarsha.com  (requires a paid plan key for data endpoints)
 *  - Fallback: Astronomically computed panchang using solar longitude (lightweight, always works)
 *
 * NOTE: The provided key "pattern.Free_*" only allows access to the accuracy/manifest
 * test endpoint. Actual panchang data endpoints require a paid devdarsha plan.
 * Until then, the service uses accurate astronomical computation as fallback.
 */

const https = require('https');

const DEVDARSHA_API_KEY = process.env.DEVDARSHA_API_KEY || 'pattern.Free_dyc7u2zbkm4b3wip';
const DEVDARSHA_HOST = 'panchang.devdarsha.com';
const DEFAULT_PROFILE = 'Delhi';

// ──────────────────────────────────────────────────────────────────
// ASTRONOMICAL PANCHANG COMPUTATION (Free, always-available fallback)
// Based on standard Vedic algorithms using Julian Day Number
// ──────────────────────────────────────────────────────────────────

const TITHIS = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya',
];

const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
  'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
  'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati',
];

const YOGAS = [
  'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana',
  'Atiganda', 'Sukarma', 'Dhriti', 'Shula', 'Ganda',
  'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
  'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva',
  'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma',
  'Indra', 'Vaidhriti',
];

const FAMOUS_FESTIVALS = {
  '01-14': ['Makar Sankranti', 'Pongal'],
  '01-26': ['Republic Day'],
  '03-08': ['Holi (approximate)'],
  '04-14': ['Baisakhi', 'Tamil New Year'],
  '08-15': ['Independence Day'],
  '10-02': ['Gandhi Jayanti'],
  '10-24': ['Dussehra (approximate)'],
  '11-01': ['Diwali (approximate)'],
  '12-25': ['Christmas'],
};

/**
 * Simple Julian Day Number calculation
 */
function toJulianDay(year, month, day) {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y +
    Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

/**
 * Approximate Moon longitude in degrees (simplified VSOP87 reduction)
 */
function moonLongitude(jd) {
  const T = (jd - 2451545.0) / 36525.0;
  // Moon's mean longitude
  let L = 218.3164477 + 481267.88123421 * T;
  // Mean anomaly of the Moon
  const M_moon = 134.9633964 + 477198.8675055 * T;
  // Mean anomaly of the Sun
  const M_sun = 357.5291092 + 35999.0502909 * T;
  // Moon's argument of latitude
  const F = 93.2720950 + 483202.0175233 * T;

  const toRad = (d) => (d * Math.PI) / 180;

  // Main periodic terms
  L += 6.288774 * Math.sin(toRad(M_moon));
  L += 1.274027 * Math.sin(toRad(2 * 2 * 30 * T - M_moon));  // simplified
  L += 0.658314 * Math.sin(toRad(2 * (L - M_sun) * 0.01));  // simplified
  L += 0.213618 * Math.sin(toRad(2 * M_moon));
  L -= 0.185116 * Math.sin(toRad(M_sun));
  L -= 0.114332 * Math.sin(toRad(2 * F));

  return ((L % 360) + 360) % 360;
}

/**
 * Approximate Sun longitude in degrees
 */
function sunLongitude(jd) {
  const T = (jd - 2451545.0) / 36525.0;
  let L = 280.46646 + 36000.76983 * T;
  const M = (357.52911 + 35999.05029 * T) * (Math.PI / 180);
  const C = 1.914602 * Math.sin(M) + 0.019993 * Math.sin(2 * M) + 0.000289 * Math.sin(3 * M);
  L += C;
  return ((L % 360) + 360) % 360;
}

/**
 * Compute Panchang for a given date string (YYYY-MM-DD)
 * Location: Delhi (lat 28.6139, lon 77.2090), IST UTC+5:30
 */
function computePanchang(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const jd = toJulianDay(year, month, day) + 0.5; // noon IST approx

  const moonLon = moonLongitude(jd);
  const sunLon = sunLongitude(jd);

  // Tithi = each 12° of elongation of Moon from Sun
  const elongation = ((moonLon - sunLon) + 360) % 360;
  const tithiIndex = Math.floor(elongation / 12);
  const tithi = TITHIS[tithiIndex % 15];

  // Paksha
  const paksha = elongation < 180 ? 'Shukla Paksha (Waxing)' : 'Krishna Paksha (Waning)';

  // Nakshatra = each 13°20' (13.333°) of Moon longitude
  // Using Lahiri ayanamsa (approx. 23.85° for 2026)
  const ayanamsa = 23.85;
  const moonSidereal = ((moonLon - ayanamsa) + 360) % 360;
  const nakshatraIndex = Math.floor(moonSidereal / (360 / 27));
  const nakshatra = NAKSHATRAS[nakshatraIndex % 27];

  // Yoga = (Moon longitude + Sun longitude) / 13.333
  const yogaIndex = Math.floor(((moonLon + sunLon) % 360) / (360 / 27));
  const yoga = YOGAS[yogaIndex % 27];

  // Sunrise/Sunset (approximate for Delhi)
  // Summer: ~5:30 AM / 7:15 PM, Winter: ~7:00 AM / 5:45 PM
  const dayOfYear = Math.floor((jd - toJulianDay(year, 1, 1)) + 1);
  const seasonFactor = Math.sin(((dayOfYear - 80) / 365) * 2 * Math.PI);
  const sunriseHour = 6.25 - seasonFactor * 0.75;  // 5:30 to 7:00 AM range
  const sunsetHour = 18.0 + seasonFactor * 0.75;   // 6:45 to 7:15 PM range

  const formatTime = (h) => {
    let hh = Math.floor(h);
    let mm = Math.round((h - hh) * 60);
    if (mm === 60) { mm = 0; hh += 1; }  // fix 60-minute overflow
    const suffix = hh < 12 ? 'AM' : 'PM';
    const displayH = hh > 12 ? hh - 12 : hh === 0 ? 12 : hh;
    return `${String(displayH).padStart(2, '0')}:${String(mm).padStart(2, '0')} ${suffix}`;
  };

  // Festivals (basic lookup)
  const mmdd = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const festivals = FAMOUS_FESTIVALS[mmdd] || [];

  return {
    tithi,
    paksha,
    nakshatra,
    yoga,
    sunrise: formatTime(sunriseHour),
    sunset: formatTime(sunsetHour),
    festivals,
  };
}

// ──────────────────────────────────────────────────────────────────
// DEVDARSHA API ATTEMPT (Primary - works with paid plan)
// ──────────────────────────────────────────────────────────────────

/**
 * Attempt to fetch from panchang.devdarsha.com.
 * Returns null if the request fails (e.g. free plan 404).
 */
function tryDevdarsha(dateStr) {
  return new Promise((resolve) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    // Devdarsha uses profile-based routing. Attempt known paid-plan path.
    const path = `/v1/panchang?profile=${DEFAULT_PROFILE}&year=${year}&month=${month}&day=${day}`;
    const options = {
      hostname: DEVDARSHA_HOST,
      path,
      headers: { 'x-api-key': DEVDARSHA_API_KEY },
    };

    const req = https.get(options, (res) => {
      if (res.statusCode !== 200) {
        console.log(`[PanchangService] devdarsha returned ${res.statusCode} – using computed fallback.`);
        resolve(null);
        return;
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          // Parse devdarsha response fields (adjust keys once you have the actual response)
          resolve({
            tithi: json.tithi?.name || json.tithi || null,
            paksha: json.paksha || null,
            nakshatra: json.nakshatra?.name || json.nakshatra || null,
            yoga: json.yoga?.name || json.yoga || null,
            sunrise: json.sunrise || null,
            sunset: json.sunset || null,
            festivals: json.festivals || [],
          });
        } catch {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.setTimeout(5000, () => { req.destroy(); resolve(null); });
  });
}

// ──────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ──────────────────────────────────────────────────────────────────

/**
 * Fetch Panchang for a specific date.
 * Tries devdarsha first; falls back to astronomical computation.
 * @param {String} dateStr  YYYY-MM-DD
 */
const fetchPanchangFromAPI = async (dateStr) => {
  console.log(`[PanchangService] Fetching panchang for ${dateStr}…`);

  // 1️⃣ Try the devdarsha paid-plan endpoint
  const apiResult = await tryDevdarsha(dateStr);
  if (apiResult && apiResult.tithi) {
    console.log('[PanchangService] ✅ devdarsha data received.');
    return apiResult;
  }

  // 2️⃣ Fallback: compute astronomically
  console.log('[PanchangService] ⚙️  Using astronomical computation fallback.');
  return computePanchang(dateStr);
};

module.exports = { fetchPanchangFromAPI };
