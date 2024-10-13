// /routes/blogRoutes.js
const express = require("express");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const Appointment = require("../models/appointment");

const router = express.Router();

// POST request to create a new doctor
router.post(
  "/create-appointment",
  ClerkExpressRequireAuth(),
  async (req, res) => {
    const clerkUserId = req.auth.userId;
    try {
        
      const {patient_name,patient_email,doctor_name,doc_id, day, slot,appointment_date,note,status } = req.body;

      const current_date = new Date();

      // Create a new doctor record
      const newAppointment = new Appointment({
        clerkUserId,
        patient_name,
        patient_email,
        doctor_name,
        doc_id,
        day,
        slot,
        appointment_date,
        note,
        current_date,
        status
      });

      // Save the new Appointment to the database
      await newAppointment.save();

      res.status(201).json({ message: "Appointment created successfully", appointment: newAppointment });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
