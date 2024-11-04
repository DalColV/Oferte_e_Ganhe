const pool = require('../config/database');


// Function to insert a new user

async function insertUser(matricula, nome_usuario, id_loja, id_perfil, email, senha = 'USUARIO') {
    const query = `
        insert into USUARIO (matricula, nome_usuario, id_loja, id_perfil, email, senha)
        values ($1, $2, $3, $4, $5, $6)
        returning *;
    `;

    const values = [matricula, nome_usuario, id_loja, id_perfil, email, senha];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Retorna o usuário inserido
    } catch (error) {
        console.error('Err! Something Went Wrong!', error);
        throw error;
    }
}

module.exports = { insertUser };