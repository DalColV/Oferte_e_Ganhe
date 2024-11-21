const express = require('express');
const TalonController = require('../../controllers/talonController');
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");


// POST - Route to create a new Talon log
router.post('/talon/send-talon', authMiddleware, TalonController.createTalon);

// GET - Route to consult all Talon logs
router.get('/talon-logs', authMiddleware, TalonController.consultAllTalons);

// GET - Route to consult a specific Talon log by ID
router.get('/talon-logs/:talon_id', authMiddleware, TalonController.consultTalonById);

// PUT - Route to update a Talon log
router.put('/edit-talon/:talon_id', authMiddleware, TalonController.updateTalon);

// DELETE - Route to delete a Talon log
router.delete('/delete-talon/:talon_id', authMiddleware, TalonController.deleteTalon);

module.exports = router;
