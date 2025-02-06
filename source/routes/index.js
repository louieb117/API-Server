const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const loginRoutes = require('./login');
const profileRoutes = require('./profile');

// Routes 
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API Server' });
});

router.use('/login', loginRoutes);

router.use('/request/users', userRoutes);

router.use('/auth/profile', profileRoutes);

module.exports = router;