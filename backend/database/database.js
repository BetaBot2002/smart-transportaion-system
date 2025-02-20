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
        password: 'nLzsUtyqysHRjGNgmMsCjKKPDS7dUwbn',
        socket: {
            host: 'redis-15513.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
            port: 15513
        }
    });
    client.connect();

    client.on('connect', () => {
        console.log('Connected to Redis cache');
    });
    
    client.on('error', (err) => {
        console.log('Redis error:', err);
        return;
    });
    return client;
}

export { connectMongoDB, connectRedisDB };

