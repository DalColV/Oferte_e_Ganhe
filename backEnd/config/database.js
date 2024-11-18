const {Pool} = require('pg');

const pool = new Pool({
     user: 'postgres',
     host: 'localhost',
     database: 'oferte_e_ganhe',
     password: 'postgres',
     port: 5432,
})

//aqui da pra fazer por async e await

pool.connect((err, client, release) => {
    if (err) {
         return console.error('Erro ao conectar ao banco!', error.stack);
     }
     console.log('Conexão Estabelecida!');
     release();
});

module.exports = pool;


