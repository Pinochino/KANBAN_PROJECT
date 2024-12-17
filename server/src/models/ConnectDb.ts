require('dotenv').config();
import { Application } from 'express';
import mongoose from 'mongoose';

export async function connectDb(app: Application) {
    try {
        const url = process.env.DATABASE_URL;
        await mongoose.connect(url!);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error(`Database connection error: ${error}`);
        process.exit(1); 
    }
}