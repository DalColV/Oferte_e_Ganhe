const storeService = require('../services/storeServices');

class StoreController {
    
    // POST - Create a new Store
    static async createStore(req, res) {
        const { store_id, store_name, street, cep, number } = req.body;
    
        try {
            const newStore = await storeService.insertStore(store_id, store_name, street, cep, number);
            res.status(201).json({ message: 'Store created successfully!', store: newStore });
        } catch (error) {
            console.error("Error creating store:", error);  
            res.status(500).json({ message: 'Error creating store', error: error.message });
        }
    }
    

    // GET - Consult all stores
    static async consultStores(req, res) {
        try {
            const stores = await storeService.consultStores();
            res.status(200).json(stores);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching stores', error: error.message });
        }
    }

    // GET - Consult a specific store by ID
    static async consultById(req, res) {
        const { store_id } = req.params;

        try {
            const store = await storeService.consultStoreById(store_id);
            if (store) {
                res.status(200).json(store);
            } else {
                res.status(404).json({ message: 'Store not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching store by ID', error: error.message });
        }
    }

    // PUT - Update a store
    static async updateStore(req, res) {
        const { store_id } = req.params;
        const { store_name, street, cep, number } = req.body;

        try {
            const updatedStore = await storeService.editStore(store_id, store_name, street, cep, number);
            if (updatedStore) {
                res.status(200).json({ message: 'Store updated successfully', store: updatedStore });
            } else {
                res.status(404).json({ message: 'Store not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating store', error: error.message });
        }
    }

    // DELETE - Delete a store
    static async deleteStore(req, res) {
        const { store_id } = req.params;

        try {
            const deletedStore = await storeService.deleteStore(store_id);
            if (deletedStore) {
                res.status(200).json({ message: 'Store deleted successfully', store: deletedStore });
            } else {
                res.status(404).json({ message: 'Store not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting store', error: error.message });
        }
    }
}

module.exports = StoreController;
