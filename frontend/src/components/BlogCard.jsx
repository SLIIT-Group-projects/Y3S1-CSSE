import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogCard = ({ blog }) => {
  return (
    <div className="p-4 border rounded shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-700">{blog.introduction}</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Read More
      </button>
    </div>
  );
};

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/blog/get-blogs"
        );
        setBlogs(response.data); // Assuming response.data contains an array of blog posts
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="my-8">
      <h1 className="text-3xl font-bold text-center mb-8">Latest Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
