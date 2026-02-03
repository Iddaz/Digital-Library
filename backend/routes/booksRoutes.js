import express from 'express';
import mongoose from 'mongoose';
import { Book } from '../models/Book.js';
import { User } from '../models/User.js';
import authenticateToken from '../middlewares/accessToken.js';

const router = express.Router();

// Require authentication for all /books routes
router.use(authenticateToken);

// Adding a book
router.post('/', async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                message: 'The name of the book is missing',
            });
        }

        const newBook = {
            name: req.body.name,
            author: req.body.author,
            description: req.body.description,
            taken: req.body.taken ? true : false,
        };

        const book = await Book.create(newBook);

        return res
            .status(201)
            .send({ message: 'A new book created', book: book });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Displaying all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
});

// Finding a single book by an ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(400).send({ message: 'Book not found' });
        }

        return res.status(200).json(book);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
});

// Updating a book
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                message: 'Send the name of the book',
            });
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const book = await Book.findById(id);

        return res.status(200).send({ message: 'Book updated', book: book });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err });
    }
});

// Reserving a book
router.put('/reserve/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params;
        const userId = req.user.id;

        const book = await Book.findByIdAndUpdate(bookId, { taken: true });
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (user.books.length >= 3) {
            return res
                .status(400)
                .send({ message: 'Reservation limit reached' });
        } else {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { books: bookId } },
                { new: true },
            );
            return res.status(200).send({
                message: 'Book reserved',
                book: book,
                user: updatedUser,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err });
    }
});

// Delete a book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const bookObjectId = new mongoose.Types.ObjectId(id);

        // Delete the book
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Remove book from all users who have it reserved
        await User.updateMany({}, { $pull: { books: bookObjectId } });

        return res
            .status(200)
            .send({ message: 'Book deleted and removed from all users' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
});

export default router;
