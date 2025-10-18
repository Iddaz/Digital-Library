import express from 'express';
import { PORT, mongodbURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/Book.js';

const app = express();

app.use(express.json());

app.post('/books', async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                message: 'The name of the book is missing',
            });
        }

        const newBook = {
            name: req.body.name,
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log('The database is connected to the website');
        app.get('/', (req, res) => {
            return res.status(200).send('The page is working!');
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(PORT, () => {
    console.log('App is working on the port:', PORT);
});
