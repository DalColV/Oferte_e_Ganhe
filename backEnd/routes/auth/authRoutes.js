const express = require('express');
const signInController = require("../../controllers/authControllers/signInController");
const router = express.Router();

router.post('/signin', signInController.signIn);

module.exports = router;

