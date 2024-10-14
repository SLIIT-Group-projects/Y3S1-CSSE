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
import AppNavBar from "./components/AppNavBar";
import Footer from "./components/Footer";

//vihara
import UserLabTestsPage from "./pages/UserLabTestsPage";
import LabReportPage from "./pages/LabReportPage";
import DoctorDashboard from "./pages/DoctorDashboard";

export default function App() {
  return (
    <div>
      {/* Navigation bar */}
      <AppNavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard-labtest" element={<DoctorDashboard />} />
        <Route path="/signUp" element={<SignupPage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/create-blog" element={<CreateBlogPage />} />
        <Route path="/test" element={<SaveUserData />} />
        <Route path="/display-user-data" element={<UserDataDisplay />} />
        <Route path="/display-all-user-details" element={<UserDetails />} />
        {/* vihara */}
        <Route path="/lab-tests" element={<UserLabTestsPage />} />
        <Route path="/lab-tests/:id" element={<LabReportPage />} />
      </Routes>
    </div>
  );
}
