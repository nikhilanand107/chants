const mongoose = require('mongoose');

const panchangSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true, // format: YYYY-MM-DD
  },
  tithi: {
    type: String,
    default: 'Unknown',
  },
  paksha: {
    type: String,
    default: 'Unknown',
  },
  nakshatra: {
    type: String,
    default: 'Unknown',
  },
  yoga: {
    type: String,
    default: 'Unknown',
  },
  sunrise: {
    type: String,
    default: '06:00 AM',
  },
  sunset: {
    type: String,
    default: '06:00 PM',
  },
  festivals: [{
    type: String,
  }]
}, {
  timestamps: true,
});

module.exports = mongoose.model('Panchang', panchangSchema);
