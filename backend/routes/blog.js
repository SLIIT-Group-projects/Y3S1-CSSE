// /routes/blogRoutes.js
const express = require("express");
const multer = require("multer");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const Blog = require("../models/blog");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// POST request to create a new doctor blog
router.post(
  "/create-blog",
  ClerkExpressRequireAuth(),
  upload.fields([{ name: "images" }, { name: "videos" }]),
  async (req, res) => {
    const clerkUserId = req.auth.userId;
    try {
      const {
        title,
        introduction,
        symptoms,
        causes,
        prevention,
        treatment,
        caseStudy,
        callToAction,
        references,
        relatedLinks,
        disclaimer,
      } = req.body;

      // Create image and video paths
      const imagePaths = req.files.images
        ? req.files.images.map((file) => file.path)
        : [];
      const videoPaths = req.files.videos
        ? req.files.videos.map((file) => file.path)
        : [];

      const newBlog = new Blog({
        clerkUserId,
        title,
        introduction,
        symptoms,
        causes,
        prevention,
        treatment,
        caseStudy,
        callToAction,
        images: imagePaths,
        videos: videoPaths,
        references,
        relatedLinks,
        disclaimer,
      });

      await newBlog.save();

      res
        .status(201)
        .json({ message: "Blog post created successfully", blog: newBlog });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get("/get-blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
