const Festival = require('../models/Festival');

// @desc    Get all festivals sorted by upcoming date
// @route   GET /api/v1/festivals
// @access  Public
const getFestivals = async (req, res) => {
  try {
    const festivals = await Festival.find({})
      .populate('associatedDeityIds', 'name slug')
      .sort({ date: 1 });
      
    res.json({ success: true, count: festivals.length, data: festivals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getFestivals };
