const pool = require('../config/database');

// Function to create a new profile 

async function insertProfile(id_perfil, nome_perfil, id_acesso){
    const query = `insert into PERFIS (id_perfil, nome_perfil, id_acesso)
    values ($1, $2, $3)
    returning *;`

    const values = [id_perfil, nome_perfil, id_acesso];

    try { const result = await pool.query(query, values);
        return result.rows[0];

    }catch (error){
        console.error('Err! Something Went Wrong', error);
        throw error;
    }
}

module.exports = {insertProfile};

