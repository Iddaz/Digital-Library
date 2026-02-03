import mongoose from 'mongoose';

// Defining the schema for the User model in the database
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
    },
    books: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Book',
        default: [],
        max: 3,
        required: false,
    }
});

export const User = mongoose.model('User', userSchema);
