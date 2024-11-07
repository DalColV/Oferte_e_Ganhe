const express = require('express');
const path = require('path');
const { insertProfile, editProfile } = require('../services/profile-services');
const router = express.Router();

//Rota para servir gestão de Perfis

router.get('/view-profile-management', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/management/view-profile-management.html'));

});
module.exports = router;

//Rota para servir Criar novo perfil

router.get('/view-profile-management/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/management/view-new-profile.html'));

});

module.exports = router;

//POST

//Route to insert a new profile in database

router.post('/profile-management/new-profile', async (req, res) => {
    const {profile_id, profile_name, access_id} = req.body;

    try{ const newProfile = await insertProfile(profile_id, profile_name, access_id);
        res.status(201).json({message: 'Profile Successfully Registered!', PROFILE: newProfile});

    }catch (error){
        res.status(500).json({message: 'Error! Something Went Wrong!', err: error.message})
    }
});

module.exports = router;

//PUT

//Route to edit a profile

router.put('/profile-edit/:profile_id', async (req, res) =>{
    const {profile_id} = req.params;
    const {profile_name, access_id} = req.body;

    try{ const updateProfile = await editProfile(profile_id, profile_name, access_id);
        if(updateProfile){
        res.status(200).json({message: 'Profile Updated Successfully!', profile: updateProfile});

    }else{res.status(404).json({message: 'Profile Not Found!'});}
}catch(error){
    res.status(500).json({message: 'Something Went Wrong!', error: error.message});
}
});


