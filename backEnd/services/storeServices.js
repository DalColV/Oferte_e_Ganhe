const pool = require('../config/database');

// Function to Create a new Store
async function insertStore(store_id, store_name, street, cep, number) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const storeQuery = `
            INSERT INTO STORE (store_id, store_name, street, cep, number)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING store_id, store_name, street, cep, number;
        `;
        const storeValues = [store_id, store_name, street, cep, number];
        const storeResult = await client.query(storeQuery, storeValues);

        await client.query('COMMIT');
        return storeResult.rows[0];

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Something Went Wrong', error);
        throw error;
    } finally {
        client.release();
    }
}

// Function to Consult All Stores
async function consultStores() {
    const query = `
        SELECT * FROM store;
    `;

    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (err) {
        console.error('Something Went Wrong.', err);
    }
}

// Function to Consult a specific Store by ID
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

// Function to Edit a Store
async function editStore(store_id, store_name, street, cep, number) {
    const query = `
        UPDATE store
        SET store_name = $1, street = $2, cep = $3, number = $4
        WHERE store_id = $5
        RETURNING store_id, store_name, street, cep, number;
    `;
    
    const values = [store_name, street, cep, number, store_id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Something Went Wrong!', error);
        throw error;
    }
}

// Function to Delete a Store
async function deleteStore(store_id) {
    const query = `
        DELETE FROM store
        WHERE store_id = $1
        RETURNING store_id, store_name, street, cep, number;
    `;
    
    const values = [store_id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Something Went Wrong!', error);
        throw error;
    }
}

module.exports = {insertStore, editStore, deleteStore, consultStoreById, consultStores};
