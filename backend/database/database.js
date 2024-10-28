import mongoose from 'mongoose';
import {createClient } from "redis";

const connectMongoDB = () => {
    mongoose.connect(process.env.DB_URI)

    mongoose.connection.on('connected', () => {
        console.log("MongoDB connected");
    })
}

const connectRedisDB = () => {
    const client = createClient({
        password: 'a9rQG4B2ZhvXTXuD9wqY3TkvUfP4riKz',
        socket: {
            host: 'redis-19648.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
            port: 19648
        }
    });
    client.connect();

    client.on('connect', () => {
        console.log('Connected to Redis cache');
    });
    
    client.on('error', (err) => {
        console.log('Redis error:', err);
    });
    return client;
}

export { connectMongoDB, connectRedisDB };

