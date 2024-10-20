const request = require('supertest');
const app = require('../server'); // Assuming this is where your Express app is

// Define the authorization token
const authToken = 'Bearer eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18ybkNIZFhoSXRmMXlxTVFKU3NaTHFvZ05YaEkiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJleHAiOjE3Mjk0MTU4MDMsImlhdCI6MTcyOTQxNTc0MywiaXNzIjoiaHR0cHM6Ly9jYXVzYWwtYm94ZXItOTAuY2xlcmsuYWNjb3VudHMuZGV2IiwibmJmIjoxNzI5NDE1NzMzLCJzaWQiOiJzZXNzXzJuY0ZDYURVOFpCeDIybUhPRlptNVhiTlZpbCIsInN1YiI6InVzZXJfMm5OUXpFUG9ZN3BSWENRNXNVdzg4bmR1WjVkIn0.hKjB9IG8_4LpgUgVuAYhoHN5r7Sy1gv7q3186QqwEJwPTIienHMfCl5eFyXwHBq98rE_2xhyZU4v7ufjPfPG6XEI6eIY4D2R4dB4kr7oRRK0g1Nq5wHDJ1ezEENT4nVZeWOYVC2kpFfAfOGgCHxHH0N8gRb20q1hRTmCHO5K3ErJfNgTTLWFpeFpZci4_mB5jAOXLlUQwXbdmwE-Vfk_UTl5SnGv4ED8E_N-f-ujPD9SGF_jzKZJSNf5jCBP49bpYIEoYxunhf-H6wwBK0czCQm_68EHoHppNx3wQaI0ec1azhId7wbrVEKptyFzEfajyR8ymwAhcwIgiGMhOIMwNQeyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18ybkNIZFhoSXRmMXlxTVFKU3NaTHFvZ05YaEkiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJleHAiOjE3Mjk0MTYxNjgsImlhdCI6MTcyOTQxNjEwOCwiaXNzIjoiaHR0cHM6Ly9jYXVzYWwtYm94ZXItOTAuY2xlcmsuYWNjb3VudHMuZGV2IiwibmJmIjoxNzI5NDE2MDk4LCJzaWQiOiJzZXNzXzJuY0ZDYURVOFpCeDIybUhPRlptNVhiTlZpbCIsInN1YiI6InVzZXJfMm5OUXpFUG9ZN3BSWENRNXNVdzg4bmR1WjVkIn0.nvTTJE5QjupteydnP7QQj8C5fPcqyK7S3Vpt7bPubgVKstE981DwntirFps6FYwHxZntR71cuD83CQOcsHTG_hSmErF_HuW_ZE6625LR_GeKAr8x6s3KaoFLIhvD5ogjvNRwuAKqAcWQk3qt-XwbbNRjgDC084uk4GCVXkG_IZsj629b9xkkdMxNZo251xaj7EVMtfGM-Uh0GeoIc_yWFdwuyaWGDZFNcp9gQxTKNGhxGjwzCh7EqOFEWCThZGrADa03TTaQ96x2Me8Ll04jcFTXhDo226a_6DWy9irgMbSfX9L4HqKMTQWnzYxUrke5n3Tp1yei2DGPcua86PBjOg'
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