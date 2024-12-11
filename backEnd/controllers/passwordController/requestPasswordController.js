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
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color:rgba(159, 241, 210, 0.45);
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              padding: 20px;
              max-width: 600px;
              margin: auto;
              background-color: white;
              border-radius: 8px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
            }
            .header h1 {
              color: #4CAF50;
              margin: 0;
            }
            .content {
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color:rgb(152, 235, 155);
              color: white;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
              text-align: center;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              font-size: 14px;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Recuperação de Senha</h1>
            </div>
            <div class="content">
              <p>Olá,</p>
              <p>Você solicitou a recuperação da sua senha. Para redefini-la, clique no botão abaixo:</p>
              <a href="${resetLink}" class="button">Redefinir Senha</a>
              <p>O link de redefinição de senha expirará em 1 hora.</p>
            </div>
            <div class="footer">
              <p>Se você não solicitou a recuperação de senha, por favor, ignore este e-mail.</p>
            </div>
          </div>
        </body>
      </html>
    `,
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