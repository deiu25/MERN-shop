// importăm modulele necesare
import app from './app.js';
import connectDatabase from './config/database.js';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.error(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Uncaught Exception');
    process.exit(1)
})

dotenv.config({ path: './.env' });

// Connecting to database
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.error(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    // Close server & exit process
    server.close(() => {
        process.exit(1)
    })
})