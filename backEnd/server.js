const app = require('./app'); 
const sequelize = require('./config/database'); 
const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');

    sequelize.sync({ force: false }) 
      .then(() => {
        console.log('Modelos sincronizados com o banco de dados.');
        
        app.listen(PORT, () => {
          console.log(`Servidor rodando na porta ${PORT}`);
        });
      })
      .catch((err) => {
        console.error('Erro ao sincronizar os modelos:', err);
        process.exit(1); 
      });
  })
  .catch((err) => {
    process.exit(1); 
  });
