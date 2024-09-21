import axios from 'axios';

const sendEmail = async (to: string, subject: string, password: string) => {
  try {
    await axios.post('http://localhost:5000/send-email', {
      to,
      subject,
      password
    });
    console.log('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar correo:', error);
  }
};

export default sendEmail;
