const express = require('express');
const TalonController = require('../../controllers/talonController');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { permissionMiddleware} = require('../../middlewares/permissionMiddleware');

// POST - Route to create a new Talon log
router.post('/talon/send-talon', authMiddleware, permissionMiddleware("has_shipping"), TalonController.createTalon);

// GET - Route to consult all Talon logs
router.get('/talon-logs', authMiddleware, permissionMiddleware("has_receiving"), TalonController.consultAllTalons);

// GET - Route to consult a specific Talon log by ID
router.get('/talon-logs/:talon_id', authMiddleware, permissionMiddleware("has_receiving"), TalonController.consultTalonById);

// PUT - Route to update a Talon log
router.put('/edit-talon/:talon_id', authMiddleware, permissionMiddleware(["has_receiving", "has_shipping"]), TalonController.updateTalon);

// DELETE - Route to delete a Talon log
router.delete('/delete-talon/:talon_id', authMiddleware, permissionMiddleware("has_shipping"), TalonController.deleteTalon);

module.exports = router;
