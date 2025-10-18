import mongoose from 'mongoose';

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
