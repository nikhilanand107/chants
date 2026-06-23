const express = require('express');
const router = express.Router();
const { 
  getDeities, 
  getDeityBySlug, 
  getDeityMantras, 
  getDeityAartis, 
  getMantras, 
  getAartis,
  getDeityChalisas,
  getChalisas
} = require('../controllers/spiritualController');

router.get('/deities', getDeities);
router.get('/deities/:slug', getDeityBySlug);
router.get('/deities/:slug/mantras', getDeityMantras);
router.get('/deities/:slug/aartis', getDeityAartis);
router.get('/deities/:slug/chalisas', getDeityChalisas);
router.get('/mantras', getMantras);
router.get('/aartis', getAartis);
router.get('/chalisas', getChalisas);

module.exports = router;
