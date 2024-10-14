// src/UserProfile.js
import React from "react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import AppNavBar from "../components/AppNavBar";

const DoctorDashboard = () => {
  const { user } = useUser();

  return (
    <>
    <AppNavBar/>
      <div className="">
        <button className="bg-blue-500 p-3 text-white font-bold m-4 rounded-md"><Link to="">Create Blogs</Link> </button>
        <button className="bg-blue-500 p-3 text-white font-bold m-4 rounded-md"><Link to="">Manage Appointments</Link> </button>
        <button className="bg-blue-500 p-3 text-white font-bold m-4 rounded-md"><Link to="">Add Records</Link> </button>
        <button className="bg-blue-500 p-3 text-white font-bold m-4 rounded-md"><Link to="">Add Records</Link> </button>
      </div>
    </>
  ); 
};

export default DoctorDashboard;
