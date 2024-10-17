import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react"; // Import Clerk's useAuth
import { Link } from "react-router-dom";

const DoctorBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { getToken } = useAuth(); // Destructure getToken to get the token

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Get the auth token from Clerk
        const token = await getToken();

        // Make the API call with the token in the headers
        const res = await axios.get(
          "http://localhost:5000/blog/get-doctor-blogs",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          }
        );

        setBlogs(res.data); // Update blogs state with fetched blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [getToken]);

  // Function to handle blog deletion
  const handleDelete = async (id) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return; // Exit if the user clicked "Cancel"

    try {
      const token = await getToken(); // Get the auth token
      await axios.delete(`http://localhost:5000/blog/delete-blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });
      // Remove the deleted blog from the state
      setBlogs(blogs.filter((blog) => blog._id !== id));
      alert("Blog deleted successfully.");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog.");
    }
  };

  return (
    <>
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          Your Blogs
        </h1>

        <Link to="/create-blog">
          <button className="m-4 p-4 bg-blue-500">Create Blog</button>
        </Link>

        {/* Display blogs in a grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Blog Image */}
                {blog.images.length > 0 && (
                  <img
                    src={`http://localhost:5000/${blog.images[0]}`} // Display the first image
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                {/* Blog Details */}
                <div className="p-6">
                  {/* Blog Title */}
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3 truncate">
                    {blog.title}
                  </h2>

                  {/* Blog Introduction (a preview of the first 100 characters) */}
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {blog.introduction.length > 100
                      ? `${blog.introduction.substring(0, 100)}...`
                      : blog.introduction}
                  </p>

                  {/* Call to Action */}
                  {blog.callToAction && (
                    <p className="text-blue-600 font-medium mt-4">
                      {blog.callToAction}
                    </p>
                  )}

                  {/* View More Button */}
                  <a
                    href="#"
                    className="inline-block mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Read More
                  </a>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(blog._id)} // Call handleDelete with the blog ID
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No blogs found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorBlogs;
