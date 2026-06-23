const Deity = require('../models/Deity');
const Mantra = require('../models/Mantra');
const Aarti = require('../models/Aarti');

// @desc    Upload/update deity image to Cloudinary
// @route   POST /api/v1/admin/deities/:id/upload-image
// @access  Private (Admin)
const uploadDeityImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const deity = await Deity.findByIdAndUpdate(
      req.params.id,
      {
        imageUrl: req.file.path,
        thumbnailUrl: req.file.path.replace('/upload/', '/upload/w_400,h_300,c_fill/')
      },
      { new: true }
    );

    if (!deity) {
      return res.status(404).json({ success: false, message: 'Deity not found' });
    }

    res.json({ success: true, data: deity, imageUrl: req.file.path });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Upload audio for a mantra to Cloudinary
// @route   POST /api/v1/admin/mantras/:id/upload-audio
// @access  Private (Admin)
const uploadMantraAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No audio file provided' });
    }

    const mantra = await Mantra.findByIdAndUpdate(
      req.params.id,
      { audioFileUrl: req.file.path },
      { new: true }
    );

    if (!mantra) {
      return res.status(404).json({ success: false, message: 'Mantra not found' });
    }

    res.json({ success: true, data: mantra, audioUrl: req.file.path });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Upload audio for an aarti to Cloudinary
// @route   POST /api/v1/admin/aartis/:id/upload-audio
// @access  Private (Admin)
const uploadAartiAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No audio file provided' });
    }

    const aarti = await Aarti.findByIdAndUpdate(
      req.params.id,
      { audioFileUrl: req.file.path },
      { new: true }
    );

    if (!aarti) {
      return res.status(404).json({ success: false, message: 'Aarti not found' });
    }

    res.json({ success: true, data: aarti, audioUrl: req.file.path });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create or update a deity entry (admin)
// @route   POST /api/v1/admin/deities
// @access  Private (Admin)
const createDeity = async (req, res) => {
  try {
    const deity = await Deity.create(req.body);
    res.status(201).json({ success: true, data: deity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a mantra (admin)
// @route   POST /api/v1/admin/mantras
// @access  Private (Admin)
const createMantra = async (req, res) => {
  try {
    const mantra = await Mantra.create(req.body);
    res.status(201).json({ success: true, data: mantra });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get platform analytics
// @route   GET /api/v1/admin/analytics
// @access  Private (Admin)
const getAnalytics = async (req, res) => {
  try {
    const User = require('../models/User');
    const ChantSession = require('../models/ChantSession');

    const [totalUsers, totalSessions, totalChants] = await Promise.all([
      User.countDocuments({}),
      ChantSession.countDocuments({}),
      ChantSession.aggregate([{ $group: { _id: null, total: { $sum: '$count' } } }])
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalSessions,
        totalChants: totalChants[0]?.total || 0,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  uploadDeityImage,
  uploadMantraAudio,
  uploadAartiAudio,
  createDeity,
  createMantra,
  getAnalytics,
};
