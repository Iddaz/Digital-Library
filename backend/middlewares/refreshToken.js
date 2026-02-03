import jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_SECRET } from '../config.js';

// Function to generate a new refresh token, so that the user can obtain new access tokens without re-authenticating
const refreshToken = (user) => {
    return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '15s' });
};

export default refreshToken;
