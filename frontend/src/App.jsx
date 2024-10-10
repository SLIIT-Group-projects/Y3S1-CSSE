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
