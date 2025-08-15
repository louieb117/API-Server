const express = require('express');
const router = express.Router();

// const authMiddleware = require('../middlewares/authMiddleware');
const {
    getAllProfiles,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile
} = require('../controllers/profileController');

// router.get('/', authMiddleware.authenticate, getAllProfiles); // GET /api/profile
// router.get('/:id', authMiddleware.authenticate, getProfile); // GET /api/profile/:id

// router.post('/', authMiddleware.authenticate, createProfile); // POST /api/profile

// router.put('/:id', authMiddleware.authenticate, updateProfile); // PUT /api/profile/:id

// router.delete('/:id', authMiddleware.authenticate, deleteProfile); // DELETE /api/profile/:id


router.get('/', getAllProfiles); // GET /api/profile
router.get('/:id', getProfile); // GET /api/profile/:id

router.post('/', createProfile); // POST /api/profile

router.put('/:id', updateProfile); // PUT /api/profile/:id

router.delete('/:id', deleteProfile); // DELETE /api/profile/:id

module.exports = router;