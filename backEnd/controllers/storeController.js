const storeService = require('../services/storeServices');
const { AppError, handleError } = require('../utils/errors');
const { sendSuccess } = require('../utils/responses');
const reportService = require('../services/reportStoreServices');
const fs = require('fs');

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
    static async exportStoreCSV(req, res) {
        try {
            const { store_id } = req.body;
            console.log("Recebido store_id no controlador:", store_id);
    
            if (!store_id) {
                console.error("O campo store_id não foi fornecido.");
                return res.status(400).json({ message: 'O campo store_id é obrigatório.' });
            }
    
            const csvFilePath = await reportService.exportStoresReport(store_id);
            console.log("Relatório gerado com sucesso. Caminho do arquivo:", csvFilePath);
    
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename=loja_${store_id}.csv`);
    
            const fileStream = fs.createReadStream(csvFilePath);
            fileStream.pipe(res); 
        } catch (error) {
            console.error("Erro ao exportar CSV:", error);
            res.status(500).json({ message: 'Error exporting CSV', error: error.message });
        }
    }
    
    
}

module.exports = StoreController;
