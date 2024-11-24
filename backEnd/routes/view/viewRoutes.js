const express = require('express');
const path = require('path');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');

//Dashboard 
router.get('/dashboard', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/dashboard/dashboard.html'));
});

//User Management 
router.get('/management', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/management/view-user-management.html'));
});

router.get('/view-register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/login-and-register/view-register.html'));
});

router.get('/view-login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/login-and-register/view-login.html'));
});

router.get('/view-recover-password', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/recover-password/view-recover-password.html'));
});

router.get('/view-reset-password', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/recover-password/view-reset-password.html'));
});

//Inventory
router.get('/view-inventory', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/inventory/view-inventory-management.html'));
});

//Profile Management 
router.get('/view-profile-management', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/management/view-profile-management.html'));
});

router.get('/view-profile-management/profile', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/management/view-new-profile.html'));
});

//Store 
router.get('/store/view-store-register', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/store/view-store-register.html'));
});

router.get('/store/view-store-list', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/store/view-store-list.html'));
});

//Talon Management
router.get('/talon/view-send', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/talon/view-send-talon.html'));
});

router.get('/talon/view-receipt', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/talon/view-receipt-talon.html'));
});

module.exports = router;
