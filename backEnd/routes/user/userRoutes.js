const express = require('express');
const UserController = require('../../controllers/userController');
const router = express.Router();
const {authMiddleware} = require("../../middlewares/authMiddleware");

// POST - Register a new user
router.post('/register', UserController.registerUser);

// GET - Consult all users
router.get('/users', UserController.consultAllUsers);

// GET - Consult a specific user by registration
router.get('/users/:registration', UserController.consultUserByRegistration);

// PUT - Update a user
router.put('/register-edit/:registration', UserController.updateUser);

// DELETE - Delete a user
router.delete('/register-delete/:registration', UserController.deleteUser);

module.exports = router;


