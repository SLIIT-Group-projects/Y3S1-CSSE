import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../shared/SearchBar";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function AllPatients() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch all users from the backend
    axios
      .get("http://localhost:5000/user/get-all-users")
      .then((res) => {
        setUsers(res.data.users); // Assuming backend returns { users: [...] }
        setFilteredUsers(res.data.users); // Initialize filteredUsers with all users
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message); // Correct usage of alert
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs once on mount

  // Handler to perform search
  const handleSearch = (searchQuery) => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users); // If search query is empty, show all users
    } else {
      const filtered = users.filter((user) =>
        Object.values(user).some((field) =>
          field
            ? field.toString().toLowerCase().includes(searchQuery.toLowerCase())
            : false
        )
      );
      setFilteredUsers(filtered);
    }
  };

  if (loading) {
    return <p>Loading patients...</p>; // Optional: Loading indicator
  }

  if (error) {
    return <p>Error: {error}</p>; // Optional: Error message
  }

  return (
    <>
      <div className="">All Patients</div>
      <SearchBar onSearch={handleSearch} /> {/* Pass handleSearch as a prop */}
      <div>
      <Link
                      to={`/AllRecords`} // Pass patient ID in the URL
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      view Records
                    </Link>
        
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user._id} // Use a unique identifier
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.firstName}
                  </th>
                  <td className="px-6 py-4">{user.lastName}</td>
                  <td className="px-6 py-4">{user.email}</td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/add-record/${user._id}`} // Pass patient ID in the URL
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Add Record
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/view-record/${user._id}`} // Pass patient ID in the URL
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View Record
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllPatients;
