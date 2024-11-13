const pool = require('../config/database');

// Function to Create a new Store

async function insertStore(store_id, store_name, street, cep, number) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Insert the address into the Address table
        const addressQuery = `
            INSERT INTO Address (street, cep, number)
            VALUES ($1, $2, $3)
            RETURNING address_id;
        `;
        const addressValues = [street, cep, number];
        const addressResult = await client.query(addressQuery, addressValues);
        const address_id = addressResult.rows[0].address_id;

        // Insert the store into the STORE table 
        const storeQuery = `
            INSERT INTO STORE (store_id, store_name, address_id)
            VALUES ($1, $2, $3)
            RETURNING store_id, store_name, address_id;
        `;
        const storeValues = [store_id, store_name, address_id];
        const storeResult = await client.query(storeQuery, storeValues);

        // If successful, commit the transaction
        await client.query('COMMIT');
        return storeResult.rows[0];

    } catch (error) {
        // If there's an error, rollback the transaction
        await client.query('ROLLBACK');
        console.error('Something Went Wrong', error);
        throw error;
    } finally {
        client.release();
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

async function editStore(store_id, store_name, address_id) {
    const query =  `
    UPDATE store
    SET store_name = $1, address_id = $2
    WHERE store_id= $3
    RETURNING*;
    `;
    
    const values = [store_name, address_id, store_id ];

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
