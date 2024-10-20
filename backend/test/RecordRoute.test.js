const request = require("supertest");
const app = require("../server");

// Define the authorization token
const authToken =
  "Bearer eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18ybkNIZFhoSXRmMXlxTVFKU3NaTHFvZ05YaEkiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJleHAiOjE3Mjk0MjUwNDYsImlhdCI6MTcyOTQyNDk4NiwiaXNzIjoiaHR0cHM6Ly9jYXVzYWwtYm94ZXItOTAuY2xlcmsuYWNjb3VudHMuZGV2IiwibmJmIjoxNzI5NDI0OTc2LCJzaWQiOiJzZXNzXzJuZWpIVG40clNCWEdadlNCQjBaM2pSM1JSaCIsInN1YiI6InVzZXJfMm5FdWY4dnhNOFllMzJNYWxGOEY0RDJaZmRpIn0.VTpg9KYZxoZV5B1Lel9A6NymLE99L-gORsV9eN8PfUp_LGzqNS8zcUtJOmKv5HxX7mstNgleKWZJOTuinofxbAf48UwV1GOXnC3PQW-VZpGpy6DBimlg0Lm68EcI_0lbzzZDbCZQyWxzqBFngoI4NpsGFRE7wHYdNA3jnIahB6eqMBlVgk6ppGHAp0dwIQMpouboH49volB7k_6bQaNwunWkBwrZnwTSsou92C9OymXyoXsLUGKREf7YITJjoS0srskct-kJmhhTHceKh8Sfvv9E9iSTKVHd0OAVNd_Ql3UYczfGTsiTjwiiXPfZnmIXOpzfrr_04kMGMeNUZTjS_g";
describe("GET /record/get-records/:userId", () => {
  it("should return all records for a specific patient", async () => {
    console.log("Testing: Fetching records for patient");
    const res = await request(app)
      .get("/record/get-records/67079a509fcf32e3b67793c4")
      .set("Authorization", authToken); // Use the defined token

    console.log("Response:", res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("records");
  });
});

// Tests for inserting records
describe("POST /record/add-record", () => {
  it("should create a new medical record", async () => {
    const res = await request(app)
      .post("/record/add-record")
      .set("Authorization", authToken) // Use the defined token
      .send({
        userId: "67079a509fcf32e3b67793c4",
        records: "New medical record details",
        specialNotes: "No special notes",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Record created successfully");
    expect(res.body.record.records).toEqual("New medical record details");
    expect(res.body.record.specialNotes).toEqual("No special notes");
  });
});

it("should retrieve records successfully for an authenticated user", async () => {
  const res = await request(app)
    .get("/user-records")
    .set("Authorization", authToken);

  console.log("Response:", res.body); // Log the response

  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty("message", "Records retrieved successfully");
  expect(res.body).toHaveProperty("records");
  expect(res.body.records[0]).toHaveProperty(
    "records",
    "Test medical record details"
  );
  expect(res.body.records[0]).toHaveProperty(
    "specialNotes",
    "Test special notes"
  );
});
