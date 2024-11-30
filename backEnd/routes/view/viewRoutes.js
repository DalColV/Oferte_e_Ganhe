const express = require('express');
const path = require('path');
const router = express.Router();
const { permissionMiddleware} = require('../../middlewares/permissionMiddleware');
const {authMiddleware} = require("../../middlewares/authMiddleware");


//Login e Register
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/login-and-register/view-register.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/login-and-register/view-login.html'));
});

//Password
router.get('/recover-password', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/recover-password/view-recover-password.html'));
});

router.get('/view-reset-password', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/recover-password/view-reset-password.html'));
});

//Dashboard 
router.get('/dashboard', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/dashboard/dashboard.html'));
});

//User Management 
router.get('/user-management', authMiddleware, permissionMiddleware("has_user_management"), (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/management/view-user-management.html'));
});


//Inventory
router.get('/inventory-management',authMiddleware,  permissionMiddleware("has_inventory_management"), (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/inventory/view-inventory-management.html'));
});

//Profile Management 
router.get('/profile-management', authMiddleware, permissionMiddleware("has_profile_management"), (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/management/view-profile-management.html'));
});

router.get('/view-profile-management/profile', authMiddleware, permissionMiddleware("has_profile_management"), (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/management/view-new-profile.html'));
});

//Store 
router.get('/store-register', authMiddleware, permissionMiddleware("has_store_management"), (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/store/view-store-register.html'));
});

router.get('/store-management', authMiddleware, permissionMiddleware("has_store_management"), (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/store/view-store-list.html'));
});

//Talon Management
router.get('/talon/send',authMiddleware, permissionMiddleware("has_shipping"), (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/talon/view-send-talon.html'));
});

router.get('/talon/receipt', authMiddleware, permissionMiddleware("has_receiving"), (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/talon/view-receipt-talon.html'));
});

router.get('/talon/maintenance', authMiddleware, permissionMiddleware("has_maintenence"), (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/talon/view-maintenance-talon.html'));
});

module.exports = router;
