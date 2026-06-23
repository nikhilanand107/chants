const mongoose = require('mongoose');

const DeitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  stories: [{ title: String, content: String }],
  symbolism: [{ aspect: String, description: String }],
  festivals: [{ type: String }],
  vehicle: { type: String },
  weapon: { type: String },
  thumbnailUrl: { type: String },
  imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Deity', DeitySchema);
