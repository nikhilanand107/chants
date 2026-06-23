const mongoose = require('mongoose');

const TempleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  address: { type: String, required: true },
  timing: { type: String },
  deityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deity' },
  imageUrl: { type: String }
}, { timestamps: true });

// Geospatial 2dsphere index for location coordinate distance searches
TempleSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Temple', TempleSchema);
