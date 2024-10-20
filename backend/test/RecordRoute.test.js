const request = require('supertest');
const app = require('../server'); // Assuming this is where your Express app is

// Define the authorization token
const authToken = 'Bearer eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18ybkNIZFhoSXRmMXlxTVFKU3NaTHFvZ05YaEkiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJleHAiOjE3Mjk0MTUxMDEsImlhdCI6MTcyOTQxNTA0MSwiaXNzIjoiaHR0cHM6Ly9jYXVzYWwtYm94ZXItOTAuY2xlcmsuYWNjb3VudHMuZGV2IiwibmJmIjoxNzI5NDE1MDMxLCJzaWQiOiJzZXNzXzJuZWpIVG40clNCWEdadlNCQjBaM2pSM1JSaCIsInN1YiI6InVzZXJfMm5FdWY4dnhNOFllMzJNYWxGOEY0RDJaZmRpIn0.Lv8qS8vkndQdpoKoGfozlx8ANBCPflSscEySf_Tw9IWPcudAk9NHn3d5zqOAlSqlADJIsrFFvyRjsV88JtB_1htPCI6DDrLdVQAFnKmUiNrnSTgRGSmUBDoI0NcetO6_0bpE0LPGIKS5QDC9kgVwIcVmlRTDmwqpkE27SC2KBUuzVMoD0uh9rt3A5sp_8ouBHnOoKW7yjeR2pYSh2JnRFJDZRWZQTnYd86PD-gJ8ywNRcCHg8r8vX8CvaZtMOQ7atJuJuIpb7A6ANrosEU9OS4Ih8tWQc4tzMeBKsd9YXeHDN_F2iyShEb0Nel0B8yeSzDflMPGl3rYYOWNI-TuM8Q'
describe('GET /record/get-records/:userId', () => {
    it('should return all records for a specific patient', async () => {
        console.log('Testing: Fetching records for patient');
        const res = await request(app)
            .get('/record/get-records/67079a509fcf32e3b67793c4') // Assuming you are testing this route
            .set('Authorization', authToken); // Use the defined token

        console.log('Response:', res.body); // Log the response
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('records');
    });

    it('should return 404 if no records found', async () => {
        const res = await request(app)
            .get('/record/get-records/non-existent-user-id')
            .set('Authorization', authToken); // Use the defined token

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toBe('No records found for this patient.');
    });
});

// Tests for inserting records
describe('POST /record/add-record', () => {
    it('should create a new medical record', async () => {
        const res = await request(app)
            .post('/record/add-record')
            .set('Authorization', authToken) // Use the defined token
            .send({
                userId: "67079a509fcf32e3b67793c4",
                records: 'New medical record details',
                specialNotes: 'No special notes',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Record created successfully');
        //expect(res.body.record).toHaveProperty('_id');
        //expect(res.body.record).toEqual('67079a509fcf32e3b67793c4');
        //expect(res.body.record).toEqual('67079a509fcf32e3b67793c4');
        expect(res.body.record.records).toEqual('New medical record details');
        expect(res.body.record.specialNotes).toEqual('No special notes');
    });

    it('should return an error if no authorization token is provided', async () => {
        const res = await request(app)
            .post('/record/add-record')
            .send({
                userId: "67079a509fcf32e3b67793c4",
                records: 'New medical record details',
                prescription: 'New medication',
                specialNotes: 'No special notes',
            });

        //  expect(res.statusCode).toEqual(401); // Unauthorized
    });
});
