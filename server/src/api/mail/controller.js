const nodemailer = require('nodemailer');
const ControllerCodePasswords = require('../codesPasswordReset/controller');
require('dotenv').config();
const transporter = require('./../../middlewares/mailer');
const errorDisplay = "(Error en el controlador de Mail)";

/**
 * Función para enviar un correo electrónico de restablecimiento de contraseña.
 * Function to send a password reset email.
 * 
 * @param {string} email - El correo electrónico al que se enviará el correo de restablecimiento. | The email to which the reset email will be sent.
 * @param {string} code - El código de restablecimiento que se enviará en el correo. | The reset code that will be sent in the email.
 * @returns {Promise} - Una promesa que se resuelve con la información del correo enviado o se rechaza con un error. | A promise that resolves with the information of the sent email or rejects with an error.
 * @throws {Error} - Si hay un error al intentar enviar el correo. | If there is an error trying to send the email.
 */
const sendMailPassReset = (email, code, user_id) => {
    return new Promise((resolve, reject) => {
        try {
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Olvidaste tu contraseña",
                text: `Tu codigo para resetear tu contraseña es: ${code}`,
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            });
            ControllerCodePasswords.registerCodePasswordReset(code, user_id);
        } catch (error) {
            console.log(`Error al intentar enviar el correo de restablecimiento de contraseña ${errorDisplay}`, error);
        }
    });
};

module.exports = {
    sendMailPassReset,
};