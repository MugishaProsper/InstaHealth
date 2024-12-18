import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectionToDatabase = async () => {
    try {
        mongoose.connect(process.env.mongo_url).then(() => console.log('Connected to MongoDB'));
    } catch (error) {
        console.error(error.message);
    }
}