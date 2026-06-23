const express = require('express');
const router = express.Router();
const { createChantSession, getChantSessionsHistory, getChantStats } = require('../controllers/chantController');
const { protect } = require('../middleware/authMiddleware');

// Secure all routes in this router
router.use(protect);

router.post('/sessions', createChantSession);
router.get('/sessions/history', getChantSessionsHistory);
router.get('/stats', getChantStats);

module.exports = router;
