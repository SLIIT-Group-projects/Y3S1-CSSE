import React, { useEffect, useState } from "react";
import TodoList from "./ToDoList";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios"; // Axios for API requests
import DoctorCalendar from "./DoctorCalendar";

const DoctorDashboardComps = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [blogCount, setBlogCount] = useState(0); // Initialize blog count to 0
  const [targetBlogCount, setTargetBlogCount] = useState(0); // Target blog count fetched from API

  // Fetch the blog count for the logged-in doctor
  useEffect(() => {
    const fetchBlogCount = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          "http://localhost:5000/blog/blog-count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Assuming your API route
        setTargetBlogCount(response.data); // Set the target count from the API
      } catch (error) {
        console.error("Error fetching blog count:", error);
      }
    };

    fetchBlogCount();
  }, [getToken]);

  // Animate blog count from 0 to the target count
  useEffect(() => {
    let count = 0;
    const incrementBlogCount = setInterval(() => {
      if (count < targetBlogCount) {
        count += 1;
        setBlogCount(count);
      } else {
        clearInterval(incrementBlogCount);
      }
    }, 50); // Adjust the speed of the count animation
  }, [targetBlogCount]);

  return (
    <div className="p-8 grid grid-cols-6 gap-4">
      <div className="border flex border-gray-400 p-4 col-span-3 row-span-2 rounded-md bg-blue-500">
        {/* Profile Picture */}
        <div className="flex-shrink-0 mx-5 my-11">
          <img
            src={user?.imageUrl} // Clerk's profile image URL
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 cursor-pointer"
          />
        </div>

        {/* Doctor's Info */}
        <div className="mx-4 my-10 text-white">
          <h1 className="text-2xl font-bold ">
            Dr. {user?.firstName} {user?.lastName}
          </h1>
          <p className="">Specialist in Cardiology</p>
          <p className="mt-2 text-black">
            <strong>Experience:</strong> 10+ years
          </p>
          <p className="text-black">
            <strong>Contact:</strong> {user?.emailAddresses[0]?.emailAddress}
          </p>
          <p className="text-black">
            <strong>Location:</strong> Sydney, Australia
          </p>
        </div>
      </div>

      <div className="border border-gray-400 p-4 col-span-1 row-span-1">
        <h2 className="text-xl font-bold">Patient Records</h2>
        <p className="mt-4">Manage patient details and history.</p>
      </div>

      <div className="border border-gray-400 p-4 col-span-1 row-span-1">
        <h2 className="text-xl font-bold">Appointments</h2>
        <p className="mt-4">Upcoming appointments and schedule.</p>
      </div>

      <div className="border border-gray-400 p-4 col-span-1 row-span-1">
        <h2 className="text-xl font-bold text-center">Blogs Count</h2>
        <p className="mt-4 text-4xl text-center">{blogCount}</p>{" "}
      </div>

      <div className="border border-gray-400 p-4 col-span-3 row-span-1">
        <h2 className="text-xl font-bold">Messages</h2>
        <p className="mt-4">Patient messages and inquiries.</p>
      </div>

      <div className=" col-span-3 row-span-1">
        <DoctorCalendar />
      </div>

      <div className="border border-gray-400 p-4 col-span-1 row-span-2">
        <h2 className="text-xl font-bold">Prescriptions</h2>
        <p className="mt-4">Review and update prescriptions.</p>
      </div>

      {/* Add the TodoList component */}
      <div className=" col-span-2 row-span-2">
        <TodoList />
      </div>
    </div>
  );
};

export default DoctorDashboardComps;
