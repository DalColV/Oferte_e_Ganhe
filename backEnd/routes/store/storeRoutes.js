const express = require('express');
const StoreController = require('../../controllers/storeController');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');


// CRUD Routes

// POST - Route to create a new store
router.post('/store-register', StoreController.createStore);

// GET - Route to consult all stores
router.get('/stores', StoreController.consultStores);

// GET - Route to consult a specific store by ID
router.get('/stores/:store_id', StoreController.consultById);

// PUT - Route to update a store
router.put('/store-edit/:store_id', StoreController.updateStore);

// DELETE - Route to delete a store
router.delete('/store-delete/:store_id', StoreController.deleteStore);

module.exports = router;
