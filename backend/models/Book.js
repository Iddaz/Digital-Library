import mongoose from 'mongoose';

// Defining the schema for the Book model in the database
const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    taken: {
        type: Boolean,
    },
});

export const Book = mongoose.model('Book', bookSchema);
