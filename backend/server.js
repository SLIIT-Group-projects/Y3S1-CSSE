const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user"); // Import your user routes
const blogRoutes = require("./routes/blog");
const labReportRoutes = require("./routes/labReportRoutes");
const authMiddleware = require("./middleware/authMiddleware"); // Middleware for auth
require("dotenv").config(); // For using .env variables
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

// Import the Singleton database connection
require("./dbconnection"); // This will initiate the MongoDB connection


const app = express();
const PORT = process.env.PORT || 5000; // Use port 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins for development
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use routes (ClerkExpressRequireAuth will be used in user routes)
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

// Routes
app.use("/api/reports", labReportRoutes);
app.use("/api/users", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require('path');
// const bodyParser = require("body-parser");
// const userRoutes = require("./routes/user"); // Import your user routes
// const blogRoutes = require("./routes/blog");
// const labReportRoutes = require('./routes/labReportRoutes');
// const authMiddleware = require('./middleware/authMiddleware');  // Middleware for auth
// require("dotenv").config(); // For using .env variables
// const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

// const app = express();
// const PORT = process.env.PORT || 5000; // Use port 8070

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Middleware
// app.use(express.json());
// app.use(
//   cors({
//     origin: "*", // Allow all origins for development
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
//     allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
//   })
// );

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, {})
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log("Error connecting to MongoDB:", err));

// app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

// // Use routes (ClerkExpressRequireAuth will be used in user routes)
// app.use("/user", userRoutes);

// app.use("/blog", blogRoutes);


// // Routes
// app.use('/api/reports', labReportRoutes);
// app.use('/api/users', userRoutes);
// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
