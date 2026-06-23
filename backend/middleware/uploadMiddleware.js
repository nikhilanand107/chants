const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Storage config for deity/temple images
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'spiritual_companion/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }],
  },
});

// Storage config for audio files (mantras, aartis)
const audioStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'spiritual_companion/audio',
    resource_type: 'video', // Cloudinary uses 'video' for audio files
    allowed_formats: ['mp3', 'wav', 'ogg', 'm4a'],
  },
});

// Multer middleware instances
const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

const uploadAudio = multer({
  storage: audioStorage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB limit
});

module.exports = { uploadImage, uploadAudio };
