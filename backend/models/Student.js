const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  enrollmentNo: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  college: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Password Hashing
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password Compare
studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Student', studentSchema);
