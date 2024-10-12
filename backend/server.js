import app from './app.js';
import dotenv from "dotenv"
import connectDB from './database/database.js';

dotenv.config()

connectDB();

app.use((req, res, next) => {
    res.status(404).send({
        success:false,
        message:"This url does not exist"
    });
});
  
app.listen(process.env.PORT,() => {
    console.log(`Server running on port ${process.env.PORT}`);
})
