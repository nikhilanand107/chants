const mongoose = require('mongoose');

const MantraSchema = new mongoose.Schema({
  title: { type: String, required: true },
  deityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deity', required: true, index: true },
  sanskritText: { type: String, required: true },
  transliteration: { type: String, required: true },
  meaning: { type: String, required: true },
  explanation: { type: String },
  audioFileUrl: { type: String },
  benefits: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Mantra', MantraSchema);
