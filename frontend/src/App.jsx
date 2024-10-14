import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate for redirection
import SigninPage from "./components/SignIn";
import SignupPage from "./components/SignUp";
import Navbar from "./components/NavBar";
import UserProfilePage from "./components/UserProfile";
import SaveUserData from "./pages/testPage";
import UserDataDisplay from "./pages/UserDataDisplay";
import UserDetails from "./pages/AllUserDetails";
import HomePage from "./pages/HomePage";
import CreateBlogPage from "./pages/CreateBlogPage";
import AdminDashboard from "./pages/DoctorDashboard";


// daham
import AppointmentForm from "./pages/AddAppointment"
import DoctorAppointments from "./pages/DoctorAppointment"
import PatientAppointments from "./pages/AllAppointmentPatient"

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signUp" element={<SignupPage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/create-blog" element={<CreateBlogPage />} />
        <Route path="/test" element={<SaveUserData />} />
        <Route path="/display-user-data" element={<UserDataDisplay />} />
        <Route path="/display-all-user-details" element={<UserDetails />} />
        <Route path="/dashboard" element={<AdminDashboard />} />

        {/* daham */}
        <Route path="/appointment/add" element={<AppointmentForm />} />
        <Route path="/appointment/doctor/" element={<DoctorAppointments />} />
        <Route path="/appointment/patient/" element={<PatientAppointments />} />

      </Routes>
    </>
  );
}
