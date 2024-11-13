const express = require('express');
const TalonController = require('../../controllers/talonController');
const router = express.Router();

// POST - Route to create a new Talon log
router.post('/talon/send-talon', TalonController.createTalon);

// GET - Route to retrieve all Talon logs
router.get('/talon-logs', TalonController.consultAllTalons);

// GET - Route to retrieve a specific Talon log by ID
router.get('/talon-logs/:talon_id', TalonController.consultTalonById);

// PUT - Route to update a Talon log
router.put('/edit-talon/:talon_id', TalonController.updateTalon);

// DELETE - Route to delete a Talon log
router.delete('/delete-talon/:talon_id', TalonController.deleteTalon);

module.exports = router;
