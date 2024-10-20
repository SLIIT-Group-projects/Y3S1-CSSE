const request = require('supertest');
const app = require('../server'); 
const mongoose = require('mongoose');

// Define the authorization token
const authToken = 'Bearer eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18ybkNIZFhoSXRmMXlxTVFKU3NaTHFvZ05YaEkiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJleHAiOjE3Mjk0MjY5MTYsImlhdCI6MTcyOTQyNjg1NiwiaXNzIjoiaHR0cHM6Ly9jYXVzYWwtYm94ZXItOTAuY2xlcmsuYWNjb3VudHMuZGV2IiwibmJmIjoxNzI5NDI2ODQ2LCJzaWQiOiJzZXNzXzJuY0ZDYURVOFpCeDIybUhPRlptNVhiTlZpbCIsInN1YiI6InVzZXJfMm5OUXpFUG9ZN3BSWENRNXNVdzg4bmR1WjVkIn0.ydQgnj4mDot3HpL0pAzFKePADkhdXdZs7oyRG-IOpHl6YhRJ_ffOlvD-LoTZcjHvA5sKRqXDyi4_lKUfKrlzKx9k_R1-1QFy1ha9vCdCL90CxYXvRCASdFTZDxGYQKskt70iO4Yug5doGoeTnMt9WVwygsU8J3PxcKY01But2FOSh-DV2hG2HR7zXy9a1K0wIHEHUAXOyKNQapXBK1bhDSZE0IyY_hSgdNoEAaIahixvZf8VrGXW-UwGqf3AOjAmIVVkKX5GhSpn1FQYMyZpxzhePESfgn1SaYI2GivmZ4JNNqKy7mKlv2me2R9qNYYBkuaJmfigL8DQqmZSTjvBnQ'; // Replace with a valid token for testing

describe('POST /appointment/create-appointment', () => {
    it('should create a new appointment', async () => {
        const res = await request(app)
            .post('/appointment/create-appointment')
            .set('Authorization', authToken)
            .send({
                patient_name: 'John Doe',
                patient_email: 'johndoe@example.com',
                age: 30,
                doctor_name: 'Dr. Smith',
                doc_id: '67079a509fcf32e3b67793c4',
                day: 'Monday',
                slot: '10:00 AM',
                appointment_date: new Date().toISOString(),
                note: 'Initial consultation',
                status: 'Pending'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Appointment created successfully');
        expect(res.body.appointment).toHaveProperty('patient_name', 'John Doe');
    });

    
});

describe('GET /get-doctor-appointments', () => {
    it('should return pending appointments for the doctor', async () => {
        const res = await request(app)
            .get('/appointment/get-doctor-appointments')
            .set('Authorization', authToken);

            console.log(res.body);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', "Today's pending appointments retrieved successfully.");
        expect(res.body).toHaveProperty('appointments');
    });

});


describe('DELETE /delete-appointment/:id', () => {
    it('should delete an appointment', async () => {
        const appointmentId = '6714de7d8401186c9aa519b5'; 

        const res = await request(app)
            .delete(`/appointment/delete-appointment/${appointmentId}`)
            .set('Authorization', authToken);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Appointment deleted successfully');
    });

});
