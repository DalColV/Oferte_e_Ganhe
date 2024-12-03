const  Inventory = require('../models/inventoryModel');

// Função para adicionar um inventário
async function setInventory(inventory_id, store_id, min_quantity, recommended_quantity, current_quantity) {
    try {
        const newInventory = await Inventory.create({
            inventory_id,
            store_id,
            min_quantity,
            recommended_quantity,
            current_quantity
        });
        return newInventory;
    } catch (error) {
        console.error('Error inserting inventory:', error);
        throw error;
    }
}

// Função para consultar todos os inventários
async function consultInventoryAll() {
    try {
        const inventories = await Inventory.findAll();
        return inventories;
    } catch (error) {
        console.error('Error fetching inventories:', error);
        throw error;
    }
}

// Função para consultar inventário por ID
async function consultInventoryById(inventory_id) {
    try {
        const inventory = await Inventory.findOne({ where: { inventory_id } });
        return inventory;
    } catch (error) {
        console.error('Error fetching inventory by ID:', error);
        throw error;
    }
}

// Função para consultar inventário Store
async function consultInventoryByStore(store_id) {
    try {
        const inventory = await Inventory.findOne({ where: { store_id } });
        return inventory;
    } catch (error) {
        console.error('Error fetching inventory by ID:', error);
        throw error;
    }
}

// Função para editar um inventário
async function editInventory(inventory_id, store_id, min_quantity, recommended_quantity, current_quantity) {
    try {
        const inventory = await Inventory.findByPk(inventory_id);
        if (inventory) {
            inventory.store_id = store_id;
            inventory.min_quantity = min_quantity;
            inventory.recommended_quantity = recommended_quantity;
            inventory.current_quantity = current_quantity;

            await inventory.save();
            return inventory;
        }
        throw new Error('Inventory not found');
    } catch (error) {
        console.error('Error updating inventory:', error);
        throw error;
    }
}

// Função para deletar um inventário
async function deleteInventory(inventory_id) {
    try {
        const inventory = await Inventory.findByPk(inventory_id);
        if (inventory) {
            await inventory.destroy();
            return inventory;
        }
        throw new Error('Inventory not found');
    } catch (error) {
        console.error('Error deleting inventory:', error);
        throw error;
    }
}
// Função para deletar um inventário pela loja

async function deleteInventoryByStore(store_id) {
    try {
        const inventory = await Inventory.findByPk(store_id);
        if (inventory) {
            await inventory.destroy();
            return inventory;
        }
        throw new Error('Inventory not found');
    } catch (error) {
        console.error('Error deleting inventory:', error);
        throw error;
    }
}

module.exports = {deleteInventoryByStore, consultInventoryByStore, setInventory, consultInventoryAll, consultInventoryById, editInventory, deleteInventory };
