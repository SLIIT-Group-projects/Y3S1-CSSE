const request = require('supertest');
const app = require('../server'); // Assuming this is where your Express app is
const mongoose = require('mongoose');

// Define the authorization token
const authToken = 'Bearer eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18ybkNIZFhoSXRmMXlxTVFKU3NaTHFvZ05YaEkiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJleHAiOjE3Mjk0MjExMTksImlhdCI6MTcyOTQyMTA1OSwiaXNzIjoiaHR0cHM6Ly9jYXVzYWwtYm94ZXItOTAuY2xlcmsuYWNjb3VudHMuZGV2IiwibmJmIjoxNzI5NDIxMDQ5LCJzaWQiOiJzZXNzXzJuY0ZDYURVOFpCeDIybUhPRlptNVhiTlZpbCIsInN1YiI6InVzZXJfMm5OUXpFUG9ZN3BSWENRNXNVdzg4bmR1WjVkIn0.uP9pqogk4X0wfXOD7PT-6OF0j0HIw3kZGIO6gNrT1NpfyUxTyARwp3HPemJpxAvNUx8TVw2pwXA9B9Dymwegx5D7Ar1dkTRcnIH8szcXjuDon8e-RKQBivPjOyQ-zN5SLlurrJQfORomKrSDu6jJdm_q6-fE7J4N_uQoE_UGMxKjn3CZ3g_pjoTZQVHAZCAKt1UFd6zUIRXdqcSE2oN98mGSfpqPmyphk_DiVIyDSA3K70OpWk9CDVuPlimf1Jjw0sdXO8oNJaF9XexM59nzZwdUmXwdnR5yvFTYtl-lsBH9gBnOpPKUbCuCYYe2Eds1i0-mqlbpm7VHFh9yhNZ2RA'; // Replace with a valid token for testing

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

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', "Today's pending appointments retrieved successfully.");
        expect(res.body).toHaveProperty('appointments');
    });

});


describe('DELETE /delete-appointment/:id', () => {
    it('should delete an appointment', async () => {
        const appointmentId = '6714de7d8401186c9aa519b5'; // Replace with a valid appointment ID

        const res = await request(app)
            .delete(`/appointment/delete-appointment/${appointmentId}`)
            .set('Authorization', authToken);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Appointment deleted successfully');
    });

});
