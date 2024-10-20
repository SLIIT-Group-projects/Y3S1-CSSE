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
  const { id } = req.params;
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/blog-count", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;

    const blogCount = await Blog.countDocuments({ clerkUserId: clerkUserId });
    return res.status(200).json(blogCount);
  } catch (error) {
    console.error("Error fetching blog count:", error);
    return res.status(500).json({ error: "Failed to fetch blog count" });
  }
});

router.get("/get-blog/:id", async (req, res) => {
  try {
    const blogId = req.params.id; // Get the blog ID from the request parameters
    const blog = await Blog.findById(blogId); // Find the blog by ID

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" }); // Return 404 if not found
    }

    res.json(blog); // Return the blog details
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Server error" }); // Return 500 for server errors
  }
});

router.put(
  "/update-blog/:id",
  upload.fields([{ name: "images" }, { name: "videos" }]),
  async (req, res) => {
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

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    // Update blog fields
    blog.title = title;
    blog.introduction = introduction;
    blog.symptoms = symptoms;
    blog.causes = causes;
    blog.prevention = prevention;
    blog.treatment = treatment;
    blog.caseStudy = caseStudy;
    blog.callToAction = callToAction;
    blog.references = references;
    blog.relatedLinks = relatedLinks;
    blog.disclaimer = disclaimer;

    // Handle file uploads (images and videos)
    if (req.files.images) {
      blog.images = req.files.images.map((file) => file.path);
    }

    if (req.files.videos) {
      blog.videos = req.files.videos.map((file) => file.path);
    }

    await blog.save();
    res.json({ message: "Blog updated successfully." });
  }
);

router.get("/get-doctor-blogs", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;

    const blogs = await Blog.find({ clerkUserId: userId });

    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete-blog/:id", async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id); // Find and delete the blog by ID
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found." });
    }
    res.status(200).json({ message: "Blog deleted successfully." });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
