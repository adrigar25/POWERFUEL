const model = require('./codesPasswordResetModel');
const errorDisplay = "(Error en el controlador de codesPasswordReset)";

/**
 * Función para registrar un código de reseteo de contraseña para un usuario.
 * Function to register a password reset code for a user.
 * 
 * @param {string} code - El código de reseteo de contraseña. | The password reset code.
 * @param {string} user_id - El ID del usuario. | The user's ID.
 * 
 * @returns {Object} - El resultado de la inserción del código en la base de datos. | The result of inserting the code into the database.
 * @throws {Error} - Error al intentar registrar el código de reseteo de contraseña. | Error when trying to register the password reset code.
 */
const registerCodePasswordReset = async (code, user_id) => {
    try {
        if (!code ||!user_id) {
            console.log(`No se ha recibido toda la información necesaria ${errorDisplay}`);
        }
        const dateRegister = new Date();
        const dataUserFind = searchUserCodeReset(user_id);

        if(dataUserFind){
            await deleteCodeUser(user_id);
        }

        const result = await model.insertCode(code, user_id, dateRegister);

        return result;
    } catch (error) {
        console.error(error)
        console.log(`Error al registrar un código de reseteo de contraseñas dentro de la base de datos ${errorDisplay}`,error);
    }
}

/**
 * Función para buscar un código de reseteo de contraseña para un usuario.
 * Function to search for a password reset code for a user.
 * 
 * @param {string} user_id - El ID del usuario. | The user's ID.
 * 
 * @returns {Object} - El resultado de la búsqueda del código en la base de datos. | The result of searching for the code in the database.
 * @throws {Error} - Error al intentar buscar el código de reseteo de contraseña. | Error when trying to search for the password reset code.
 */
const searchUserCodeReset = async (user_id) => {
    try {
        if (!user_id) {
            console.log(`No se ha recibido toda la información necesaria ${errorDisplay}`);
        }
        const result = await model.searchCodeUser(user_id);
        if(!result || result < 1){
            return 0;
        }else{
            return result;
        }
    } catch (error) {
        console.log(`Error al buscar un código de reseteo de contraseñas dentro de la base de datos ${errorDisplay}`,error);
    }
}

/**
 * Función para eliminar un código de reseteo de contraseña para un usuario.
 * Function to delete a password reset code for a user.
 * 
 * @param {string} user_id - El ID del usuario. | The user's ID.
 * 
 * @returns {Object} - El resultado de la eliminación del código en la base de datos. | The result of deleting the code in the database.
 * @throws {Error} - Error al intentar eliminar el código de reseteo de contraseña. | Error when trying to delete the password reset code.
 */
const deleteCodeUser = async (user_id) => {
    try {
        if (!user_id) {
            console.log(`No se ha recibido toda la información necesaria ${errorDisplay}`);
        }
        const result = await model.deleteCodeUser(user_id);
        return result;
    } catch (error) {
        console.log(`Error al eliminar un código de reseteo de contraseñas dentro de la base de datos ${errorDisplay}`,error);
    }
}

/**
 * Función para verificar un código de reseteo de contraseña para un usuario.
 * Function to verify a password reset code for a user.
 * 
 * @param {string} code - El código de reseteo de contraseña. | The password reset code.
 * @param {string} userId - El ID del usuario. | The user's ID.
 * 
 * @returns {boolean} - Verdadero si el código coincide con el del usuario, falso en caso contrario. | True if the code matches the user's, false otherwise.
 * @throws {Error} - Error al intentar verificar el código de reseteo de contraseña. | Error when trying to verify the password reset code.
 */
const verifyCode = async (code, userId) => {
    try {
        if (!code ||!userId) {
            console.log(`No se ha recibido toda la información necesaria ${errorDisplay}`);
        }

        console.log("code", code);
        console.log("userId", userId);
        try {
            const result = await searchUserCodeReset(userId);
            console.log("result", result);
    
            if (!result || result.length < 1) {
                return false;
            }
    
            return result.code === code;
        } catch (error) {
            console.log(`Error al verificar un código de reseteo de contraseñas dentro de la base de datos (codeError: 1) ${errorDisplay}`, error);
        }
    } catch (error) {
        console.log(`Error al verificar un código de reseteo de contraseñas dentro de la base de datos (codeError: 2) ${errorDisplay}`,error);
    }
}

module.exports = {
    registerCodePasswordReset,
    searchUserCodeReset,
    deleteCodeUser,
    verifyCode
}