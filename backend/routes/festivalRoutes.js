const express = require('express');
const router = express.Router();
const { getFestivals } = require('../controllers/festivalController');

router.get('/', getFestivals);

module.exports = router;
