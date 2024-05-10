import express from 'express';
import station from './routes/stationRoutes.js';

const app=express();
app.use(express.json());

app.use("/smart-transportation",station);

export default app


