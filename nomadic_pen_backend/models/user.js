const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  penName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: null },
  enrollmentDate: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;