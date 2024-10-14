// AddRecord.jsx

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react"; // Import useAuth to get token

function AddRecord() {
  const { patientId } = useParams(); // Get the patientId from the URL params
  const { getToken } = useAuth(); // Get token with useAuth hook
  const navigate = useNavigate(); // To navigate after successful submission

  const [records, setRecords] = useState("");
  const [prescription, setPrescription] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken(); // Get the token

      const response = await axios.post(
        "http://localhost:5000/record/add-record",
        {
          userId: patientId, // Rename 'patientId' to 'userId'
          records,
          prescription: prescription.split(", ").map((item) => item.trim()), // Convert to array
          specialNotes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the request header
          },
        }
      );
      alert("Record saved successfully!");
      navigate("/"); // Navigate back to AllPatients or another desired page
    } catch (err) {
      console.error("Error saving record:", err);
      setError(
        err.response ? err.response.data.error || err.response.data.message : "Error saving record"
      );
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold">Add Record for Patient {patientId}</h2>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Records</label>
          <textarea
            value={records}
            onChange={(e) => setRecords(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label>Prescription</label>
          <input
            type="text"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            placeholder="Comma-separated"
            required
          />
        </div>

        <div>
          <label>Special Notes</label>
          <textarea
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Save Record
        </button>
      </form>
    </div>
  );
}

export default AddRecord;
