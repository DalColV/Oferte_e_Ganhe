const {Pool} = require('pg');

const pool = new Pool({
     user: 'postgres',
     host: 'localhost',
     database: 'oferte_e_ganhe',
     password: 'postgres',
     port: 5432,
})

const connectToDatabase = async () => {
     try {
       
       const client = await pool.connect();
       console.log('Conexão Estabelecida!');
       client.release(); 
     } catch (error) {
       console.error('Erro ao conectar ao banco!', error.stack);
     }
   };
   
   connectToDatabase();  
   
   module.exports = {pool};


/*SEQUELIZE
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,  
  host: process.env.DB_HOST,        
  username: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
});

 module.exports = sequelize; */

