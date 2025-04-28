const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  category: { type: String, enum: ['Safety', 'Cleanliness', 'Ragging', 'General'], required: true },
  description: { type: String, required: true },
  images: [{ type: String }], // Filepaths of uploaded images
  document: { type: String }, // If PDF/Doc uploaded
  status: { type: String, enum: ['Pending', 'Closed'], default: 'Pending' },
  adminNotes: { type: String },
  solutionProof: { type: String }, // Proof photo path
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
