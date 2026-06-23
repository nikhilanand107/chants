const Panchang = require('../models/Panchang');
const { fetchPanchangFromAPI } = require('../services/panchangService');

/**
 * @desc    Get panchang for a specific date
 * @route   GET /api/v1/panchang/:date
 * @access  Public
 */
const getPanchangByDate = async (req, res) => {
  try {
    const { date } = req.params;
    
    // Validate date format simple regex (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ success: false, message: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    // 1. Check MongoDB first
    let panchang = await Panchang.findOne({ date });

    if (panchang) {
      return res.status(200).json({
        success: true,
        source: 'database',
        data: panchang
      });
    }

    // 2. If not in DB, fetch from external API
    const apiData = await fetchPanchangFromAPI(date);
    
    // 3. Save to MongoDB
    panchang = await Panchang.create({
      date,
      tithi: apiData.tithi,
      paksha: apiData.paksha,
      nakshatra: apiData.nakshatra,
      yoga: apiData.yoga,
      sunrise: apiData.sunrise,
      sunset: apiData.sunset,
      festivals: apiData.festivals || []
    });

    // 4. Return the data
    return res.status(200).json({
      success: true,
      source: 'api',
      data: panchang
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error fetching panchang data' });
  }
};

module.exports = {
  getPanchangByDate
};
