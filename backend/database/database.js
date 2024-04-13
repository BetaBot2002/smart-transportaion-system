import mongoose from 'mongoose';

const connectDB = () => {
    mongoose.connect(process.env.DB_URI)

    mongoose.connection.on('connected', () => {
        console.log("MongoDB connected");
    })
}

export default connectDB;
