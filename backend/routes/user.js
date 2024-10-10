const express = require("express");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const User = require("../models/user"); // Import the User model
const router = express.Router();

// Middleware to validate request body for saving user data
const validateUserData = (req, res, next) => {
  const { firstName, lastName, additionalData } = req.body;

  if (!firstName && !lastName && !additionalData) {
    return res.status(400).json({
      message:
        "At least one of firstName, lastName, or additionalData is required",
    });
  }

  next();
};

// Route to save user data
router.post(
  "/save-user-data",
  ClerkExpressRequireAuth(),
  validateUserData,
  async (req, res) => {
    const clerkUserId = req.auth.userId;
    const { firstName, lastName, additionalData, email } = req.body;

    try {
      let user = await User.findOne({ clerkUserId });

      if (!user) {
        // Create a new user entry if it doesn't exist
        user = new User({
          clerkUserId,
          email,
          firstName: firstName || "",
          lastName: lastName || "",
          additionalData: additionalData || "", // Ensure it's a string
        });
      } else {
        // Update existing user data
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.additionalData = additionalData || ""; // Update to a string
      }

      await user.save();
      res.status(201).json({ message: "User data saved successfully", user });
    } catch (error) {
      console.error("Error saving user data:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
);

// Route to get user data
router.get("/get-user-data", ClerkExpressRequireAuth(), async (req, res) => {
  const clerkUserId = req.auth.userId;

  try {
    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      additionalData: user.additionalData,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
