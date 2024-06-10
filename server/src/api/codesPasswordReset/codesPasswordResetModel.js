const { Op } = require('sequelize');
const sequelize = require('../../model/database');
const { PasswordResetCode } = require('../../model');
const errorDisplay = "(Error en el modelo de codesPasswordResetModel)";

class model {
    insertCode = async (code, user_id, dateRegister) => {
        try {

            return await PasswordResetCode.create({
                code: code,
                user_id: user_id,
                create_at: dateRegister,
            });
        } catch (error) {
            console.log(`Error al intentar insertar en la base de datos el codigo vinculado a un usuario para resetear la contraseña ${errorDisplay}`, error);
        }
    }

    searchCodeUser = async (user_id) => {
        try {
            return await PasswordResetCode.findOne({
                where: {
                    user_id: user_id,
                }
            });
        } catch (error) {
            console.log(`Error al intentar buscar en la base de datos el codigo vinculado a un usuario para resetear la contraseña ${errorDisplay}`, error);
        }
    }

    deleteCodeUser = async (user_id) => {
        try {
            return await PasswordResetCode.destroy({
                where: {
                    user_id: user_id
                }
            });
        } catch (error) {
            console.log(`Error al intentar borrar en la base de datos el codigo vinculado a un usuario para resetear la contraseña ${errorDisplay}`, error);
        }
    }

    updateCodeUser = async (code, user_id, dateRegister) => {
        let dateRegisterFormat = new Date(dateRegister);
        try {
            return await PasswordResetCode.update({
                code: code,
                user_id: user_id,
                create_at: dateRegisterFormat,
                used: '0'
            }, {
                where: {
                    user_id: user_id
                }
            });
        } catch (error) {
            console.log(`Error al intentar actualizar en la base de datos el codigo vinculado a un usuario para resetear la contraseña ${errorDisplay}`, error);
        }
    }
}

module.exports = new model();