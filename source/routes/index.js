const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const loginRoutes = require('./login')

// Routes 
router.use('/request/users', userRoutes);

router.use('/login', loginRoutes);

module.exports = router;