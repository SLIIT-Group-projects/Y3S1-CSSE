const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
