const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { User } = require('../../models/userModel');
const userService = require('../../services/userServices');

// Função para enviar o e-mail com o link de redefinição
async function sendResetEmail(email, token) {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  const mailOptions = {
    from: 'seuemail@gmail.com',
    to: email,
    subject: 'Recuperação de Senha',
    text: `Clique no link abaixo para redefinir sua senha:\n\n${resetLink}`,
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'carolinadalcolana@gmail.com',  
        pass: 'yyqo vrgs atjf cule',  
    },
});

try {
    await transporter.sendMail(mailOptions);
    console.log('Link de recuperação enviado.');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw new Error('Falha ao enviar o e-mail de recuperação');
  }
}

// Controller para solicitar recuperação de senha
async function requestPasswordReset(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email é obrigatório.' });
  }

  try {
    console.log('Procurando usuário com o email:', email);

    // Verifica se o usuário existe
    const user = await userService.getUserEmailByEmail(email);
    if (!user) {
        console.log('Usuário não encontrado com o email:', email);

      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

     // Verifica se a variável de ambiente está correta
     if (!process.env.RESET_PASSWORD_SECRET_KEY) {
        throw new Error('RESET_PASSWORD_SECRET_KEY não está definida no arquivo de variáveis de ambiente.');
      }

    // Gera o token
    const token = jwt.sign({ email }, process.env.RESET_PASSWORD_SECRET_KEY, { expiresIn: '1h' });
    console.log('Token gerado:', token);

    // Envia o e-mail com o link de redefinição
    await sendResetEmail(email, token);

    return res.status(200).json({ message: 'Link de recuperação enviado para o email.' });
  } catch (error) {
    console.error('Erro ao solicitar recuperação de senha:', error);
    return res.status(500).json({ message: 'Erro ao solicitar recuperação de senha.' });
  }
}

module.exports = { requestPasswordReset, sendResetEmail};