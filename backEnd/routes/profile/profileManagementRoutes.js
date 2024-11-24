const express = require('express');
const ProfileController = require('../../controllers/profileController');
const router = express.Router();
const {authMiddleware} = require("../../middlewares/authMiddleware");


//CRUD

// POST - Create a new Profile
router.post('/profile-management/new-profile', authMiddleware, ProfileController.createProfile);

// GET - Consult all Profiles
router.get('/profiles', authMiddleware, ProfileController.getAllProfiles);

// GET - Consult Profile By ID
router.get('/profiles/:profile_id', authMiddleware, ProfileController.getProfileById);

// PUT - Update a Store
router.put('/profile-edit/:profile_id',authMiddleware, ProfileController.updateProfile);

// DELETE - Delete a Profile
router.delete('/profile-delete/:profile_id', authMiddleware, ProfileController.deleteProfile);

module.exports = router;
