
const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserDetailsSchema);
