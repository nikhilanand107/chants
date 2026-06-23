const Temple = require('../models/Temple');

// @desc    Get nearby temples within a given radius using geospatial indexing
// @route   GET /api/v1/temples/nearby
// @access  Public
const getNearbyTemples = async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    const radiusMeters = parseFloat(req.query.radiusMeters) || 50000; // Default: 50 KM

    if (isNaN(lat) || isNaN(lng)) {
      // If coordinates are not provided, return all temples as a fallback list
      const temples = await Temple.find({}).populate('deityId', 'name slug');
      return res.json({ 
        success: true, 
        count: temples.length, 
        isFallback: true, 
        data: temples 
      });
    }

    const temples = await Temple.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: radiusMeters
        }
      }
    }).populate('deityId', 'name slug');

    res.json({ 
      success: true, 
      count: temples.length, 
      isFallback: false, 
      data: temples 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getNearbyTemples };
