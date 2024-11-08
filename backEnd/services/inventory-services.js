const pool = require('../config/database');

//Function to post inventory

async function setInventory(inventory_id, store_id, min_quantity, recommended_quantity, current_quantity){
    const query = `insert into inventory (inventory_id, store_id, min_quantity, recommended_quantity, current_quantity)
    values ($1, $2, $3, $4, $5)
    returning *;`

    const values = [inventory_id, store_id, min_quantity, recommended_quantity, current_quantity];

    try { const result = await pool.query(query, values);
        return result.rows[0];

    }catch (error){
        console.error('Err! Something Went Wrong', error);
        throw error;
    }
}

//Function to Edit Inventory

async function editInventory(inventory_id, store_id, min_quantity, recommended_quantity, current_quantity) {
    const query = `
    UPDATE inventory
    SET store_id = $1, min_quantity = $2, recommended_quantity = $3, current_quantity = $4
    WHERE inventory_id = $5
    RETURNING*; 
    `;
    const values = [store_id, min_quantity, recommended_quantity, current_quantity,inventory_id];
    
        try {const result = await pool.query(query, values);
            return result.rows[0]; 
        } catch (erro) {
            console.error('Somenthing Went Wrong!', erro);
            throw erro;
        }
}

//Function to Delete an Inventory

async function deleteInventory(inventory_id) {
    const query = `
    DELETE FROM inventory
    WHERE inventory_id = $1
    RETURNING*;
    `;

    try {
        const resul = await pool.query(query, [inventory_id]);
        return resul.rows[0]; 
    } catch (error) {
        console.error('Something Went Wrong!', error);
        throw error;
    }
    
}

module.exports = {setInventory, editInventory, deleteInventory};
