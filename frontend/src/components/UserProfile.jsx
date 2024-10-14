// src/UserProfile.js
import React from "react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import Navbar from "./NavBar";
import AppNavBar from "./AppNavBar";
import { Link } from "react-router-dom";

const UserProfilePage = () => {
  const { user } = useUser();

  return (
    <>
      <AppNavBar />
      <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">User Profile</h1>
          <div className="flex justify-center mb-4">
            <img
              src={user?.imageUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-500 cursor-pointer transition-transform transform hover:scale-105"
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-600">
              {user?.primaryEmailAddress.emailAddress}
            </p>
          </div>
          <div className="border p-2 m-4 rounded-xl text-center justify-center">
            <div className="flex gap-6 m-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>

              <div className="text-lg cursor-pointer"> <Link to="/appointment/patient/">My Apointments</Link> </div>
            </div>
            <div className="flex gap-6 m-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>

              <div className="text-lg cursor-pointer">My Records</div>
            </div>
            <div className="flex gap-6 m-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>

              <div className="text-lg cursor-pointer">Lab Tests</div>
            </div>
          </div>

          <div className="mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
              <SignOutButton />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
