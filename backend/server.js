import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './database/database.js';


//config
dotenv.config({path:"./backend/database/config.env"});

connectDB();

app.use((req, res, next) => {
    res.status(404).send("Sorry, resource not found!");
});
  
app.listen(process.env.PORT,() => {
    console.log(`Server running on port ${process.env.PORT}`);
})
