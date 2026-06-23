const mongoose = require('mongoose');

const ChantSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  mantraId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mantra', required: true, index: true },
  count: { type: Number, required: true, min: 1 },
  goal: { type: Number, default: 108 },
  durationSeconds: { type: Number },
  status: { type: String, enum: ['completed', 'partial'], default: 'completed' }
}, { timestamps: true });

module.exports = mongoose.model('ChantSession', ChantSessionSchema);
