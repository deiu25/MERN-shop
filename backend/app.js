// Importing dependencies
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';

import errorMiddleware from './middlewares/errors.js';
import products from './routes/product.js';
import auth from './routes/auth.js';
import order from './routes/order.js';
import payment from './routes/payment.js';

// Loading environment variables
dotenv.config({ path: '.env' });

// Initializing express app
const app = express();

// Applying middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Setting up routes
app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', payment);

// Applying error middleware
app.use(errorMiddleware);

// Exporting the app
export default app;