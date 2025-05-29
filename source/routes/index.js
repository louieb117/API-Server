const express = require('express');
const router = express.Router();
const loginRoutes = require('./login');
const userRoutes = require('./users');
const scorecardRoutes = require('./scorecards');
const { authenticate } = require('../middlewares/authMiddleware');
// const profileRoutes = require('./profile');

// Routes 
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API Server' });
});

router.use('/login', loginRoutes);

router.use('/request/users', userRoutes);

router.use('/request/scorecards', scorecardRoutes);

// router.use('/auth/profile', profileRoutes);

module.exports = router;