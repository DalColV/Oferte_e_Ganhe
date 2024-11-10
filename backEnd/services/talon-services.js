const pool = require('../config/database');

// Function to create a new talon_logs

async function insertTalon(inventory_id, shipment, talon_quantity, send_date, order_date, talon_status, receive_date, registration) {
    const query = `
        INSERT INTO talon_logs (inventory_id, shipment, talon_quantity, send_date, order_date, talon_status, receive_date, registration)
        VALUES ($1, $2::Varchar, $3, $4::Timestamp, $5::Timestamp, $6::JSONB, $7::Timestamp, $8)
        RETURNING *;
    `;

    const values = [inventory_id, shipment, talon_quantity, send_date, order_date, talon_status, receive_date, registration];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Something Went Wrong!', error);
        throw error;
    }
}


//Function to Edit a Talon

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
        console.error('Something Went Wrong!', error);
        throw error;
    }
}

// Function to delete a Talon

async function deleteTalonLogs(talon_id) {
    const query = `
    DELETE FROM talon_logs
    WHERE talon_id = $1
    RETURNING*;
    `;

    try {
        const result = await pool.query(query, [talon_id]);
        return result.rows[0]; 
    } catch (erroR) {
        console.error('Something Went Wrong!', error);
        throw error;
    }

    
}
 

module.exports = {insertTalon, deleteTalonLogs, editTalon};