import mongoose from 'mongoose';
import { createClient } from "redis";

const redisClient = createClient({
    password: 'nLzsUtyqysHRjGNgmMsCjKKPDS7dUwbn',
    socket: {
        host: 'redis-15513.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 15513
    }
});

const connectMongoDB = () => {
    mongoose.connect(process.env.DB_URI);

    mongoose.connection.on('connected', () => {
        console.log("MongoDB connected");
    });
};

const connectRedisDB = () => {
    redisClient.connect();

    redisClient.on('connect', () => {
        console.log('Connected to Redis cache');
    });
    
    redisClient.on('error', (err) => {
        console.log('Redis error:', err);
    });
};

export { connectMongoDB, connectRedisDB, redisClient };
