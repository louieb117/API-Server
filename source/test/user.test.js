const request = require('supertest');
const http = require('http');
const app = require('../index'); // Adjust the path as necessary
const server = http.createServer(app); // Create an HTTP server
const { mongoose } = require('../configs/mongodb'); // Import the mongoose instance

require('dotenv').config();
const { reqCreateUser, reqUpdateUser } = require('../utils/data/user.test.data.js');

describe('User API', () => {
    let userId;

    test('Server is running', async () =>{
        const response = await request(server).get('/api');
        expect(response.status).toBe(200);
    });
    
    test('Database connection', async () => {
        const db = mongoose.connection;
        expect(db.readyState).toBe(1); // 1 means connected
    });

    test('Create a user', async () => {
        const response = await request(server)
            .post('/api/users')
            .send(
            { 
                fullName: "Jake The Dog",
                phoneNumber: "(555)123-4567",
                email: "jake.tester@potentiamaxima.com",
                username: "Jake.tester",
                password: "JakeSecure123!",
                role: "developer",
                creationDate: "{{$timestamp}}",
                activated: true,
                currentLocation: "CA",
                bio: "I'm a loyal and fun-loving test user"
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        userId = response.body.id;
    });

    test('Retrieve a user', async () => {
        const response = await request(server)
            .get(`/api/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'John Doe');
    });

    test('Update a user', async () => {
        const response = await request(server)
            .put(`/api/users/${userId}`)
            .send({ name: 'Jane Doe' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Jane Doe');
    });

    test('Delete a user', async () => {
        const response = await request(server)
            .delete(`/api/users/${userId}`);
        expect(response.status).toBe(204);
    });
});

afterAll(async () => {
    // Close the MongoDB connection
    await mongoose.connection.close();
});
afterAll(() => {
    jest.useRealTimers();
});
afterAll(() => {
    // Close the server
    server.close();
});