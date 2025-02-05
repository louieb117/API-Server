const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Define user-related routes
router.get('/', userController.getAllUsers); // GET /api/users
router.get('/:id', userController.getUser); // GET /api/users/:id
router.post('/', userController.createUser); // POST /api/users/:id
router.put('/:id', userController.updateUser); // PUT /api/users/:id
router.delete('/:id', userController.deleteUser); // DELETE /api/users/:id
router.get('/username/:username', userController.getUserByUsername);

module.exports = router;
