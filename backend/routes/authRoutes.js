import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } from '../config.js';
import bodyParser from 'body-parser';
import refreshToken from '../middlewares/refreshToken.js';

const router = express.Router();

// Storing refresh tokens in memory so that they can be invalidated upon logout
let refreshTokens = [];

// Middleware to parse JSON and URL-encoded bodies so that req.body can be accessed
router.use(bodyParser.urlencoded({ extended: true }));

// Adding a new user
router.post('/register', async (req, res) => {
    try {
        const { name, surname, username, password, confirmPassword } = req.body;

        if (!name || !surname || !username || !password || !confirmPassword) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .send({ message: 'Password must be at least 6 characters' });
        }
        if (password !== confirmPassword) {
            return res.status(400).send({ message: 'Passwords do not match' });
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res
                .status(400)
                .send({ message: 'Username is already taken' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            surname,
            username,
            password: hashedPassword,
            admin: false,
        });

        await newUser.save();

        return res.status(201).send({ message: 'User created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password,
        );
        if (!isPasswordValid) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        // Generate access and refresh tokens for the logged in user
        const userPayload = { username: existingUser.username, id: existingUser._id, admin: existingUser.admin };
        const accessToken = jwt.sign(userPayload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refresh = refreshToken(userPayload);
        refreshTokens.push(refresh);

        return res.status(200).send({ message: 'Login successful', accessToken, refreshToken: refresh });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
});

// User logout
router.delete('/logout', async (req, res) => {
    try {
        // Invalidate the refresh token (expecting { token })
        const { token } = req.body;
        if (!token) return res.status(400).send({ message: 'Refresh token required' });

        refreshTokens = refreshTokens.filter((t) => t !== token);
        return res.status(200).send({ message: 'Logout successful' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
});

export default router;
