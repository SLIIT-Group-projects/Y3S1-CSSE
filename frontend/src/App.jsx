import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Navigate for redirection
import SignupPage from "./components/SignUp";
import UserProfilePage from "./components/UserProfile";
import SaveUserData from "./pages/testPage";
import UserDataDisplay from "./pages/UserDataDisplay";
import UserDetails from "./pages/AllUserDetails";
import HomePage from "./pages/HomePage";
import CreateBlogPage from "./pages/CreateBlogPage";
import AdminDoctorDashboard from "./pages/AdminDoctorDashboard";
import DoctorBlogs from "./pages/DoctorBlogs";
import BlogDetails from "./pages/BlogDetails";

// daham
import AppointmentForm from "./pages/AddAppointment";
import DoctorAppointments from "./pages/DoctorAppointment";
import PatientAppointments from "./pages/AllAppointmentPatient";
import AppNavBar from "./components/AppNavBar";
import Footer from "./components/Footer";

//vihara
import UserLabTestsPage from "./pages/UserLabTestsPage";
import LabReportPage from "./pages/LabReportPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import Dashboard from "./pages/Dashboard";
import DoctorBlogUpdate from "./pages/DoctorBlogUpdate ";

export default function App() {
  return (
    <div>
      {/* Navigation bar */}
      <AppNavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signUp" element={<SignupPage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/create-blog" element={<CreateBlogPage />} />
        <Route path="/get-blog/:id" element={<BlogDetails />} />
        <Route path="/get-doctor-blogs" element={<DoctorBlogs />} />
        <Route path="//update-blog/:id" element={<DoctorBlogUpdate />} />
        <Route path="/test" element={<SaveUserData />} />
        <Route path="/dashboard" element={<AdminDoctorDashboard />} />
        <Route path="/display-user-data" element={<UserDataDisplay />} />
        <Route path="/display-all-user-details" element={<UserDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* daham */}
        <Route path="/appointment/add" element={<AppointmentForm />} />
        <Route path="/appointment/doctor/" element={<DoctorAppointments />} />
        <Route path="/appointment/patient/" element={<PatientAppointments />} />

        {/* vihara */}
        <Route path="/lab-tests" element={<UserLabTestsPage />} />
        <Route path="/lab-tests/:id" element={<LabReportPage />} />
        <Route path="/dashboard-labtest" element={<DoctorDashboard />} />
      </Routes>
    </div>
  );
}
