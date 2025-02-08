const express = require('express');
const router = express.Router();

const {login} = require('../controllers/loginController');

router.post('/:id', login); // POST /api/login
router.post('/', login); // POST /api/login

module.exports = router;