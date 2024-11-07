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

//Function to edit an user

async function editUser(registration, username, store_id, profile_id, email, password) {
    const query = `
        UPDATE users 
        SET username = $1,
            store_id = $2,
            profile_id = $3,
            email = $4,
            password = $5
        WHERE registration = $6
        RETURNING *;
    `;
    const valores = [username, store_id, profile_id, email, password, registration];

    try { 
        const result = await pool.query(query, valores);
        
        console.log("Result from database:", result.rows[0]); // Log para verificar o retorno do banco de dados

        return result.rows[0];
    } catch (error) { 
        console.error('Something Went Wrong When Editing User!', error);
        throw error;
    }
}

//Function to Delete an User

async function deleteUser(registration) {
    const query = `
        DELETE FROM users
        WHERE registration = $1
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [registration]);
        return result.rows[0]; 
    } catch (error) {
        console.error('Something Wetn Wrong!', error);
        throw error;
    }
}

module.exports = { insertUser, editUser, deleteUser};

