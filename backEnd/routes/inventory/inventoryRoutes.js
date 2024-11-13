const express = require('express');
const router = express.Router();
const InventoryController = require('../../controllers/inventoryController');

//CRUD 

// POST - Rota para criar inventário
router.post('/inventory', InventoryController.createInventory);

// GET - Rota para consultar todos os inventários
router.get('/inventory', InventoryController.consultInventories);

// GET - Rota para consultar inventário por ID
router.get('/inventory/:inventory_id', InventoryController.consultById);

// PUT - Rota para atualizar um inventário
router.put('/inventory-edit/:inventory_id', InventoryController.updateInventory);

// DELETE - Rota para deletar um inventário
router.delete('/inventory-delete/:inventory_id', InventoryController.removeInventory);

module.exports = router;

