import express from 'express';
import station from './routes/stationRoutes.js';
import user from "./routes/userRoutes.js"

const app=express();
app.use(express.json());

app.use("/smart-transportation",station);
app.use("/user",user);

export default app


