const jwt = require('jsonwebtoken');

// Use a chave secreta configurada no .env
const RESET_PASSWORD_SECRET_KEY = process.env.RESET_PASSWORD_SECRET_KEY;

function generateResetToken(email) {
  const payload = { 
      email,
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // expiração de 1 hora
  };
  const secretKey = process.env.RESET_PASSWORD_SECRET_KEY;

  return jwt.sign(payload, secretKey);
}


// Função para verificar e decodificar o token
function verifyResetToken(token) {
  try {
      console.log('Verificando token:', token); 
      const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET_KEY);
      console.log('Token verificado com sucesso:', decoded);
      return decoded;
  } catch (error) {
      console.log('Erro ao verificar token:', error.message);  
      throw new Error('Token inválido ou expirado');
  }
}

module.exports = { generateResetToken, verifyResetToken };
