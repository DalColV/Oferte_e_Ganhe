const pool = require('../config/database');

// Function to create a new profile 

async function insertProfile(profile_id, profile_name, access_id){
    const query = `insert into profile (profile_id, profile_name, access_id)
    values ($1, $2, $3)
    returning *;`

    const values = [profile_id, profile_name, access_id];

    try { const result = await pool.query(query, values);
        return result.rows[0];

    }catch (error){
        console.error('Err! Something Went Wrong', error);
        throw error;
    }
}

//Function to consult all profiles

async function consultProfileAll() {
    const query =`
        SELECT * from profile`;

    try{
        const result = await pool.query(query);
        return result.rows;
    }catch(error){
        console.error('Something Wetn Wrong!', error);
    }
}

// Function to Consult a profile by ID

async function consultProfileById(profile_id) {
    const query = `SELECT * FROM profile WHERE profile_id = $1;`;

    try {
        const result = await pool.query(query, [profile_id]);
        return result.rows[0]; 
    } catch (error) {
        console.error('Something went wrong while fetching profile by id:', error);
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

// Function to Delete a Profile

async function deleteProfile(profile_id) {
    const query = `
    DELETE FROM profile
    WHERE profile_id = $1
    RETURNING*;
    `;

    try {
        const resul = await pool.query(query, [profile_id]);
        return resul.rows[0]; 
    } catch (error) {
        console.error('Something Went Wrong!', error);
        throw error;
    }

    
}

module.exports = {insertProfile, editProfile, deleteProfile, consultProfileAll, consultProfileById};

