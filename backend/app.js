const express = require('express');
const app = express();

app.use(express.json());

//Importing all routes
const products = require('./routes/product');

app.use('/api/v1', products);

module.exports = app;

//node backend/server.js
//npm run dev
//npm run prod

//mongod
//mongosh