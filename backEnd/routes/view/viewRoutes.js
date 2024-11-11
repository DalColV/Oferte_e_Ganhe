const express = require('express');
const path = require('path');
const router = express.Router();

// Rota para servir a Dashboard

router.get('/dashboard', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontEnd/public/dashboard/dashboard.html'));


});

module.exports = router;

//Rotas para servir a gestão de usuários

router.get('/management', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/management/view-user-management.html'));

});

module.exports = router;

// Rota pag de cadastro de usuários
router.get('/view-register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/login-and-register/view-register.html'));
});

module.exports = router;

// Rota pag de login de usuários
router.get('/view-login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/login-and-register/view-login.html'));

});

module.exports = router;

// Rota pag de Recuperar Senha

router.get('/view-recover-password', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/recover-password/view-recover-password.html'));

});

module.exports = router;

//Rota pag resetar Senha

router.get('/view-reset-password', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/recover-password/view-reset-password.html'));

});

module.exports = router;

// Rota pora servir estoque

router.get('/view-inventory', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/inventory/view-inventory-management.html'));

});

module.exports = router;

//Rota para servir gestão de Perfis

router.get('/view-profile-management', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/management/view-profile-management.html'));

});
module.exports = router;

//Rota para servir Criar novo perfil

router.get('/view-profile-management/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/management/view-new-profile.html'));

});

module.exports = router;

// Rota para registrar a loja
router.get('/store/view-store-register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/public/store/view-store-register.html'));
  });
  
  // Rota para listar lojas
  router.get('/store/view-store-list', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/public/store/view-store-list.html'));
  });
  
module.exports = router;

// Rotas para Servir Log envio de Talões


router.get('/talon/view-send', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/talon/view-send-talon.html'));

});

// Rotas para Servir Log recebbimento de Talões


router.get('/talon/view-receipt', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/talon/view-receipt-talon.html'));

});

