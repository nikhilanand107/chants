const mongoose = require('mongoose');

const AartiSchema = new mongoose.Schema({
  title: { type: String, required: true },
  deityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deity', required: true, index: true },
  lyrics: [{
    stanzaNumber: Number,
    originalText: String,
    transliteration: String,
    translation: String
  }],
  audioFileUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Aarti', AartiSchema);
