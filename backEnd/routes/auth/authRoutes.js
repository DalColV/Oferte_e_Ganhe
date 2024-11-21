const express = require('express');
const signInController = require("../../controllers/authControllers/signInController");
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware')

router.post('/signin', signInController.signIn);

router.post("/logout", authMiddleware, signInController.logout); 


module.exports = router;

