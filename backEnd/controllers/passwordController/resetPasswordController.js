const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  User  = require('../../models/userModel');

async function resetPassword(req, res) {
    const { email, novaSenha, confirmeSenha } = req.body;
  
    if (novaSenha !== confirmeSenha) {
      return res.status(400).json({ message: 'As senhas não coincidem.' });
    }
  
    if (!email || !novaSenha) {
      return res.status(400).json({ message: 'Email e nova senha são obrigatórios.' });
    }
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(novaSenha, saltRounds);
  
      user.password = hashedPassword;
      await user.save();
  
      return res.status(200).json({ message: 'Senha redefinida com sucesso.' });
    } catch (error) {
      console.error('Erro ao redefinir a senha:', error);  // Logando o erro completo
      return res.status(500).json({ message: 'Erro ao redefinir a senha.', error: error.message });
    }
  }
  

module.exports = {resetPassword};