const express = require('express');
const path = require('path');
const router = express.Router();

//Rotas para servir a gestão de usuários
router.get('/management', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/management/view-user-management.html'));

});

module.exports = router;