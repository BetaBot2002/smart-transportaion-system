import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import station from './routes/stationRoutes.js';
import user from "./routes/userRoutes.js";
import cors from 'cors';
import connectDB from './database/database.js';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';

// Connect to the database
connectDB();

const app = express();

// Security-related middlewares
app.use(helmet());
app.use(xss());
app.use(cors());

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    limit: 200, // Limit each IP to 200 requests per window
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Payload size limiting
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// Application routes
app.use("/station", station);
app.use("/user", user);

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send({
        success: false,
        message: "This url does not exist"
    });
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    console.log(`working process id = ${process.pid}`);
});
