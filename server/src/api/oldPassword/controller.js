const model = require('./oldPasswordModel');
const ControllerCodePasswords = require('../codesPasswordReset/controller');
const errorDisplay = "(Error en el controlador de oldPassword)";

/**
 * Función para guardar la contraseña antigua de un usuario en la base de datos.
 * Function to save a user's old password in the database.
 * 
 * @param {string} userId - El ID del usuario al que se le quiere guardar la contraseña antigua. | The ID of the user to whom the old password is to be saved.
 * @param {string} oldPassword - La contraseña antigua que se quiere guardar. | The old password to be saved.
 * @throws {Error} - Error al intentar guardar la contraseña antigua. | Error when trying to save the old password.
 */
const saveOldPassword = async (userId, oldPassword) => {
    try {
        const changeTime = new Date();
        await model.saveOldPassword(userId, oldPassword, changeTime);
    } catch (error) {
        console.log(`Error al intentar guardar la contraseña antigua ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener todas las contraseñas antiguas de un usuario por su ID de la base de datos.
 * Function to get all old passwords of a user by their ID from the database.
 * 
 * @param {string} userId - El ID del usuario del cual se quieren obtener las contraseñas antiguas. | The ID of the user from whom the old passwords are to be obtained.
 * @returns {Array} - Un array de todas las contraseñas antiguas del usuario. | An array of all the user's old passwords.
 * @throws {Error} - Error al intentar obtener todas las contraseñas antiguas por ID de usuario. | Error when trying to get all old passwords by user ID.
 */
const getAllOldPasswordByUserId = async (userId) => {
    try {
        return await model.getAllOldPasswordByUserId(userId);
    } catch (error) {
        console.log(`Error al intentar obtener todas las contraseñas antiguas por ID de usuario ${errorDisplay}`, error);
    }
};


/**
 * Función para verificar si una contraseña es antigua o no.
 * Function to check if a password is old or not.
 * 
 * @param {string} password - La contraseña a verificar. | The password to check.
 * @param {Array} oldPasswords - Un array de todas las contraseñas antiguas del usuario. | An array of all the user's old passwords.
 * @returns {boolean} - Devuelve true si la contraseña es antigua, de lo contrario devuelve false. | Returns true if the password is old, otherwise returns false.
 */
const isOldPassword = (password, oldPasswords) => {
    return oldPasswords.includes(password);
};

module.exports = {
    saveOldPassword,
    getAllOldPasswordByUserId,
    isOldPassword
}