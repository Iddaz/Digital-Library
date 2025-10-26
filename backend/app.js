import express from 'express';
import { PORT, mongodbURL } from './config.js';
import mongoose from 'mongoose';
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

// Enable CORS for all routes, in order to authorise requests from the frontend
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

// Stating that all routes starting with /books will be handled in booksRoutes
app.use('/books', booksRoutes);

// Connecting to the database
mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log('The database is connected to the website');

        // Starting the server
        app.listen(PORT, () => {
            console.log('App is working on the port:', PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
