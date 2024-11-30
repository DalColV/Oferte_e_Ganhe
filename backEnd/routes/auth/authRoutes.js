const express = require('express');
const signInController = require("../../controllers/authControllers/signInController");
const router = express.Router();

router.post('/login', signInController.signIn);

router.post('/logout', signInController.logout); 


module.exports = router;

