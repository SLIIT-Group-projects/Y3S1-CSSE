const mongoose = require("mongoose");
const User = require("./user");

const recordsSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true
    },
    userId: {
        type: String, 
        required: true
    },
    records: {
        type: String,
        required: true,
    },
    prescription: {
        type: [String],
        required: true,
    },
    specialNotes: {
        type: String,
        required: true,
    }
}, { timestamps: true });  // This option automatically adds createdAt and updatedAt fields

const Record = mongoose.model("Record", recordsSchema);
module.exports = Record;
