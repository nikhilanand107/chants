const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { uploadImage, uploadAudio } = require('../middleware/uploadMiddleware');
const {
  uploadDeityImage,
  uploadMantraAudio,
  uploadAartiAudio,
  createDeity,
  createMantra,
  getAnalytics,
} = require('../controllers/adminController');

// All routes require auth + admin role
router.use(protect, admin);

// Content management
router.post('/deities', createDeity);
router.post('/mantras', createMantra);

// Cloudinary upload routes
router.post('/deities/:id/upload-image', uploadImage.single('image'), uploadDeityImage);
router.post('/mantras/:id/upload-audio', uploadAudio.single('audio'), uploadMantraAudio);
router.post('/aartis/:id/upload-audio', uploadAudio.single('audio'), uploadAartiAudio);

// Analytics
router.get('/analytics', getAnalytics);

module.exports = router;
