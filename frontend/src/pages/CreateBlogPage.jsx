import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const DoctorBlogForm = () => {
  const { getToken } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    introduction: "",
    symptoms: "",
    causes: "",
    prevention: "",
    treatment: "",
    caseStudy: "",
    callToAction: "",
    references: "",
    relatedLinks: "",
    disclaimer: "",
  });
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "images") {
      setImages(files);
    } else {
      setVideos(files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    for (let i = 0; i < images.length; i++) {
      formDataToSend.append("images", images[i]);
    }

    for (let i = 0; i < videos.length; i++) {
      formDataToSend.append("videos", videos[i]);
    }

    try {
      const token = await getToken();
      const response = await axios.post(
        "http://localhost:5000/blog/create-blog",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Blog submitted successfully:", response.data);
    } catch (err) {
      console.error("Error submitting blog:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Blog Title */}
      <div className="mb-4">
        <label className="block text-gray-700">Blog Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-2"
          placeholder="Enter the blog title"
        />
      </div>

      {/* Introduction */}
      <div className="mb-4">
        <label className="block text-gray-700">Introduction</label>
        <textarea
          name="introduction"
          value={formData.introduction}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-2"
          placeholder="Brief introduction to the topic"
        />
      </div>

      {/* Symptoms/Explanation of the Condition */}
      <div className="mb-4">
        <label className="block text-gray-700">
          Symptoms or Explanation of the Condition
        </label>
        <textarea
          name="symptoms"
          value={formData.symptoms}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-2"
          placeholder="Explain the medical condition"
        />
      </div>

      {/* Causes and Risk Factors */}
      <div className="mb-4">
        <label className="block text-gray-700">Causes and Risk Factors</label>
        <textarea
          name="causes"
          value={formData.causes}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-2"
          placeholder="Describe the causes and risks"
        />
      </div>

      {/* Prevention Tips */}
      <div className="mb-4">
        <label className="block text-gray-700">Prevention Tips</label>
        <textarea
          name="prevention"
          value={formData.prevention}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-2"
          placeholder="Provide tips for prevention"
        />
      </div>

      {/* Treatment Options */}
      <div className="mb-4">
        <label className="block text-gray-700">Treatment Options</label>
        <textarea
          name="treatment"
          value={formData.treatment}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-2"
          placeholder="Discuss available treatments"
        />
      </div>

      {/* Case Study or Patient Story (Optional) */}
      <div className="mb-4">
        <label className="block text-gray-700">
          Case Study or Patient Story (Optional)
        </label>
        <textarea
          name="caseStudy"
          value={formData.caseStudy}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-2"
          placeholder="Add a patient story or case study"
        />
      </div>

      {/* Call-to-Action */}
      <div className="mb-4">
        <label className="block text-gray-700">Call-to-Action</label>
        <textarea
          name="callToAction"
          value={formData.callToAction}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-2"
          placeholder="Encourage the reader to take action"
        />
      </div>

      {/* Visuals (Images and Videos) */}
      <div className="mb-4">
        <label className="block text-gray-700">Upload Images</label>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleFileChange}
          className="block mt-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Upload Videos</label>
        <input
          type="file"
          name="videos"
          multiple
          onChange={handleFileChange}
          className="block mt-2"
        />
      </div>

      {/* References */}
      <div className="mb-4">
        <label className="block text-gray-700">References</label>
        <textarea
          name="references"
          value={formData.references}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-2"
          placeholder="Add links to studies, articles, etc."
        />
      </div>

      {/* Related Resources/Links */}
      <div className="mb-4">
        <label className="block text-gray-700">Related Resources/Links</label>
        <textarea
          name="relatedLinks"
          value={formData.relatedLinks}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-2"
          placeholder="Add links to other blog posts or resources"
        />
      </div>

      {/* Disclaimer */}
      <div className="mb-4">
        <label className="block text-gray-700">Disclaimer</label>
        <textarea
          name="disclaimer"
          value={formData.disclaimer}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-2"
          placeholder="Include any necessary disclaimers"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-700 rounded hover:bg-blue-800"
        >
          Submit for Review
        </button>
      </div>
    </form>
  );
};

export default DoctorBlogForm;
