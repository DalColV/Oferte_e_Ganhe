const express = require('express');
const ProfileController = require('../../controllers/profileController');
const router = express.Router();
const {authMiddleware} = require("../../middlewares/authMiddleware");
const { permissionMiddleware} = require('../../middlewares/permissionMiddleware');


//CRUD

// POST - Create a new Profile
router.post('/profile-new', authMiddleware, permissionMiddleware("has_profile_management"), ProfileController.createProfile);

// GET - Consult all Profiles
router.get('/profiles', authMiddleware, ProfileController.getAllProfiles);

// GET - Consult Profile By ID
router.get('/profiles/:profile_id', authMiddleware, ProfileController.getProfileById);

// PUT - Update a Profile
router.put('/profile-edit/:profile_id', authMiddleware, permissionMiddleware("has_profile_management"), ProfileController.updateProfile);

// DELETE - Delete a Profile
router.delete('/profile-delete/:profile_id', authMiddleware, permissionMiddleware("has_profile_management"), ProfileController.deleteProfile);

//GET - Relatório
router.get('/profile-report-csv',  ProfileController.exportProfileCSV);

module.exports = router;
