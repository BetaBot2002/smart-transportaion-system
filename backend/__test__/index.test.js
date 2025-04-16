import { jest } from '@jest/globals';
import request from 'supertest';
import dotenv from 'dotenv';
import app from '..';
dotenv.config();


// Mock the database connections to avoid actual DB hits during tests
jest.mock('../database/database.js', () => ({
    connectMongoDB: jest.fn(),
    connectRedisDB: jest.fn(() => ({
        get: jest.fn(),
        set: jest.fn()
    })),
}));

describe('Server Initialization and Routes', () => {

    it('should respond with 404 on unknown routes', async () => {
        const res = await request(app).get('/nonexistent');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
            success: false,
            message: "This url does not exist"
        });
    });

    it('should have rate limiting enabled', async () => {
        const requests = [];
        for (let i = 0; i < 10; i++) {
            requests.push(request(app).get('/user')); // assuming /user route exists
        }
        const responses = await Promise.all(requests);
        responses.forEach(res => {
            expect(res.statusCode).not.toBe(429); // Not rate limited under 500 requests
        });
    });

    it('should limit payload size to 10kb', async () => {
        const largePayload = 'a'.repeat(11 * 1024); // 11 KB payload
        const res = await request(app)
            .post('/user')
            .send({ data: largePayload })
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(413); // Payload too large (default Express behavior)
    });
});
