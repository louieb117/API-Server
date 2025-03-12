const express = require('express');
const router = express.Router();

// const { authenticate } = require('../middlewares/authMiddleware');
const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

// Define user-related routes
router.get('/', getAllUsers); // GET /api/users
router.get('/:id', getUser); // GET /api/users/:id
router.get('/:username', getUser); // GET /api/users/:username

router.post('/', createUser); // POST /api/users/

router.put('/:id', updateUser); // PUT /api/users/:id
router.put('/:username', updateUser); // PUT /api/users/:username

router.delete('/:id', deleteUser); // DELETE /api/users/:id
router.delete('/:username', deleteUser); // DELETE /api/users/:username

module.exports = router;
