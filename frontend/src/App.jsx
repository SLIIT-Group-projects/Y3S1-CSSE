import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Navigate for redirection
import SignupPage from "./components/SignUp";
import UserProfilePage from "./components/UserProfile";
import SaveUserData from "./pages/testPage";
import UserDataDisplay from "./pages/UserDataDisplay";
import UserDetails from "./pages/AllUserDetails";
import HomePage from "./pages/HomePage";
import CreateBlogPage from "./pages/CreateBlogPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorBlogs from "./pages/DoctorBlogs";
import BlogDetails from "./pages/BlogDetails";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signUp" element={<SignupPage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/create-blog" element={<CreateBlogPage />} />
        <Route path="/get-blog/:id" element={<BlogDetails />} />
        <Route path="/get-doctor-blogs" element={<DoctorBlogs />} />
        <Route path="/test" element={<SaveUserData />} />
        <Route path="/dashboard" element={<DoctorDashboard />} />
        <Route path="/display-user-data" element={<UserDataDisplay />} />
        <Route path="/display-all-user-details" element={<UserDetails />} />
      </Routes>
    </>
  );
}
