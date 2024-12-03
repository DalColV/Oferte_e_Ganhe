const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'seuemail@gmail.com', 
  },
});

module.exports = transporter;
