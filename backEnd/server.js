const app = require('./app'); // Importa a aplicação configurada
const sequelize = require('./config/database'); // Importa a instância do Sequelize
const PORT = process.env.PORT || 3000;

// Verifica a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');

    sequelize.sync({ force: false }) 
      .then(() => {
        console.log('Modelos sincronizados com o banco de dados.');
        
        // Inicia o servidor
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
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1); 
  });
