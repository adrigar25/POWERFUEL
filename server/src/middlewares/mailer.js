require('dotenv').config();
const nodemailer = require('nodemailer');

/**
 * Configuración del transportador de correo electrónico utilizando nodemailer.
 * Email transporter configuration using nodemailer.
 * 
 * @type {null} transporter - Variable para almacenar el transportador de correo electrónico. | Variable to store the email transporter.
 * @property {string} host - El host del servidor de correo electrónico. | The host of the email server.
 * @property {number} port - El puerto del servidor de correo electrónico. | The port of the email server.
 * @property {boolean} secure - Si se debe usar SSL/TLS para la conexión de correo electrónico. | Whether to use SSL/TLS for the email connection.
 * @property {Object} auth - Las credenciales de autenticación para el servidor de correo electrónico. | The authentication credentials for the email server.
 * @property {string} auth.user - El usuario para el servidor de correo electrónico. | The user for the email server.
 * @property {string} auth.pass - La contraseña para el servidor de correo electrónico. | The password for the email server.
 */
const transporter =
    nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT, 
    secure: true, 
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSEMAIL 
    }
});


module.exports = transporter;