const mongoose = require('mongoose');

const ChalisaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  deityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deity', required: true },
  audioFileUrl: { type: String },
  verses: [
    {
      verseNumber: { type: Number, required: true },
      type: { type: String, enum: ['doha', 'chaupai'], default: 'chaupai' },
      originalText: { type: String, required: true },
      transliteration: { type: String },
      translation: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Chalisa', ChalisaSchema);
