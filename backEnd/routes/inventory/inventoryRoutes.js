const express = require('express');
const router = express.Router();
const InventoryController = require('../../controllers/inventoryController');
const {authMiddleware} = require("../../middlewares/authMiddleware");


//CRUD 

// POST - Rota para criar inventário
router.post('/inventory', authMiddleware, InventoryController.createInventory);

// GET - Rota para consultar todos os inventários
router.get('/inventory', authMiddleware, InventoryController.consultInventories);

// GET - Rota para consultar inventário por ID
router.get('/inventory/:inventory_id', authMiddleware, InventoryController.consultById);

// PUT - Rota para atualizar um inventário
router.put('/inventory-edit/:inventory_id', authMiddleware, InventoryController.updateInventory);

// DELETE - Rota para deletar um inventário
router.delete('/inventory-delete/:inventory_id', authMiddleware, InventoryController.removeInventory);

module.exports = router;

