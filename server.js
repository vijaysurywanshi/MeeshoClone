// const express = require('express');
import express from 'express'; //this is es6 import syntax
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import cors from 'cors';
import  categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'


// to use dotenv 
dotenv.config();

connectDB();

//all the express functionality comes in the app variable
const app = express();

//middleware
app.use(cors()); //this is for localhost cross origin resource sharing
app.use(express.json()); //this is middleware but no need to call next() because express automatically calls it 
app.use(morgan('dev'));  //^ same for this also 



//routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);


app.get('/', (req, res) => {

    res.send({
        message: "Hello World"
    })
})

const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
)