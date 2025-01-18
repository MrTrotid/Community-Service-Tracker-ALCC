// Placeholder for User model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  serviceHours: { type: Number, default: 50 },
  role: { type: String, default: 'student' }
});

module.exports = mongoose.model('User', userSchema);