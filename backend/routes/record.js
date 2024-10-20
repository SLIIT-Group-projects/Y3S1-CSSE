// routes/recordRoutes.js
const express = require("express");
const Record = require("../models/record");  // Assuming the Record model exists
const User = require("../models/user");      // Assuming User model exists for patients
const RecordFactory = require("../factories/RecordFactory");  // Import the RecordFactory
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");  // Authentication middleware

const router = express.Router();

// Create a new medical record for a patient
router.post("/add-record", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    // Fetch the logged-in doctor (logged-in user is a doctor)
    const doctorId = req.auth.userId;

    // Fetch patient details from request body (sent from frontend)
    const { userId, records, prescription, specialNotes } = req.body;

    // Use the factory method to create a new record object
    const recordData = RecordFactory.createRecord({
      doctorId,
      userId,
      records,
      prescription,
      specialNotes,
    });

    // Create and save the new record to the database
    const newRecord = new Record(recordData);
    await newRecord.save();

    // Send success response
    res.status(201).json({ message: "Record created successfully", record: newRecord });
  } catch (error) {
    console.error("Error creating record:", error);
    res.status(500).json({ error: "An error occurred while creating the record" });
  }
});

// Get all records for a specific patient
router.get("/get-records/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const records = await Record.find({ userId }).populate("userId", "firstName lastName email");

    if (!records || records.length === 0) {
      return res.status(404).json({ message: "No records found for this patient." });
    }

    res.status(200).json({ records });
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ error: "An error occurred while fetching records." });
  }
});

// Get all records for the logged-in user
router.get("/user-records", ClerkExpressRequireAuth(), async (req, res) => {
  const clerkUserId = req.auth.userId;

  try {
    // Find the user in your database using the clerkUserId
    const user = await User.findOne({ clerkUserId: clerkUserId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Query the records using the user's ObjectId
    const records = await Record.find({ userId: user._id });

    if (!records || records.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.status(200).json({
      message: "Records retrieved successfully",
      records,
    });
  } catch (error) {
    console.error("Error fetching user records:", error);
    res.status(500).json({ message: "An error occurred while fetching user records." });
  }
});

module.exports = router;
