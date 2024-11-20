const {pool} = require('../config/database');



// Function to insert a new user

const insertUser = async (registration, username, store_id, profile_id, email, password) => {
    const result = await pool.query(
        `INSERT INTO users (registration, username, store_id, profile_id, email, password)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING registration, username, store_id, profile_id, email`,
        [registration, username, store_id, profile_id, email, password]
    );
    return result.rows[0];
};


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
    const checkUserQuery = `
        SELECT * FROM users WHERE registration = $1;
    `;

    const deleteQuery = `
        DELETE FROM users WHERE registration = $1 RETURNING *;
    `;
    
    try {
        const checkResult = await pool.query(checkUserQuery, [registration]);

        if (checkResult.rows.length === 0) {
            return null; 
        }

        const result = await pool.query(deleteQuery, [registration]);

        return result.rows[0]; 
    } catch (error) {
        console.error('Something Went Wrong!', error);
        throw error;
    }
}


// Function to consult all users

async function userConsultAll() {
    const query =`SELECT 
            users.*, 
            profile.profile_name  -- Traz o nome do perfil associado ao usuário
        FROM users
        JOIN profile ON users.profile_id = profile.profile_id;`;
    
    try{ const result = await pool.query(query);
        return result.rows;

    }catch(error){
        console.error('Something Went Wrong', error);
        throw error;
    }
}

// Function to consult User by name

async function userConsultByRegistration(registration) {
    const query =` SELECT 
            users.*, 
            profile.profile_name  -- Traz o nome do perfil do usuário
        FROM users
        JOIN profile ON users.profile_id = profile.profile_id
        WHERE users.registration = $1; `;
    
    try{ const result = await pool.query(query, [registration]);
        return result.rows[0];

    }catch(error){
        console.error('Something Went Wrong', error);
        throw error;
    }
}


module.exports = { insertUser, editUser, deleteUser, userConsultAll, userConsultByRegistration};

