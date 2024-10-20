// import React from "react";
// import { render, screen } from "@testing-library/react";
// import { MemoryRouter, Route } from "react-router-dom";
// import AllRecords from "./AllRecords"; // Adjust the import according to your file structure
// import axios from "axios";

// // Mock the axios module
// jest.mock("axios");

// describe("AllRecords Component", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test("should display records when fetched successfully", async () => {
//     // Mock the API response
//     axios.get.mockResolvedValue({
//       data: {
//         records: [
//           {
//             _id: "1",
//             records: "Patient examination",
//             prescription: ["Medicine A", "Medicine B"],
//             specialNotes: "No allergies",
//             createdAt: new Date(),
//           },
//         ],
//       },
//     });

//     render(
//       <MemoryRouter initialEntries={["/records/1"]}>
//         <AllRecords />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText(/Patient Records/i)).toBeInTheDocument();
//     expect(await screen.findByText(/Patient examination/i)).toBeInTheDocument();
//   });

//   test("should show a message when there are no records", async () => {
//     // Mock the API response for no records
//     axios.get.mockResolvedValue({
//       data: {
//         records: [],
//       },
//     });

//     render(
//       <MemoryRouter initialEntries={["/records/1"]}>
//         <AllRecords />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText(/No records found for this patient/i)).toBeInTheDocument();
//   });

//   test("should display an error message when the API fails", async () => {
//     // Mock the API error response
//     axios.get.mockRejectedValue(new Error("Failed to fetch records"));

//     render(
//       <MemoryRouter initialEntries={["/records/1"]}>
//         <AllRecords />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText(/Error: Failed to fetch records/i)).toBeInTheDocument();
//   });
// });
//         npm test