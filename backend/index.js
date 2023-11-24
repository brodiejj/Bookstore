import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
//Import routes
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy
/*
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-type'],
}));
*/
app.use(cors());

//Home
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome')
});

//Routes
app.use('/books', booksRoute);

//Connects to database and starts express app listening on PORT
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("MongoDB successfully connected");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
