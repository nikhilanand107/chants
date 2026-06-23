const express = require('express');
const router = express.Router();
const { getNearbyTemples } = require('../controllers/templeController');

router.get('/nearby', getNearbyTemples);

module.exports = router;
