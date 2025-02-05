const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const profileController = require('../controllers/profileController');

router.get('/', authMiddleware.authenticate, profileController.getProfile); // GET /api/profile
router.put('/', authMiddleware.authenticate, profileController.updateProfile); // PUT /api/profile

module.exports = router;