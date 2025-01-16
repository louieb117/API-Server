const express = require('express');
const router = express.Router();

const userRoutes = require('./users.js');

// Routes 
router.use('/users', userRoutes); 

module.exports = router;