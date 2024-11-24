const express = require('express');
const StoreController = require('../../controllers/storeController');
const router = express.Router();
const {authMiddleware} = require("../../middlewares/authMiddleware");


// CRUD Routes

// POST - Route to create a new store
router.post('/store-register', authMiddleware, StoreController.createStore);

// GET - Route to consult all stores
router.get('/stores', authMiddleware, StoreController.consultStores);

// GET - Route to consult a specific store by ID
router.get('/stores/:store_id', authMiddleware, StoreController.consultById);

// PUT - Route to update a store
router.put('/store-edit/:store_id', authMiddleware, StoreController.updateStore);

// DELETE - Route to delete a store
router.delete('/store-delete/:store_id', authMiddleware, StoreController.deleteStore);

module.exports = router;
