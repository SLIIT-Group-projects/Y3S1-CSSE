// /routes/blogRoutes.js
const express = require("express");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const Doctor = require("../models/doctor");

const router = express.Router();

// POST request to create a new doctor
router.post(
  "/create-doctor",
  ClerkExpressRequireAuth(),
  async (req, res) => {
    const clerkUserId = req.auth.userId;
    try {
      // Retrieve the logged-in user's name and email from Clerk
      const name = req.auth.firstName + " " + req.auth.lastName;

      // Get day and slot from request body, expecting them as arrays
      const { day, slot } = req.body;

      // Ensure day and slot are arrays
      if (!Array.isArray(day) || !Array.isArray(slot)) {
        return res.status(400).json({ message: "Day and slot should be arrays" });
      }

      // Create a new doctor record
      const newDoctor = new Doctor({
        clerkUserId,
        name,
        day,
        slot,
      });

      // Save the new doctor to the database
      await newDoctor.save();

      res.status(201).json({ message: "Doctor created successfully", doctor: newDoctor });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
