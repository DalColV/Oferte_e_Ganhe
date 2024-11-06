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

//Function to edit a user

async function editUser(matricula, nome_usuario, id_loja, id_perfil, email, senha){
    const query = 
    `UPDATE usuario 
    SET nome_usuario = $1,
    id_loja = $2,
    id_perfil = $3,
    email = $4,
    senha = $5
    WHERE matricula = $6
    RETURNING *;
    `;
    const valores = [nome_usuario, id_loja, id_perfil, email, senha, matricula];

        try{ const result = await pool.query(query, valores)
            return result.rows[0];
        }catch (error){ console.error('Somenthing Went Wrong When Editing User!', error);
            throw error;
        }

} 
    
module.exports = { editUser };
