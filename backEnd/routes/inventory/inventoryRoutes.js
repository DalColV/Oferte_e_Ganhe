const express = require('express');
const router = express.Router();
const InventoryController = require('../../controllers/inventoryController');
const {authMiddleware} = require("../../middlewares/authMiddleware");
const { permissionMiddleware} = require('../../middlewares/permissionMiddleware');


//CRUD 

// POST - Rota para criar inventário
router.post('/inventory', authMiddleware, permissionMiddleware("has_inventory_management"), InventoryController.createInventory);

// GET - Rota para consultar todos os inventários
router.get('/inventory', authMiddleware, permissionMiddleware("has_inventory_management"), InventoryController.consultInventories);

// GET - Rota para consultar inventário por ID
router.get('/inventory/:inventory_id', authMiddleware, permissionMiddleware("has_inventory_management"), InventoryController.consultById);

// GET - Rota para consultar inventário por Store
router.get('/inventory/:store_id', authMiddleware, permissionMiddleware("has_inventory_management"), InventoryController.consultById);

// PUT - Rota para atualizar um inventário
router.put('/inventory-edit/:inventory_id', authMiddleware, permissionMiddleware("has_inventory_management"), InventoryController.updateInventory);

// DELETE - Rota para deletar um inventário
router.delete('/inventory-delete/:inventory_id', authMiddleware, permissionMiddleware("has_inventory_management"), InventoryController.removeInventory);

// DELETE - Rota para deletar um inventário pela Loja
router.delete('/inventory-delete/:stpre_id', authMiddleware, permissionMiddleware("has_inventory_management"), InventoryController.removeInventory);

module.exports = router;

