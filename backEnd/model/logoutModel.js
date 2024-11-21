const { pool } = require('../config/database');

const putTokenOff = async (token) => {
const query = `Insert into logout_tokens_off (token)
values ($1)`;

await pool.query(query, [token]);

 };


 const tokenVerifyLogout = async (token) => {
    try {
        const query = `SELECT EXISTS (SELECT 1 FROM logout_tokens_off WHERE token = $1) AS is_logged_out`;
        const result = await pool.query(query, [token]);

        return result.rows[0].is_logged_out;
    } catch (error) {
        console.error("Error verifying if token is logged out:", error);
        throw new Error("Error verifying token status");
    }
};


module.exports = {putTokenOff, tokenVerifyLogout} ;