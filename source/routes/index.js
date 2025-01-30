const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const loginRoutes = require('./login');
const profileRoutes = require('./profile');

// Routes 
router.use('/request/users', userRoutes);

router.use('/login', loginRoutes);

router.use('/auth/profile', profileRoutes);

module.exports = router;