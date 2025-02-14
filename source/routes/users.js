const express = require('express');
const router = express.Router();

const { authenticate } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Define user-related routes
router.get('/', userController.getAllUsers); // GET /api/users
router.get('/:id', userController.getUser); // GET /api/users/:id
router.get('/:username', userController.getUser); // GET /api/users/:username

router.post('/', userController.createUser); // POST /api/users/

router.put('/:id', authenticate, userController.updateUser); // PUT /api/users/:id
router.put('/:username', authenticate, userController.updateUser); // PUT /api/users/:username

router.delete('/:id', authenticate, userController.deleteUser); // DELETE /api/users/:id
router.delete('/:username', authenticate, userController.deleteUser); // DELETE /api/users/:username

module.exports = router;
