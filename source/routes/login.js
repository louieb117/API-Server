const express = require('express');
const router = express.Router();

const loginController = require('/app/controllers/loginController');

router.post('/', loginController); // GET /api/users

module.exports = router;