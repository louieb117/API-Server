const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const profileController = require('/app/controllers/profileController');

router.get('/', authMiddleware, profileController.getProfile); // GET /api/profile
router.put('/', authMiddleware, profileController.updateProfile); // PUT /api/profile

module.exports = router;