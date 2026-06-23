const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getUserDashboard } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.get('/dashboard', protect, getUserDashboard);

module.exports = router;
