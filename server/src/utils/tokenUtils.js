const jwt = require('jsonwebtoken');
const errorDisplay = "(Error en tokenUtils)";

/**
 * Función para generar un token de autenticación.
 * Function to generate an authentication token.
 * 
 * @param {Object} user - El objeto de usuario para el cual se generará el token. | The user object for which the token will be generated.
 * @param {string} user.user_id - El ID del usuario. | The user's ID.
 * @param {string} user.role_id - El ID del rol del usuario. | The user's role ID.
 * @returns {string} El token de autenticación. | The authentication token.
 * @throws {Error} Si hay un error al generar el token de autenticación. | If there is an error generating the authentication token.
 */
const generateAuthToken = (user) => {
    try {
        const payload = { userId: user.user_id, role: user.role_id };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_AUTH_EXPIRATION });
    } catch (error) {
        console.log(`Error al generar el token de autenticación ${errorDisplay}`, error);
    }
};

/**
 * Función para verificar un token de autenticación.
 * Function to verify an authentication token.
 * 
 * @param {string} token - El token de autenticación a verificar. | The authentication token to verify.
 * @returns {Object} El objeto decodificado del token. | The decoded object from the token.
 * @throws {Error} Si hay un error al verificar el token de autenticación. | If there is an error verifying the authentication token.
 */
const verifyAuthToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.log(`Error al verificar el token de autenticación ${errorDisplay}`, error);
    }
};



module.exports = {
    generateAuthToken,
    verifyAuthToken,
};
