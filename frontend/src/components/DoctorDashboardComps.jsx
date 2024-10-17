import React from "react";
import TodoList from "./ToDoList";
import { useUser } from "@clerk/clerk-react";

const DoctorDashboardComps = () => {
  const { user } = useUser();

  return (
    <div className="p-8 grid grid-cols-6 gap-4">
      <div className="border flex border-gray-400 p-4 col-span-2 row-span-2">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img
            src={user?.imageUrl} // Clerk's profile image URL
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 cursor-pointer"
          />
        </div>

        {/* Doctor's Info */}
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

      {/* Add the TodoList component */}
      <div className=" col-span-2 row-span-2">
        <TodoList />
      </div>
    </div>
  );
};

export default DoctorDashboardComps;
