const express = require('express');
const StoreController = require('../../controllers/storeController');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { permissionMiddleware} = require('../../middlewares/permissionMiddleware');

// CRUD Routes

// POST - Route to create a new store
router.post('/store-register', authMiddleware, permissionMiddleware("has_store_management"), StoreController.createStore);

// GET - Route to consult all stores
router.get('/stores', StoreController.consultStores);

// GET - Route to consult a specific store by ID
router.get('/stores/:store_id', authMiddleware, permissionMiddleware("has_store_management"), StoreController.consultById);

// PUT - Route to update a store
router.put('/store-edit/:store_id', authMiddleware, permissionMiddleware("has_store_management"), StoreController.updateStore);

// DELETE - Route to delete a store
router.delete('/store-delete/:store_id', authMiddleware, permissionMiddleware("has_store_management"), StoreController.deleteStore);

module.exports = router;
