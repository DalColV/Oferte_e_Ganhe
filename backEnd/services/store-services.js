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


module.exports = {insertStore};
