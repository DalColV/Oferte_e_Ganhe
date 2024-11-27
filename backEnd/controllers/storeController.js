const storeService = require('../services/storeServices');
const { AppError, handleError } = require('../utils/errors');
const { sendSuccess } = require('../utils/responses');

class StoreController {
    static async createStore(req, res) {
        const { store_id, store_name, street, cep, number, is_matriz } = req.body;
        try {
            const newStore = await storeService.insertStore(store_id, store_name, street, cep, number, is_matriz);
            sendSuccess(res, 201, "Store created successfully!", newStore);
        } catch (error) {
            handleError(res, error);
        }
    }

    static async consultStores(req, res) {
        try {
            const stores = await storeService.consultStores();
            sendSuccess(res, 200, "Stores fetched successfully", stores);
        } catch (error) {
            handleError(res, error);
        }
    }

    static async consultById(req, res) {
        const { store_id } = req.params;
        try {
            const store = await storeService.consultStoreById(store_id);
            if (store) {
                sendSuccess(res, 200, "Store found", store);
            } else {
                throw new AppError("Store not found", 404);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    static async updateStore(req, res) {
        const { store_id } = req.params;
        const { store_name, street, cep, number, is_matriz } = req.body;
        try {
            const updatedStore = await storeService.editStore(store_id, store_name, street, cep, number, is_matriz);
            if (updatedStore) {
                sendSuccess(res, 200, "Store updated successfully", updatedStore);
            } else {
                throw new AppError("Store not found", 404);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    static async deleteStore(req, res) {
        const { store_id } = req.params;
        try {
            const deletedStore = await storeService.deleteStore(store_id);
            if (deletedStore) {
                sendSuccess(res, 200, "Store deleted successfully", deletedStore);
            } else {
                throw new AppError("Store not found", 404);
            }
        } catch (error) {
            handleError(res, error);
        }
    }
}

module.exports = StoreController;
