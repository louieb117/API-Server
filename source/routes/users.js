const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Define user-related routes
router.get('/', userController.getAllUsers); // GET /api/users
router.get('/:id', userController.getUser); // GET /api/users/:id
router.post('/:id', userController.createUser); // POST /api/users/:id
router.put('/:id', userController.updateUser); // PUT /api/users/:id
router.delete('/:id', userController.deleteUser); // DELETE /api/users/:id

module.exports = router;
