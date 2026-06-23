const cron = require('node-cron');
const Panchang = require('../models/Panchang');
const { fetchPanchangFromAPI } = require('../services/panchangService');

// Helper to format date to YYYY-MM-DD
const formatDate = (dateObj) => {
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dateObj.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const initPanchangCron = () => {
  // Run every day at 12:05 AM
  cron.schedule('5 0 * * *', async () => {
    console.log('[Cron] Running daily Panchang fetch job...');
    try {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const datesToFetch = [formatDate(today), formatDate(tomorrow)];

      for (const date of datesToFetch) {
        // Check if it already exists
        const exists = await Panchang.findOne({ date });
        if (!exists) {
          console.log(`[Cron] Fetching Panchang for ${date}...`);
          const apiData = await fetchPanchangFromAPI(date);
          
          await Panchang.create({
            date,
            tithi: apiData.tithi,
            paksha: apiData.paksha,
            nakshatra: apiData.nakshatra,
            yoga: apiData.yoga,
            sunrise: apiData.sunrise,
            sunset: apiData.sunset,
            festivals: apiData.festivals || []
          });
          console.log(`[Cron] Saved Panchang for ${date}.`);
        } else {
          console.log(`[Cron] Panchang for ${date} already exists in DB.`);
        }
      }
    } catch (error) {
      console.error('[Cron] Error running Panchang fetch job:', error.message);
    }
  });
  
  console.log('Panchang cron job initialized (runs daily at 12:05 AM).');
};

module.exports = initPanchangCron;
