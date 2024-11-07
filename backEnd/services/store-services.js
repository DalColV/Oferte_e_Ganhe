const pool = require('../config/database');

// Função para inserir uma nova loja

async function insertStore(id_loja, nome_loja = 'LOJA'){
    const query = `insert into LOJA (id_loja, nome_loja)
    values ($1, $2)
    returning *; `


const values = [id_loja, nome_loja];

    try { const result = await pool.query(query, values);
        return result.rows[0];
    }catch (error){
        console.error('Something Went Wrong', error);
        throw error;

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

module.exports = {insertStore, editStore};
