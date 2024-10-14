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

      const {patient_name,patient_email,age,doctor_name,doc_id, day, slot,appointment_date,note,status } = req.body;

      const current_date = new Date();

      // Create a new doctor record
      const newAppointment = new Appointment({
        clerkUserId,
        patient_name,
        patient_email,
        age,
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


// get appointments according to the doctor
router.get("/get-doctor-appointments", ClerkExpressRequireAuth(), async (req, res) => {
    const clerkUserId = req.auth.userId;
    const { doc_id } = req.query; // Get the doctor's ID from query parameters

    try {
        // Find all appointments that match the current user's clerkUserId, optional doc_id, and status "pending"
        const filter = { clerkUserId, status: "pending" }; // Added status filter
        if (doc_id) {
            filter.doc_id = doc_id;
        }

        const appointments = await Appointment.find(filter);

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found" });
        }

        res.status(200).json({
            message: "Appointments retrieved successfully",
            appointments
        });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// fetch patient rows
  router.get("/get-patient-appointments", ClerkExpressRequireAuth(), async (req, res) => {
    const clerkUserId = req.auth.userId; // Get the current user's clerkUserId
    
    try {
      // Find all appointments that match the current user's clerkUserId
      const appointments = await Appointment.find({ clerkUserId });
  
      // Check if there are no matching appointments
      if (!appointments || appointments.length === 0) {
        return res.status(404).json({ message: "No appointments found" });
      }
  
      // Return the list of appointments found
      res.status(200).json({
        message: "Appointments retrieved successfully",
        appointments
      });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
// update status of the request
router.route("/appointment-update/:id").put(async (req, res) => {
    const appointmentId = req.params.id; // Use appointmentId instead of yieldId for clarity

    try {
        // Find the appointment by ID
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).send({ status: "Appointment not found" });
        }

        // Update the appointment status to "completed"
        appointment.status = "completed";

        // Save the updated appointment
        const updatedAppointment = await appointment.save();

        res.status(200).send({ status: "Appointment status updated to completed", appointment: updatedAppointment });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error updating appointment status", error: err.message });
    }
});

module.exports = router;
