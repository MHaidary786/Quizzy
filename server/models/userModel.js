const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
  dob: {type: Date, required: true},
  otpCode: {type: String, required: false},
  otpExpiresAt: {type: Date, required: false},
  isVerified: {type: Boolean, default: false}
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
