const pool = require('../config/database');

// Function to create a new talon log
async function insertTalon(inventory_id, shipment, talon_quantity, send_date, order_date, talon_status, receive_date, registration) {
    const query = `
        INSERT INTO talon_logs (inventory_id, shipment, talon_quantity, send_date, order_date, talon_status, receive_date, registration)
        VALUES ($1, $2, $3, $4::Timestamp, $5::Timestamp, $6::talon_status_enum, $7::Timestamp, $8)
        RETURNING *;
    `;

    const values = [inventory_id, shipment, talon_quantity, send_date, order_date, talon_status, receive_date, registration];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating talon log:', error);
        throw error;
    }
}

// Function to consult all talons
async function talonConsultAll() {
    const query = `SELECT * FROM talon_logs;`;
    
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching all talons:', error);
        throw error;
    }
}

// Function to consult a talon by ID
async function talonConsultById(talon_id) {
    const query = `SELECT * FROM talon_logs WHERE talon_id = $1;`;

    try {
        const result = await pool.query(query, [talon_id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching talon by ID:', error);
        throw error;
    }
}

// Function to edit a talon log
async function editTalon(talon_id, inventory_id, shipment, talon_quantity, send_date, order_date, talon_status, receive_date, registration) {
    const query = `
        UPDATE talon_logs
        SET inventory_id = $1, shipment = $2, talon_quantity = $3, send_date = $4, order_date = $5, talon_status = $6, receive_date = $7, registration = $8
        WHERE talon_id = $9
        RETURNING *;
    `;

    const values = [inventory_id, shipment, talon_quantity, send_date, order_date, talon_status, receive_date, registration, talon_id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; 
    } catch (error) {
        console.error('Error updating talon log:', error);
        throw error;
    }
}

// Function to delete a talon log
async function deleteTalonLogs(talon_id) {
    const query = `
        DELETE FROM talon_logs
        WHERE talon_id = $1
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [talon_id]);
        return result.rows[0]; 
    } catch (error) {
        console.error('Error deleting talon log:', error);
        throw error;
    }
}

module.exports = { insertTalon, talonConsultAll, talonConsultById, editTalon, deleteTalonLogs };