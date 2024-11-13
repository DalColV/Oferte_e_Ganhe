const inventoryService = require('../services/inventoryServices');



class inventoryController {
    
    // POST - Criar um novo inventário

    static async createInventory(req, res) {
        const { inventory_id, store_id, min_quantity, recommended_quantity, current_quantity } = req.body;

        try { const newInventory = await inventoryService.setInventory(inventory_id, store_id, min_quantity, recommended_quantity, current_quantity);
            res.status(201).json({ message: 'Inventory created successfully!', inventory: newInventory });
        } catch (error) {
            res.status(500).json({ message: 'Error creating inventory', error: error.message });
        }
    }

    // GET - Consultar todos os inventários

    static async consultInventories(req, res) {
        try {
            const inventories = await inventoryService.consultInventoryAll();
            res.status(200).json(inventories);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching inventory records', error: error.message });
        }
    }

    // GET - Consultar um inventário específico pelo ID

    static async consultById(req, res) {
        const { inventory_id } = req.params;

        try {
            const inventory = await inventoryService.consultInventoryById(inventory_id);
            if (inventory) {
                res.status(200).json(inventory);
            } else {
                res.status(404).json({ message: 'Inventory record not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching inventory by ID', error: error.message });
        }
    }

    // PUT - Atualizar um inventário
    static async updateInventory(req, res) {
        const { inventory_id } = req.params;
        const { store_id, min_quantity, recommended_quantity, current_quantity } = req.body;

        try {
            const updatedInventory = await inventoryService.editInventory(inventory_id, store_id, min_quantity, recommended_quantity, current_quantity);
            if (updatedInventory) {
                res.status(200).json({ message: 'Inventory updated successfully', inventory: updatedInventory });
            } else {
                res.status(404).json({ message: 'Inventory not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating inventory', error: error.message });
        }
    }

    // DELETE - Deletar um inventário
    static async removeInventory(req, res) {
        const { inventory_id } = req.params;

        try {
            const removedInventory = await inventoryService.deleteInventory(inventory_id);
            if (removedInventory) {
                res.status(200).json({ message: 'Inventory deleted successfully', inventory: removedInventory });
            } else {
                res.status(404).json({ message: 'Inventory not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting inventory', error: error.message });
        }
    }
}

module.exports = inventoryController;
