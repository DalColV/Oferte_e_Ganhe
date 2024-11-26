const pool = require('../config/database'); // Conexão com o banco de dados

// Consultar todos os usuários
const userConsultAll = async () => {
    const query = `SELECT * FROM users;`;
    const result = await pool.query(query);
    return result.rows;
};

// Consultar um usuário pelo registro
const userConsultByRegistration = async (registration) => {
    const query = `SELECT * FROM users WHERE registration = $1;`;
    const values = [registration];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Inserir um novo usuário
const insertUser = async (registration, username, store_id, profile_id, email, password) => {
    const query = `
        INSERT INTO users (registration, username, store_id, profile_id, email, password)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const values = [registration, username, store_id, profile_id, email, password];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Editar um usuário
const editUser = async (registration, username, store_id, profile_id, email, password) => {
    const query = `
        UPDATE users
        SET 
            username = COALESCE($1, username),
            store_id = COALESCE($2, store_id),
            profile_id = COALESCE($3, profile_id),
            email = COALESCE($4, email),
            password = COALESCE($5, password)
        WHERE registration = $6
        RETURNING *;
    `;
    const values = [username, store_id, profile_id, email, password, registration];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Deletar um usuário pelo registro
const deleteUser = async (registration) => {
    const query = `DELETE FROM users WHERE registration = $1 RETURNING *;`;
    const values = [registration];
    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = {
    userConsultAll,
    userConsultByRegistration,
    insertUser,
    editUser,
    deleteUser,
};
