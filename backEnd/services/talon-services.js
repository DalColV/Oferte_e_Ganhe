const pool = require('../config/database');

// Function to create a new talon_logs

async function createNewTalon(inventory_id, shipment, talon_quantity, send_date, order_date, talon_status, receive_date, registration = 'talon_logs'){
    const query = ` insert into talon_logs (inventory_id, shipment, talon_quantity, send_date, order_date, talon_status, receive_date, registration)
    values ($1, $2, $3, $4, $5, $6, $7, $8)
    returning *;`

    const values = [inventory_id, shipment, talon_quantity, send_date, order_date, talon_status, receive_date, registration];

    try{ const result = await pool.query(query, values);
        return result.rows[0];
    }catch (error){
        console.error('Error! Something Went Wrong!', error);
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
        return resul.rows[0]; 
    } catch (erroR) {
        console.error('Something Went Wrong!', error);
        throw error;
    }

    
}
 

module.exports = {deleteTalonLogs, createNewTalon};