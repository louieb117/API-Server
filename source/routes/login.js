const express = require('express');
const router = express.Router();

const loginController = require('/app/controllers/loginController');

router.post('/', loginController.login); // POST /api/login

module.exports = router;