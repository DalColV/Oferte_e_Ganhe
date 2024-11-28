const express = require('express');
const UserController = require('../../controllers/userController');
const router = express.Router();
const {authMiddleware} = require("../../middlewares/authMiddleware");
const { permissionMiddleware } = require("../../middlewares/permissionMiddleware");


// POST - Register a new user
router.post('/register', UserController.registerUser);

// GET - Consult all users
router.get('/users', authMiddleware, permissionMiddleware("has_user_management"), UserController.consultAllUsers);

// GET - Consult a specific user by registration
router.get('/users/:registration', authMiddleware, permissionMiddleware("has_user_management"), UserController.consultUserByRegistration);

// PUT - Update a user
router.put('/register-edit/:registration', authMiddleware, permissionMiddleware("has_user_management"), UserController.updateUser);

// DELETE - Delete a user
router.delete('/register-delete/:registration', authMiddleware, permissionMiddleware("has_user_management"), UserController.deleteUser);

module.exports = router;


