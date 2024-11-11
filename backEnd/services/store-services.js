const pool = require('../config/database');

// Function to Create a new Store

async function insertStore(store_id, store_name = 'store'){
    const query = `insert into store (store_id, store_name)
    values ($1, $2)
    returning *; `


const values = [store_id, store_name];

    try { const result = await pool.query(query, values);
        return result.rows[0];
    }catch (error){
        console.error('Something Went Wrong', error);
        throw error;

    }
}

// Function to Consult All Stores

async function consultStores() {
    const query =`
        SELECT * FROM store;
    `;

    try{
        const result = await pool.query(query);
        return result.rows;
    }catch(err){
        console.error('Something Went Wrong.', err);
    }
}

// Function to Consult a specific Store

async function consultStoreById(store_id) {
    const query = `
         SELECT * from store WHERE store_id = $1;
    `;

    const values = [store_id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Something Went Wrong.', err);
        throw err;
    }
}

//Function to Edit a Store

async function editStore(store_id, store_name) {
    const query =  `
    UPDATE store
    SET store_name = $1
    WHERE store_id= $2
    RETURNING*;
    `;
    
    const values = [store_name, store_id];

    try{ const result = await pool.query(query, values);
        return result.rows[0];
    }catch(error){
        console.error('Something Went Wrong!', error);
        throw error;
    }
}

// Funciton to Delete a Store

async function deleteStore(store_id) {
    const query =  `
    DELETE FROM store
    WHERE store_id = $1
    RETURNING*;
    `;
    
    const values = [store_id];

    try{ const result = await pool.query(query, values);
        return result.rows[0];
    }catch(error){
        console.error('Something Went Wrong!', error);
        throw error;
    }
}

module.exports = {insertStore, editStore, deleteStore, consultStoreById, consultStores};
