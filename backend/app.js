import express from 'express';
import { PORT, mongodbURL } from './config.js';
import mongoose from 'mongoose';
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);
app.use('/books', booksRoutes);

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('The page is working!');
});

mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log('The database is connected to the website');
        app.listen(PORT, () => {
            console.log('App is working on the port:', PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
