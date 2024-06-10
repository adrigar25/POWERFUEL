const { Op } = require('sequelize');
const sequelize = require('../../model/database');
const { OldPasswords } = require('../../model');
const errorDisplay = "(Error en el modelo de oldPassword)";

class model {
    /**
     * Método para guardar la contraseña antigua de un usuario en la base de datos.
     * Method to save a user's old password in the database.
     * 
     * @param {string} userId - El ID del usuario al que se le quiere guardar la contraseña antigua. | The ID of the user to whom the old password is to be saved.
     * @param {string} oldPassword - La contraseña antigua que se quiere guardar. | The old password to be saved.
     * @param {Date} changeTime - La fecha y hora en que se cambió la contraseña. | The date and time when the password was changed.
     * @throws {Error} - Error al intentar guardar la contraseña antigua. | Error when trying to save the old password.
     */
    saveOldPassword = async (userId, oldPassword, changeTime) => {
        try {
            await OldPasswords.create({ 
                user_id: userId,
                old_password: oldPassword,
                change_date: changeTime 
            });
        } catch (error) {
            
            console.log(error);
            console.log(`Error al guardar la antigua contraseña ${errorDisplay}`, error);
        }
    };

    /**
     * Método para obtener todas las contraseñas antiguas de un usuario por su ID de la base de datos.
     * Method to get all old passwords of a user by their ID from the database.
     * 
     * @param {string} userId - El ID del usuario del cual se quieren obtener las contraseñas antiguas. | The ID of the user from whom the old passwords are to be obtained.
     * @returns {Array} - Un array de todas las contraseñas antiguas del usuario. | An array of all the user's old passwords.
     * @throws {Error} - Error al intentar obtener todas las contraseñas antiguas por ID de usuario. | Error when trying to get all old passwords by user ID.
     */
    getAllOldPasswordByUserId = async (userId) => {
        try {
            return await OldPasswords.findAll({ 
                where: { user_id: userId } 
            });
        } catch (error) {
            console.log(`Error al obtener todas las antiguas contraseñas por ID de usuario ${errorDisplay}`, error);
        }
    };
}

module.exports = new model();