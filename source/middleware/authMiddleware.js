const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided.' });
    }

    try {
        // Example verification logic (e.g., using JWT)
        const decoded = jwt.verify(token, process.env.MY_JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.clearCookie('token');
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticate;
