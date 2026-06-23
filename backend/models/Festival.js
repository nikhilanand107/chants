const mongoose = require('mongoose');

const FestivalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true, index: true },
  associatedDeityIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deity' }],
  rituals: [{ type: String }],
  significance: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Festival', FestivalSchema);
