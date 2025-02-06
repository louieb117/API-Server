const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.post('/:id', loginController.login); // POST /api/login
router.post('/', loginController.login); // POST /api/login

module.exports = router;