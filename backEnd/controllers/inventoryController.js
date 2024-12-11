const inventoryService = require('../services/inventoryServices');
const { AppError, handleError } = require('../utils/errors');
const { sendSuccess } = require('../utils/responses');
const reportService = require('../services/reportInventoryServices');


class InventoryController {
    // Função para criar um inventário
    static async createInventory(req, res) {
        const { inventory_id, store_id, min_quantity, recommended_quantity, current_quantity } = req.body;
        try {
            if (!inventory_id || !store_id || !min_quantity || !recommended_quantity || !current_quantity) {
                throw new AppError("All fields are required", 400);
            }

            const newInventory = await inventoryService.setInventory(inventory_id, store_id, min_quantity, recommended_quantity, current_quantity);
            sendSuccess(res, 201, "Inventory created successfully!", newInventory);
        } catch (error) {
            handleError(res, error);
        }
    }

    static async consultInventories(req, res) {
        try {
            const inventories = await inventoryService.consultInventoryAll();
            sendSuccess(res, 200, "Inventories fetched successfully", inventories);
        } catch (error) {
            handleError(res, error);
        }
    }

    static async consultById(req, res) {
        const { inventory_id } = req.params;
        try {
            const inventory = await inventoryService.consultInventoryById(inventory_id);
            if (inventory) {
                sendSuccess(res, 200, "Inventory record found", inventory);
            } else {
                throw new AppError("Inventory record not found", 404);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    static async getInventoryByStore(req, res) {
        const { store_id } = req.params;
    
        try {
            const inventoryData = await consultInventoryByStore(store_id);
    
            return res.status(200).json({ data: inventoryData });
        } catch (error) {
            if (error.message === 'Inventário não encontrado para esta loja.') {
                return res.status(404).json({ error: error.message });
            }
    
            console.error('Erro no controller:', error);
            return res.status(500).json({ error: 'Erro ao buscar inventário.' });
        }
    }
    

    // Função para atualizar um inventário
    static async updateInventory(req, res) {
        const { inventory_id } = req.params;
        const { store_id, min_quantity, recommended_quantity, current_quantity } = req.body;
        try {
            // Validação de parâmetros
            if (!store_id || !min_quantity || !recommended_quantity || !current_quantity) {
                throw new AppError("All fields are required to update inventory", 400);
            }

            const updatedInventory = await inventoryService.editInventory(inventory_id, store_id, min_quantity, recommended_quantity, current_quantity);
            if (updatedInventory) {
                sendSuccess(res, 200, "Inventory updated successfully", updatedInventory);
            } else {
                throw new AppError("Inventory not found", 404);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    // Função para remover um inventário
    static async removeInventory(req, res) {
        const { inventory_id } = req.params;
        try {
            const removedInventory = await inventoryService.deleteInventory(inventory_id);
            if (removedInventory) {
                sendSuccess(res, 200, "Inventory deleted successfully", removedInventory);
            } else {
                throw new AppError("Inventory not found", 404);
            }
        } catch (error) {
            handleError(res, error);
        }
    }


    // Função para remover um inventário
    static async removeInventoryByStore(req, res) {
        const { store_id } = req.params;
        try {
            const removedInventory = await inventoryService.deleteInventory(store_id);
            if (removedInventory) {
                sendSuccess(res, 200, "Inventory deleted successfully", removedInventory);
            } else {
                throw new AppError("Inventory not found", 404);
            }
        } catch (error) {
            handleError(res, error);
        }
    }
    static async exportInventoryCSV(req, res){
        try{
            const csvFilePath = await reportService.exportInventoryReport();
            res.download(csvFilePath, 'inventory.csv');
        }catch(error){
            console.error("Erro ao exportar CSV:", error);
            res.status(500).json({ message: 'Error exporting CSV', error: error.message });
        }
    }
}



module.exports = InventoryController;
