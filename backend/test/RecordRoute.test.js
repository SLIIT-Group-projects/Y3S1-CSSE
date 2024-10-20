// const request = require("supertest");
// const app = require("../server"); // Assuming this is where your Express app is

// // Define the authorization token
// const authToken =
//   "Bearer eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18ybkNIZFhoSXRmMXlxTVFKU3NaTHFvZ05YaEkiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJleHAiOjE3Mjk0MTY2MDEsImlhdCI6MTcyOTQxNjU0MSwiaXNzIjoiaHR0cHM6Ly9jYXVzYWwtYm94ZXItOTAuY2xlcmsuYWNjb3VudHMuZGV2IiwibmJmIjoxNzI5NDE2NTMxLCJzaWQiOiJzZXNzXzJuY1g0TnVNRUdndDUzMjFvRm9ONGI1dGZOMiIsInN1YiI6InVzZXJfMm5DS1ljOGtYQkpWSGRUa3ljVHUzd21xMFQ1In0.dHJNz2Qgc6v81Xv9dwXl3HR-u2kxAxWxLNkIDyS4Hv4em549pF1B9Rhu7cgROd8Z4NnUznoCMg_1S_UVamzU84gUMFmurmO38jCWXrtcsdmkli0wxlgUolz5mrL_K6Z9Eax6FxF_79ikJfv8eaxt-1JVRpyxete-po69o-q6r6O792gbLOl0eacBMdkVgjHu3qcYRKhjEcC3iF90LgUOdBqyRshwjQtSpjxWWh9ImweFkXIxKLMpwG4Z5u_nik-kDAPzHhjP6LqW5Ti6lQJE1fTV8AjXvjjbtjlcgbR9D4HVLajSSl7U7HnksHthRZmws85_NcG4bu4neULXc-A4dA";
// describe("GET /record/get-records/:userId", () => {
//   it("should return all records for a specific patient", async () => {
//     console.log("Testing: Fetching records for patient");
//     const res = await request(app)
//       .get("/record/get-records/67079a509fcf32e3b67793c4") // Assuming you are testing this route
//       .set("Authorization", authToken); // Use the defined token

//     console.log("Response:", res.body); // Log the response
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty("records");
//   });

//   it("should return 404 if no records found", async () => {
//     const res = await request(app)
//       .get("/record/get-records/non-existent-user-id")
//       .set("Authorization", authToken); // Use the defined token

//     expect(res.statusCode).toEqual(404);
//     expect(res.body.message).toBe("No records found for this patient.");
//   });
// });

// // Tests for inserting records
// describe("POST /record/add-record", () => {
//   it("should create a new medical record", async () => {
//     const res = await request(app)
//       .post("/record/add-record")
//       .set("Authorization", authToken) // Use the defined token
//       .send({
//         userId: "67079a509fcf32e3b67793c4",
//         records: "New medical record details",
//         specialNotes: "No special notes",
//       });

//     expect(res.statusCode).toEqual(201);
//     expect(res.body).toHaveProperty("message", "Record created successfully");
//     //expect(res.body.record).toHaveProperty('_id');
//     //expect(res.body.record).toEqual('67079a509fcf32e3b67793c4');
//     //expect(res.body.record).toEqual('67079a509fcf32e3b67793c4');
//     expect(res.body.record.records).toEqual("New medical record details");
//     expect(res.body.record.specialNotes).toEqual("No special notes");
//   });

//   it("should return an error if no authorization token is provided", async () => {
//     const res = await request(app).post("/record/add-record").send({
//       userId: "67079a509fcf32e3b67793c4",
//       records: "New medical record details",
//       prescription: "New medication",
//       specialNotes: "No special notes",
//     });

//     //  expect(res.statusCode).toEqual(401); // Unauthorized
//   });
// });
