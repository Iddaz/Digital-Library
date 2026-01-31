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
});

export const User = mongoose.model('User', userSchema);
