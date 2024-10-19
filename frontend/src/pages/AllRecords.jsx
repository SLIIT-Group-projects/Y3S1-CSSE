import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To get the patientId from URL

function AllRecords() {
  const { patientId } = useParams(); // Get patient ID from the URL
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all records for the specific patient
    axios
      .get(`http://localhost:5000/record/get-records/${patientId}`) // Assuming backend route exists
      .then((res) => {
        setRecords(res.data.records);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
        setLoading(false);
      });
  }, [patientId]);

  if (loading) {
    return (
      <p className="text-center text-lg text-gray-600">Loading records...</p>
    ); // Loading state
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">Error: {error}</p>; // Error state
  }

  return (
    <div className="my-8">
      <h2 className="text-center font-bold text-3xl text-gray-800">
        Patient Records
      </h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <table className="w-full text-base text-left text-gray-800 mx-10">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Record Details
              </th>
              <th scope="col" className="px-6 py-3">
                Prescription
              </th>
              <th scope="col" className="px-6 py-3">
                Special Notes
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {records.length > 0 ? (
              records.map((record) => (
                <tr key={record._id} className="bg-white hover:bg-gray-50">
                  <td className="px-6 py-4">{record.records}</td>
                  <td className="px-6 py-4">
                    {record.prescription.join(", ")}
                  </td>
                  <td className="px-6 py-4">{record.specialNotes}</td>
                  <td className="px-6 py-4">
                    {new Date(record.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-600">
                  No records found for this patient.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllRecords;
