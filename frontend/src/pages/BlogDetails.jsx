// BlogDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/blog/get-blog/${id}`
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!blog) return <div>Blog not found.</div>;

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-4">{blog.introduction}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Display Blog Images in a grid */}
        {blog.images.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:5000/${image}`}
            alt={`Blog Image ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-2">Symptoms</h2>
      <p className="text-gray-700 mb-4">{blog.symptoms}</p>

      <h2 className="text-2xl font-semibold mb-2">Causes</h2>
      <p className="text-gray-700 mb-4">{blog.causes}</p>

      <h2 className="text-2xl font-semibold mb-2">Prevention</h2>
      <p className="text-gray-700 mb-4">{blog.prevention}</p>

      <h2 className="text-2xl font-semibold mb-2">Treatment</h2>
      <p className="text-gray-700 mb-4">{blog.treatment}</p>

      {blog.caseStudy && (
        <>
          <h2 className="text-2xl font-semibold mb-2">Case Study</h2>
          <p className="text-gray-700 mb-4">{blog.caseStudy}</p>
        </>
      )}

      {blog.references && (
        <>
          <h2 className="text-2xl font-semibold mb-2">References</h2>
          <p className="text-gray-700 mb-4">{blog.references}</p>
        </>
      )}

      {blog.relatedLinks && (
        <>
          <h2 className="text-2xl font-semibold mb-2">Related Links</h2>
          <p className="text-gray-700 mb-4">{blog.relatedLinks}</p>
        </>
      )}

      {blog.disclaimer && (
        <>
          <h2 className="text-2xl font-semibold mb-2">Disclaimer</h2>
          <p className="text-gray-700 mb-4">{blog.disclaimer}</p>
        </>
      )}
    </div>
  );
};

export default BlogDetails;
