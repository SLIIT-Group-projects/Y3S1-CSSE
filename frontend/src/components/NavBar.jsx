import React from "react";
import { UserButton, UserProfile, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useUser();

  const handleProfileClick = () => <UserProfile path="/user-profile" />;

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold">My App</div>

      <div className="flex items-center gap-4">
        <Link to="/">
          <div className="text-white">Home</div>
        </Link>

        <a href="/test" className="text-white">
          Test
        </a>
        <a href="/display-user-data" className="text-white">
          Display user data
        </a>
        <Link to="/profile">
          <img
            onClick={handleProfileClick} // Add click handler for profile image
            src={user?.imageUrl} // Ensure you're using profileImageUrl
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3 cursor-pointer" // Add cursor-pointer for better UX
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
