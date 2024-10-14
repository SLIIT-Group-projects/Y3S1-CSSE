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
import AllPatients from "./pages/AllPatients";
import AddRecord from "./pages/AddRecord";
import AllRecords from "./pages/AllRecords";

export default function App() {
  return (
    <>
      <SignedIn>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/profile" replace />} />{" "}
          {/* Redirect to profile */}
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/test" element={<SaveUserData />} />
          <Route path="/display-user-data" element={<UserDataDisplay />} />
          <Route path="/AllPatients" element={<AllPatients />} />
          <Route path="/add-record/:patientId" element={<AddRecord />} />
          <Route path="/view-record/:patientId" element={<AllRecords/>} />
        </Routes>
      </SignedIn>

      <SignedOut>
        <Routes>
          <Route path="/" element={<SignupPage />} />
        </Routes>
      </SignedOut>
    </>
  );
}
