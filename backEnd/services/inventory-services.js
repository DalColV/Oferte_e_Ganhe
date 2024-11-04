const pool = require('../config/database');

async function setInventory(id_estoque, id_loja, qtde_minima_taloes, qtde_recomendada_taloes, qtde_atual_taloes){
    const query = `insert into ESTOQUE (id_estoque, id_loja, qtde_minima_taloes, qtde_recomendada_taloes, qtde_atual_taloes)
    values ($1, $2, $3, $4, $5)
    returning *;`

    const values = [id_estoque, id_loja, qtde_minima_taloes, qtde_recomendada_taloes, qtde_atual_taloes];

    try { const result = await pool.query(query, values);
        return result.rows[0];

    }catch (error){
        console.error('Err! Something Went Wrong', error);
        throw error;
    }
}

module.exports = {setInventory};
