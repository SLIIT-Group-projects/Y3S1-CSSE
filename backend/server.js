const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRoutes = require("./routes/user"); // Import your user routes
require("dotenv").config(); // For using .env variables
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

const app = express();
const PORT = process.env.PORT || 5000; // Use port 8070

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins for development
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Use routes (ClerkExpressRequireAuth will be used in user routes)
app.use("/user", apiRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
