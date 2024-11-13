const express = require('express');
const router = express.Router();
const inventoryController = require('../../controllers/inventoryController');

// POST - Rota para criar inventário
router.post('/inventory', inventoryController.createInventory);

// GET - Rota para consultar todos os inventários
router.get('/inventory', inventoryController.consultInventories);

// GET - Rota para consultar inventário por ID
router.get('/inventory/:inventory_id', inventoryController.consultById);

// PUT - Rota para atualizar um inventário
router.put('/inventory-edit/:inventory_id', inventoryController.updateInventory);

// DELETE - Rota para deletar um inventário
router.delete('/inventory-delete/:inventory_id', inventoryController.removeInventory);

module.exports = router;

