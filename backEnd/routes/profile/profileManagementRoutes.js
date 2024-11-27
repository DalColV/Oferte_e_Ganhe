const express = require('express');
const ProfileController = require('../../controllers/profileController');
const router = express.Router();
const {authMiddleware} = require("../../middlewares/authMiddleware");


//CRUD

// POST - Create a new Profile
router.post('/profile-management/new-profile', ProfileController.createProfile);

// GET - Consult all Profiles
router.get('/profiles', ProfileController.getAllProfiles);

// GET - Consult Profile By ID
router.get('/profiles/:profile_id', ProfileController.getProfileById);

// PUT - Update a Store
router.put('/profile-edit/:profile_id', ProfileController.updateProfile);

// DELETE - Delete a Profile
router.delete('/profile-delete/:profile_id', ProfileController.deleteProfile);

module.exports = router;
