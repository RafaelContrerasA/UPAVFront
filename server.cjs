const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chavezlopezabigail28@gmail.com',
    pass: 'pppw bphj asmn cgmu'
  }
});

app.post('/send-email', (req, res) => {
  const { to, password } = req.body;

  const mailOptions = {
    from: 'U.P.A.V <chavezlopezabigail28@gmail.com>',
    to,
    subject: 'Contraseña para inicio de sesión',
    html: `
      <h2>Bienvenido a U.P.A.V (Un Post A La Vez)</h2>
      <p>Tu <strong>contraseña</strong> para ingresar a la plataforma de U.P.A.V es: ${password}.</p>
      <p>Favor de cambiarla lo antes posible.</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Correo enviado: ' + info.response);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
