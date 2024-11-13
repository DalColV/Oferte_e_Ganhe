const pool = require('../config/database');

// Função para adicionar um inventário
async function setInventory(inventory_id, store_id, min_quantity, recommended_quantity, current_quantity) {
    const query = `INSERT INTO inventory (inventory_id, store_id, min_quantity, recommended_quantity, current_quantity)
                   VALUES ($1, $2, $3, $4, $5)
                   RETURNING *;`;
    const values = [inventory_id, store_id, min_quantity, recommended_quantity, current_quantity];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error inserting inventory:', error);
        throw error;
    }
}

// Função para consultar todos os inventários
async function consultInventoryAll() {
    const query = `SELECT * FROM inventory;`;

    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching inventories:', error);
        throw error;
    }
}

// Função para consultar inventário por ID
async function consultInventoryById(inventory_id) {
    const query = `SELECT * FROM inventory WHERE inventory_id = $1;`;

    try {
        const result = await pool.query(query, [inventory_id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching inventory by ID:', error);
        throw error;
    }
}

// Função para editar um inventário
async function editInventory(inventory_id, store_id, min_quantity, recommended_quantity, current_quantity) {
    const query = `UPDATE inventory
                   SET store_id = $1, min_quantity = $2, recommended_quantity = $3, current_quantity = $4
                   WHERE inventory_id = $5
                   RETURNING *;`;
    const values = [store_id, min_quantity, recommended_quantity, current_quantity, inventory_id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating inventory:', error);
        throw error;
    }
}

// Função para deletar um inventário
async function deleteInventory(inventory_id) {
    const query = `DELETE FROM inventory WHERE inventory_id = $1 RETURNING *;`;

    try {
        const result = await pool.query(query, [inventory_id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting inventory:', error);
        throw error;
    }
}

module.exports = { setInventory, consultInventoryAll, consultInventoryById, editInventory, deleteInventory };
