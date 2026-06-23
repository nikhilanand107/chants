const Deity = require('../models/Deity');
const Mantra = require('../models/Mantra');
const Aarti = require('../models/Aarti');
const Chalisa = require('../models/Chalisa');

// @desc    Get all deities
// @route   GET /api/v1/spiritual/deities
// @access  Public
const getDeities = async (req, res) => {
  try {
    const deities = await Deity.find({});
    res.json({ success: true, count: deities.length, data: deities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single deity by slug
// @route   GET /api/v1/spiritual/deities/:slug
// @access  Public
const getDeityBySlug = async (req, res) => {
  try {
    const deity = await Deity.findOne({ slug: req.params.slug });

    if (!deity) {
      return res.status(404).json({ success: false, message: 'Deity not found' });
    }

    res.json({ success: true, data: deity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get mantras for a specific deity
// @route   GET /api/v1/spiritual/deities/:slug/mantras
// @access  Public
const getDeityMantras = async (req, res) => {
  try {
    const deity = await Deity.findOne({ slug: req.params.slug });

    if (!deity) {
      return res.status(404).json({ success: false, message: 'Deity not found' });
    }

    const mantras = await Mantra.find({ deityId: deity._id });
    res.json({ success: true, count: mantras.length, data: mantras });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get aartis for a specific deity
// @route   GET /api/v1/spiritual/deities/:slug/aartis
// @access  Public
const getDeityAartis = async (req, res) => {
  try {
    const deity = await Deity.findOne({ slug: req.params.slug });

    if (!deity) {
      return res.status(404).json({ success: false, message: 'Deity not found' });
    }

    const aartis = await Aarti.find({ deityId: deity._id });
    res.json({ success: true, count: aartis.length, data: aartis });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all mantras (global list/search)
// @route   GET /api/v1/spiritual/mantras
// @access  Public
const getMantras = async (req, res) => {
  try {
    const search = req.query.search || '';
    const query = search 
      ? { $or: [{ title: { $regex: search, $options: 'i' } }, { transliteration: { $regex: search, $options: 'i' } }] }
      : {};

    const mantras = await Mantra.find(query).populate('deityId', 'name slug');
    res.json({ success: true, count: mantras.length, data: mantras });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all aartis (global list/search)
// @route   GET /api/v1/spiritual/aartis
// @access  Public
const getAartis = async (req, res) => {
  try {
    const search = req.query.search || '';
    const query = search 
      ? { title: { $regex: search, $options: 'i' } } 
      : {};

    const aartis = await Aarti.find(query).populate('deityId', 'name slug');
    res.json({ success: true, count: aartis.length, data: aartis });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get chalisas for a specific deity
// @route   GET /api/v1/spiritual/deities/:slug/chalisas
// @access  Public
const getDeityChalisas = async (req, res) => {
  try {
    const deity = await Deity.findOne({ slug: req.params.slug });

    if (!deity) {
      return res.status(404).json({ success: false, message: 'Deity not found' });
    }

    const chalisas = await Chalisa.find({ deityId: deity._id });
    res.json({ success: true, count: chalisas.length, data: chalisas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all chalisas (global list/search)
// @route   GET /api/v1/spiritual/chalisas
// @access  Public
const getChalisas = async (req, res) => {
  try {
    const search = req.query.search || '';
    const query = search 
      ? { title: { $regex: search, $options: 'i' } } 
      : {};

    const chalisas = await Chalisa.find(query).populate('deityId', 'name slug');
    res.json({ success: true, count: chalisas.length, data: chalisas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDeities,
  getDeityBySlug,
  getDeityMantras,
  getDeityAartis,
  getMantras,
  getAartis,
  getDeityChalisas,
  getChalisas,
};
