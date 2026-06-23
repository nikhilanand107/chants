const express = require('express');
const router = express.Router();
const { getPanchangByDate } = require('../controllers/panchangController');

router.get('/:date', getPanchangByDate);

module.exports = router;
