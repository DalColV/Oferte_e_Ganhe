const express = require('express');
const TalonController = require('../../controllers/talonController');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { permissionMiddleware} = require('../../middlewares/permissionMiddleware');

// POST - Route to create a new Talon log
router.post('/talon-new', authMiddleware, permissionMiddleware("has_shipping"), TalonController.createTalon);

// GET - Route to consult all Talon logs
router.get('/talon-logs', authMiddleware, permissionMiddleware("has_receiving"), TalonController.consultAllTalons);

// GET - Route to consult a specific Talon log by ID
router.get('/talon-logs/:talon_id', authMiddleware, permissionMiddleware("has_receiving"), TalonController.consultTalonById);

// PUT - Route to update a Talon log
router.put('/talon-edit/:talon_id', authMiddleware, permissionMiddleware(["has_shipping", "has_receiving", "has_maintenece"]), TalonController.updateTalon)

// GET - Route to consult talon by store
router.get('/talon/:store_id', authMiddleware, TalonController.consultTalonByStore);

// GET - Route to consult a specific Talon log by Inventory
router.get('/talon-logs/:inventory_id', authMiddleware, permissionMiddleware("has_receiving"), TalonController.consultTalonById);

// DELETE - Route to delete a Talon log
router.delete('/delete-talon/:talon_id', authMiddleware, permissionMiddleware("has_shipping"), TalonController.deleteTalon);

// GET - Relatorios
router.get('/send-report-csv', TalonController.exportSendCSV);
router.get('/receipt-report-csv', TalonController.exportReceiptCSV);

// PUT - Route to update Talon Qunatity
router.put('/update-current-quantity/:talon_id', TalonController.updateCurrentQuantity);


module.exports = router;
