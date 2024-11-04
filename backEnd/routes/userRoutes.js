const express = require('express');
const path = require('path');
const router = express.Router();
const { insertUser } = require('../services/user-services');

//GET

// Rota de cadastro de usuários
router.get('/view-register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/login-and-register/view-register.html'));
});

module.exports = router;

// Rota de login de usuários
router.get('/view-login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/login-and-register/view-login.html'));

});

module.exports = router;

// Rota de Recuperar Senha

router.get('/view-recover-password', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/recover-password/view-recover-password.html'));

});

module.exports = router;

//Rota resetar Senha

router.get('/view-reset-password', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/recover-password/view-reset-password.html'));

});

module.exports = router;

//POST

// Rota para cadastro de um novo usuário no banco

router.post('/register', async (req, res) => {
    const {matricula, nome_usuario, id_loja, id_perfil, email, senha } = req.body;

    try{
        const newUser = await insertUser(matricula, nome_usuario, id_loja, id_perfil, email, senha);
        res.status(201).json({message: 'User Successfully registered!', usuario: newUser});

    }catch (error){
         res.status(500).json({message: 'Error! Something went wrong, try again!', err: error.message});

    }
});

module.exports = router;


