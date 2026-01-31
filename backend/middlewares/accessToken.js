import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from '../config.js';

// Middleware to authenticate access tokens so that only authorized users can access certain routes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

export default authenticateToken;