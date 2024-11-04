const pool = require('../config/database');

// Function to create a new talon to be send

async function createNewTalon(id_talao, remessa, id_estoque, qtde_taloes, status_talao = 'TALAO'){
    const query = ` insert into TALAO (id_talao, remessa, id_estoque, qtde_taloes, status_talao)
    values ($1, $2, $3, $4, $5)
    returning *;`

    const values = [id_talao, remessa, id_estoque, qtde_taloes, status_talao];

    try{ const result = await pool.query(query, values);
        return result.rows[0];
    }catch (error){
        console.error('Err! Something Went Wrong!', error);
        throw error;
    }


}


// Function to send a talon

async function sendTalon(id_envio_talao, id_talao, id_loja, qtde_enviada, data_envio, data_evento = 'ENVIO'){
    const query = ` insert into ENVIO (id_envio_talao, id_talao, id_loja, qtde_enviada, data_envio, data_evento)
    values ($1, $2, $3, $4, $5, $6)
    returning *;`

    const values = [id_envio_talao, id_talao, id_loja, qtde_enviada, data_envio, data_evento];

    try{ const result = await pool.query(query, values);
        return result.rows[0];
    }catch (error){
        console.error('Err! Something Went Wrong!', error);
        throw error;
    }

}

async function receiptTalon(id_recebimento_talao, id_talao, id_loja, qtde_recebida, data_recebimento = 'RECEBIMENTO'){
    const query = ` insert into RECEBIMENTO (id_recebimento_talao, id_talao, id_loja, qtde_recebida, data_recebimento)
    values ($1, $2, $3, $4, $5)
    returning *;`

    const values = [id_recebimento_talao, id_talao, id_loja, qtde_recebida, data_recebimento];

    try{ const result = await pool.query(query, values);
        return result.rows[0];
    }catch (error){
        console.error('Err! Something Went Wrong!', error);
        throw error;
    }

}

module.exports = {createNewTalon, sendTalon, receiptTalon};