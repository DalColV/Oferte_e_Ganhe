const express = require('express');
const UserController = require('../../controllers/userController');
const router = express.Router();
const {authMiddleware} = require("../../middlewares/authMiddleware");
const { permissionMiddleware } = require("../../middlewares/permissionMiddleware");

//GET - Consult ID from profile
router.get('/user/profile', authMiddleware, UserController.getUserProfile);
// POST - Register a new user
router.post('/register', UserController.registerUser);

// GET - Consult all users
router.get('/users', authMiddleware, permissionMiddleware("has_user_management"), UserController.consultAllUsers);

// GET - Consult a specific user by registration
router.get('/users/:registration', authMiddleware, permissionMiddleware("has_user_management"), UserController.consultUserByRegistration);

// PUT - Update a user
router.put('/user-edit/:registration', authMiddleware, permissionMiddleware("has_user_management"), UserController.updateUser);

// DELETE - Delete a user
router.delete('/user-delete/:registration', authMiddleware, permissionMiddleware("has_user_management"), UserController.deleteUser);

module.exports = router;


