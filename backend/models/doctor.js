const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true },
  name: { type: String, required: true },
  day: { type: [String], required: true },  
  slot: { type: [String], required: true }, 
});

module.exports = mongoose.model("Doctor", DoctorSchema);
