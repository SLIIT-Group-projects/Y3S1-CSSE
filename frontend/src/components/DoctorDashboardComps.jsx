import React, { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import TodoList from "./ToDoList";

const Badge = ({ count, onClick }) => {
  return (
    <div
      className="bg-blue-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center cursor-pointer" // Add cursor-pointer
      onClick={onClick} // Handle click event
    >
      {count}
    </div>
  );
};

const DoctorDashboardComps = () => {
  const { user } = useUser();
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchAppointmentCount = async () => {
      if (!user || !user.id) {
        setError("User not authenticated.");
        return;
      }

      try {
        const token = await getToken();
        const response = await axios.get("http://localhost:5000/appointment/get-doctor-appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointmentCount(response.data.appointments.length);
      } catch (err) {
        console.error("Error fetching appointments:");
        setError("No appointments today.");
      }
    };

    if (isSignedIn) {
      fetchAppointmentCount();
    }
  }, [user, isSignedIn, getToken]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>User not authenticated.</div>;
  }

  return (
    <div className="p-8 grid grid-cols-6 gap-4">
      <div className="border flex border-gray-400 p-4 col-span-2 row-span-2">
        <div className="flex-shrink-0">
          <img
            src={user?.imageUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 cursor-pointer"
          />
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-bold">
            Dr. {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-gray-600">Specialist in Cardiology</p>
          <p className="mt-2 text-gray-500">
            <strong>Experience:</strong> 10+ years
          </p>
          <p className="text-gray-500">
            <strong>Contact:</strong> {user?.emailAddresses[0]?.emailAddress}
          </p>
          <p className="text-gray-500">
            <strong>Location:</strong> Sydney, Australia
          </p>
        </div>
      </div>

      <div className="border border-gray-400 p-4 col-span-1 row-span-1">
        <h2 className="text-xl font-bold">Patient Records</h2>
        <p className="mt-4">Manage patient details and history.</p>
      </div>

      <div className="border border-gray-400 p-4 col-span-2 row-span-1">
        <h2 className="text-xl font-bold">Appointments</h2>
        <p className="mt-4">Upcoming appointments and schedule.</p>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="mt-2">
            Today's Appointments:
            <Badge 
              count={appointmentCount} 
              onClick={() => navigate('/appointment/doctor')}
            />
          </div>
        )}
      </div>

      <div className="border border-gray-400 p-4 col-span-3 row-span-1">
        <h2 className="text-xl font-bold">Messages</h2>
        <p className="mt-4">Patient messages and inquiries.</p>
      </div>

      <div className="border border-gray-400 p-4 col-span-1 row-span-2">
        <h2 className="text-xl font-bold">Prescriptions</h2>
        <p className="mt-4">Review and update prescriptions.</p>
      </div>

      <div className="border border-gray-400 p-4 col-span-2 row-span-1">
        <h2 className="text-xl font-bold">Settings</h2>
        <p className="mt-4">Customize dashboard preferences.</p>
      </div>

      <div className="col-span-2 row-span-2">
        <TodoList />
      </div>
    </div>
  );
};

export default DoctorDashboardComps;
