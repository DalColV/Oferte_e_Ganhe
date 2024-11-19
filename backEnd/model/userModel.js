//import {user} from '../model';

//export const getUserByRegistration = async (registration) =>{
//    return await User.findOne({where: {registration : registration}});
//};

const { pool } = require('../config/database');

    const getUserByRegistration = async (registration) =>{
    const result = await pool.query( 'SELECT * FROM users WHERE registration = $1', [registration]);

    return result.rows[0];
};

module.exports = { getUserByRegistration };