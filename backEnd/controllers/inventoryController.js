const inventoryService = require('../services/inventoryServices');
const { AppError, handleError } = require('../utils/errors');
const { sendSuccess } = require('../utils/responses');

class InventoryController {
    static async createInventory(req, res) {
        const { inventory_id, store_id, min_quantity, recommended_quantity, current_quantity } = req.body;
        try {
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

    static async updateInventory(req, res) {
        const { inventory_id } = req.params;
        const { store_id, min_quantity, recommended_quantity, current_quantity } = req.body;
        try {
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
}

module.exports = InventoryController;
