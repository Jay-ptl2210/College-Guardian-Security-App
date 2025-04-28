const mongoose = require('mongoose');

const sosSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  location: { type: String },
  isActive: { type: Boolean, default: true },
  messagesSent: { type: Number, default: 0 }, // Max 3 messages
  emergencyMobile: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('SOS', sosSchema);
