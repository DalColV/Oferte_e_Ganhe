const express = require('express');
const path = require('path');
const router = express.Router();

// Rota para servir a Dashboard

router.get('/dashboard', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontEnd/public/dashboard/dashboard.html'));


});

module.exports = router;