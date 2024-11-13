const pool = require('../config/database');

// Function to create a new profile

async function insertProfile(
    profile_name,
    has_profile_management = false,
    has_user_management = false,
    has_inventory_management = false,
    has_maintenance = false,
    has_store_management = false,
    has_shipping = false,
    has_receiving = false
) {
    const query = `
        INSERT INTO profile (
            profile_name, 
            has_profile_management, 
            has_user_management, 
            has_inventory_management, 
            has_maintenance, 
            has_store_management, 
            has_shipping, 
            has_receiving
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;

    const values = [
        profile_name,
        has_profile_management,
        has_user_management,
        has_inventory_management,
        has_maintenance,
        has_store_management,
        has_shipping,
        has_receiving
    ];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error! Something Went Wrong', error);
        throw error;
    }
}


// Function to consult all profiles

async function consultProfileAll() {
    const query = `SELECT * FROM profile`;

    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Something Went Wrong!', error);
        throw error;
    }
}

// Function to consult a profile by ID

async function consultProfileById(profile_id) {
    const query = `SELECT * FROM profile WHERE profile_id = $1;`;

    try {
        const result = await pool.query(query, [profile_id]);
        return result.rows[0];
    } catch (error) {
        console.error('Something went wrong while fetching profile by ID:', error);
        throw error;
    }
}

// Function to edit a profile

async function editProfile(
    profile_id,
    profile_name,
    has_profile_management,
    has_user_management,
    has_inventory_management,
    has_maintenance,
    has_store_management,
    has_shipping,
    has_receiving
) {
    const query = `
        UPDATE profile
        SET 
            profile_name = $1, 
            has_profile_management = $2, 
            has_user_management = $3, 
            has_inventory_management = $4, 
            has_maintenance = $5, 
            has_store_management = $6, 
            has_shipping = $7, 
            has_receiving = $8
        WHERE profile_id = $9
        RETURNING *;
    `;

    const values = [
        profile_name,
        has_profile_management,
        has_user_management,
        has_inventory_management,
        has_maintenance,
        has_store_management,
        has_shipping,
        has_receiving,
        profile_id
    ];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Something Went Wrong!', error);
        throw error;
    }
}

// Function to delete a profile

async function deleteProfile(profile_id) {
    const query = `
        DELETE FROM profile
        WHERE profile_id = $1
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [profile_id]);
        return result.rows[0];
    } catch (error) {
        console.error('Something Went Wrong!', error);
        throw error;
    }
}

module.exports = { insertProfile, consultProfileAll, consultProfileById, editProfile, deleteProfile };
