// models/Appointment.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    patient: {
      type: String, // Clerk User ID for the patient
      required: true,
    },
    doctor: {
      type: String, // Clerk User ID for the doctor or reference to a Doctor collection
      required: true,
    },
    appointmentDateTime: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
      default: 'scheduled',
    },
    patientRecord: {
      type: String
    },

    prescription: {
        type: [String]
      },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
