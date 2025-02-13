const jwt = require('jsonwebtoken');
const {MY_JWT_SECRET} = require('../configs/config.js');// Load environment variables;

const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied, no token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided.' });
    }

    try {
        // Example verification logic (e.g., using JWT)
        const decoded = jwt.verify(token, MY_JWT_SECRET);
        req.password = decoded;
        next();
    } catch (err) {
        res.clearCookie('token');
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = {authenticate};
