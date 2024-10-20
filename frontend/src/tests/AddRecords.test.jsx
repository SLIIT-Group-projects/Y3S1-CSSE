// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { MemoryRouter, Route } from "react-router-dom";
// import AddRecord from "./AddRecord"; // Adjust the import according to your file structure
// import { useAuth } from "@clerk/clerk-react";
// import axios from "axios";

// // Mock the useAuth hook
// jest.mock("@clerk/clerk-react");
// jest.mock("axios");

// describe("AddRecord Component", () => {
//   const mockGetToken = jest.fn();
//   const mockNavigate = jest.fn();

//   beforeEach(() => {
//     useAuth.mockReturnValue({ getToken: mockGetToken });
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test("should submit the form successfully", async () => {
//     // Mock the token and API response
//     mockGetToken.mockResolvedValue("mock-token");
//     axios.post.mockResolvedValue({ data: { message: "Record saved successfully!" } });

//     render(
//       <MemoryRouter initialEntries={["/add-record/1"]}>
//         <AddRecord />
//       </MemoryRouter>
//     );

//     // Fill in the form
//     fireEvent.change(screen.getByLabelText(/Records/i), { target: { value: "Patient examination" } });
//     fireEvent.change(screen.getByLabelText(/Prescription/i), { target: { value: "Medicine A, Medicine B" } });
//     fireEvent.change(screen.getByLabelText(/Special Notes/i), { target: { value: "No allergies" } });

//     // Submit the form
//     fireEvent.click(screen.getByRole("button", { name: /Save Record/i }));

//     // Expect the success message to be shown
//     expect(await screen.findByText(/Record saved successfully!/i)).toBeInTheDocument();
//   });

//   test("should show an error message when the API fails", async () => {
//     // Mock the token and API error response
//     mockGetToken.mockResolvedValue("mock-token");
//     axios.post.mockRejectedValue({ response: { data: { message: "Failed to save record" } } });

//     render(
//       <MemoryRouter initialEntries={["/add-record/1"]}>
//         <AddRecord />
//       </MemoryRouter>
//     );

//     // Fill in the form
//     fireEvent.change(screen.getByLabelText(/Records/i), { target: { value: "Patient examination" } });
//     fireEvent.change(screen.getByLabelText(/Prescription/i), { target: { value: "Medicine A" } });
//     fireEvent.change(screen.getByLabelText(/Special Notes/i), { target: { value: "No allergies" } });

//     // Submit the form
//     fireEvent.click(screen.getByRole("button", { name: /Save Record/i }));

//     // Expect the error message to be shown
//     expect(await screen.findByText(/Failed to save record/i)).toBeInTheDocument();
//   });

//   test("should display validation error when fields are empty", () => {
//     render(
//       <MemoryRouter initialEntries={["/add-record/1"]}>
//         <AddRecord />
//       </MemoryRouter>
//     );

//     // Try to submit the form without filling it
//     fireEvent.click(screen.getByRole("button", { name: /Save Record/i }));

//     // Expect required field error messages to be shown
//     expect(screen.getByLabelText(/Records/i)).toHaveAttribute('required');
//     expect(screen.getByLabelText(/Prescription/i)).toHaveAttribute('required');
//     expect(screen.getByLabelText(/Special Notes/i)).toHaveAttribute('required');
//   });
// });
