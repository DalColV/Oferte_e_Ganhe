const express = require('express');
const path = require('path');
const { insertProfile } = require('../services/profile-services');
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
    const {id_perfil, nome_perfil, id_acesso} = req.body;

    try{ const newProfile = await insertProfile(id_perfil, nome_perfil, id_acesso);
        res.status(201).json({message: 'Profile Successfully Registered!', PERFIS: newProfile});

    }catch (error){
        res.status(500).json({message: 'Error! Something Went Wrong!', err: error.message})
    }
});

module.exports = router;
