const express = require('express');
const path = require('path');
const { insertProfile, editProfile, deleteProfile, consultProfileAll, consultProfileById } = require('../../services/profileServices');
const router = express.Router();



//POST

//Route to insert a new profile in database

router.post('/profile-management/new-profile', async (req, res) => {
    const {
        profile_name, 
        has_profile_management = false, 
        has_user_management = false, 
        has_inventory_management = false, 
        has_maintenance = false, 
        has_store_management = false, 
        has_shipping = false, 
        has_receiving = false
    } = req.body;

    try {
        const newProfile = await insertProfile(
            profile_name, 
            has_profile_management, 
            has_user_management, 
            has_inventory_management, 
            has_maintenance, 
            has_store_management, 
            has_shipping, 
            has_receiving
        );
        res.status(201).json({ message: 'Profile Successfully Registered!', PROFILE: newProfile });
    } catch (error) {
        res.status(500).json({ message: 'Error! Something Went Wrong!', error: error.message });
    }
});


module.exports = router;

//GET

//ROUTE TO CONSULT PROFILE

router.get('/profiles', async (req, res) => {
    try {
        const profiles = await consultProfileAll();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profiles', error: error.message });
    }
});

module.exports = router;

// Function to Consult a profile by ID


router.get('/profiles/:profile_id', async (req, res) => {
    const { profile_id } = req.params;

    try {
        const profile = await consultProfileById(profile_id);

        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile by ID', error: error.message });
    }
});
module.exports = router;

//PUT

//Route to edit a profile

router.put('/profile-edit/:profile_id', async (req, res) => {
    const { profile_id } = req.params;
    const {
        profile_name, 
        has_profile_management, 
        has_user_management, 
        has_inventory_management, 
        has_maintenance, 
        has_store_management, 
        has_shipping, 
        has_receiving
    } = req.body;

    try {
        const updateProfile = await editProfile(
            profile_id, 
            profile_name, 
            has_profile_management, 
            has_user_management, 
            has_inventory_management, 
            has_maintenance, 
            has_store_management, 
            has_shipping, 
            has_receiving
        );

        if (updateProfile) {
            res.status(200).json({ message: 'Profile Updated Successfully!', profile: updateProfile });
        } else {
            res.status(404).json({ message: 'Profile Not Found!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong!', error: error.message });
    }
});

module.exports = router;


//DELETE

//Route to Delete a Profile

router.delete('/profile-delete/:profile_id', async (req, res) => {
    const { profile_id } = req.params;

    try {
        const deletedProfile = await deleteProfile(profile_id);
        if (deletedProfile) {
            res.status(200).json({ message: 'Profile Has Been Deleted!', profile: deletedProfile });
        } else {
            res.status(404).json({ message: 'Profile Not Found!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong!', error: error.message });
    }
});

module.exports = router;




