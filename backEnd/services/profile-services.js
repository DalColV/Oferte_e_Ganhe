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

//Function to edit a profile

async function editProfile(profile_id, profile_name, access_id) {
    const query = `
    UPDATE profile
    SET profile_name = $1, access_id = $2
    WHERE profile_id = $3
    RETURNING*;
    `;
    
    const values =  [profile_name, access_id, profile_id];

    try {
        const resul = await pool.query(query, values);
        return resul.rows[0]; 
    } catch (error) {
        console.error('Something Went Wrong!', error);
        throw error;
    }

}

module.exports = {insertProfile, editProfile};

