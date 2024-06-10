const jwt = require('jsonwebtoken');
const model = require('./userModel');
const filesUpload = require('../files/controller');
const { createStripeCustomer, deleteStripeCustomer } = require('../stripe/controller');
const { generateAuthToken } = require('../../utils/tokenUtils');
const bcrypt = require('bcrypt');
const { isOldPassword, saveOldPassword } = require('./../oldPassword/controller');
const { sendMailPassReset } = require('./../mail/controller');
const { verifyCode } = require('./../codesPasswordReset/controller');
const errorDisplay = "(Error en el controlador de Usuarios)";
const saltNumber = 10;

/**
 * Función para registrar un nuevo usuario.
 * Function to register a new user.
 * 
 * @param {Object} user - Los datos del usuario. | The user's data.
 * @property {string} user.email - El correo electrónico del usuario. | The user's email.
 * @property {string} user.current_password - La contraseña actual del usuario. | The user's current password.
 * @property {string} user.first_name - El primer nombre del usuario. | The user's first name.
 * @property {string} user.last_name - El apellido del usuario. | The user's last name.
 * @property {string} user.dni - El DNI del usuario. | The user's DNI.
 * 
 * @returns {Promise} - Promesa que resuelve al registrar el usuario, devolviendo el usuario registrado. | Promise that resolves when registering the user, returning the registered user.
 * @returns {null} - Retorna null si faltan datos del usuario. | Returns null if user data is missing.
 * @throws {Error} - Error al intentar registrar el usuario. | Error when trying to register the user.
 */
const registerUser = async (user) => {
    try {
        const { email, current_password, first_name, last_name, dni } = user;

        if (!email || !current_password || !first_name || !last_name || !dni)
            return null;

        const salt = await bcrypt.genSalt(saltNumber);
        user.current_password = await bcrypt.hash(user.current_password, salt);

        user.stripeCustomer = await createStripeCustomer(email, first_name + ' ' + last_name);
        
        return await model.addUser(user);
    } catch (error) {
        console.log(`Error al intentar registrar el usuario ${errorDisplay}`, error);
    }
};

/**
 * Función para eliminar un usuario por su ID.
 * Function to delete a user by their ID.
 * 
 * @param {string} userId - El ID del usuario a eliminar. | The ID of the user to delete.
 * 
 * @returns {Promise} - Promesa que resuelve al eliminar el usuario, devolviendo el usuario eliminado. | Promise that resolves when deleting the user, returning the deleted user.
 * @throws {Error} - Error al intentar eliminar el usuario. | Error when trying to delete the user.
 */
const deleteUserById = async (userId) => {
    try {
        const user = await model.getUsers(null, null, userId);
        await deleteStripeCustomer(user[0].stripe_customer_id);
        const deletedUser = await model.deleteUser(userId);
        return deletedUser;
    } catch (error) {
        console.log(`Error al intentar eliminar el usuario ${errorDisplay}`, error);
    }
};

/**
 * Función para actualizar un usuario por su ID.
 * Function to update a user by their ID.
 * 
 * @param {string} userId - El ID del usuario a actualizar. | The ID of the user to update.
 * @param {Object} user - Los nuevos datos del usuario. | The new user data.
 * 
 * @returns {Promise} - Promesa que resuelve al actualizar el usuario, devolviendo el usuario actualizado. | Promise that resolves when updating the user, returning the updated user.
 * @throws {Error} - Error al intentar actualizar el usuario. | Error when trying to update the user.
 */
const updateUserById = async (userId, user) => {
    try {
        const updatedUser = await model.updateUser(userId, user);
        return updatedUser;
    } catch (error) {
        console.log(`Error al intentar actualizar el usuario ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener un usuario por su ID.
 * Function to get a user by their ID.
 * 
 * @param {string} userId - El ID del usuario a obtener. | The ID of the user to get.
 * 
 * @returns {Promise} - Promesa que resuelve al obtener el usuario, devolviendo el usuario. | Promise that resolves when getting the user, returning the user.
 * @throws {Error} - Error al intentar obtener el usuario por ID. | Error when trying to get the user by ID.
 */
const getUserById = async (userId) => {
    try {
        let user = await model.getUsers(null, null, userId);

        user =  user.map(user => ({
            "user_id": user.user_id ,
            "email": user.email ,
            "first_name": user.UserInfo.first_name ,
            "last_name": user.UserInfo.last_name ,
            "dni": user.UserInfo.dni ,
            "role_id": user.Roles[0].role_id,
            "role_name": user.Roles[0].role_name,
            "stripe_customer_id": user.stripe_customer_id,
            "status": user.status
        }));

        return user[0];
    } catch (error) {
        console.log(`Error al intentar obtener el usuario por ID ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener usuarios con paginación.
 * Function to get users with pagination.
 * 
 * @param {number} limit - El número máximo de usuarios a obtener por página. | The maximum number of users to fetch per page.
 * @param {number} page - La página de usuarios a obtener. | The page of users to fetch.
 * 
 * @returns {Promise} - Promesa que resuelve al obtener los usuarios, devolviendo un objeto con el total de usuarios, el total de páginas y los usuarios de la página solicitada. | Promise that resolves when getting the users, returning an object with the total users, total pages and the users of the requested page.
 * @throws {Error} - Error al intentar obtener los usuarios. | Error when trying to get the users.
 */
const getUsers = async (limit, page) => {
    try {
        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);
        const skip = (parsedPage - 1) * parsedLimit;

        let users = await model.getUsers(skip, parsedLimit);
        
        const total = await model.getUsersCount();

        users =  users.map(user => ({
            "user_id": user.user_id ,
            "email": user.email ,
            "first_name": user.UserInfo.first_name ,
            "last_name": user.UserInfo.last_name ,
            "dni": user.UserInfo.dni ,
            "role_id": user.Roles[0].role_id,
            "role_name": user.Roles[0].role_name,
            "stripe_customer_id": user.stripe_customer_id,
            "status": user.status
        }));

        return {
            total,
            pages: Math.ceil(total / limit),
            users
        };
    } catch (error) {
        console.log(`Error al intentar obtener los usuarios ${errorDisplay}`, error);
    }
};

/**
 * Función para iniciar sesión de un usuario.
 * Function to log in a user.
 * 
 * @param {string} email - El correo electrónico del usuario. | The user's email.
 * @param {string} password - La contraseña del usuario. | The user's password.
 * 
 * @returns {Promise} - Promesa que resuelve al iniciar sesión, devolviendo un objeto con el token de autenticación y el token de actualización. | Promise that resolves when logging in, returning an object with the authentication token and the refresh token.
 * @returns {null} - Retorna null si el correo electrónico o la contraseña son incorrectos, o si el estado del usuario no es 'Active'. | Returns null if the email or password are incorrect, or if the user's status is not 'Active'.
 * @throws {Error} - Error al intentar iniciar sesión. | Error when trying to log in.
 */
const loginUser = async (email, password) => {
    try {
        const user = await model.getUserByEmail(email);

        
        if (user && await bcrypt.compare(password, user.current_password) && user.status === 'Activo'){

            const authToken = generateAuthToken(user);

            return authToken;
        }

        return null;
    } catch (error) {
        console.log(`Error al intentar iniciar sesión ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener usuarios por fecha de registro.
 * Function to get users by registration date.
 * 
 * @param {string} startDate - La fecha de inicio del rango de fechas de registro. | The start date of the registration date range.
 * @param {string} endDate - La fecha de fin del rango de fechas de registro. | The end date of the registration date range.
 * 
 * @returns {Promise} - Promesa que resuelve al obtener los usuarios, devolviendo los usuarios que se registraron dentro del rango de fechas proporcionado. | Promise that resolves when getting the users, returning the users who registered within the provided date range.
 * @throws {Error} - Error al intentar obtener los usuarios por fecha de registro. | Error when trying to get users by registration date.
 */
const getUsersByRegistrationDate = async (startDate, endDate) => {
    try {
        const users = await getUsersByRegistrationDate(new Date(startDate), new Date(endDate));
        return users;
    } catch (error) {
        console.log(`Error al intentar obtener los usuarios por fecha de registro ${errorDisplay}`, error);
    }
};

/**
 * Función para cambiar la contraseña de un usuario.
 * Function to change a user's password.
 * 
 * @param {string} email - El correo electrónico del usuario. | The user's email.
 * @param {string} code - El código de restablecimiento de contraseña. | The password reset code.
 * @param {string} currentPassword - La contraseña actual del usuario. | The user's current password.
 * @param {string} newPassword - La nueva contraseña. | The new password.
 * @param {string} confirmPassword - La confirmación de la nueva contraseña. | The confirmation of the new password.
 * 
 * @returns {Promise} - Promesa que resuelve al cambiar la contraseña, devolviendo el usuario actualizado. | Promise that resolves when changing the password, returning the updated user.
 * @returns {null} - Retorna null si la nueva contraseña es igual a la contraseña actual o si ya ha sido registrada con este usuario. | Returns null if the new password is the same as the current password or if it has already been registered with this user.
 * @throws {Error} - Error al intentar cambiar la contraseña. | Error when trying to change the password.
 */
const changePassword = async (email, code, newPassword, confirmPassword) => {
    try {
        
        const user = await model.getUserByEmail(email);
        // Verify the code and email
        const isCodeValid = await verifyPasswordResetCode(email, code);
        if (!isCodeValid) {
            console.error('Código de restablecimiento de contraseña inválido');
            return null;
        }

        // Check if the new password is the same as the current password
        if (newPassword === user.current_password) {
            console.error('La nueva contraseña es igual a la contraseña actual');
            return null;
        }

        // Check if the new password has already been used by the user
        const isOld = await isOldPassword(user.user_id, newPassword);
        if (isOld) {
            console.error('La nueva contraseña ya ha sido registrada con este usuario');
            return null;
        }
        
        // Check if the new password and confirmation match
        if (newPassword !== confirmPassword) {
            console.error('La nueva contraseña y la confirmación no coinciden');
            return null;
        }
        // Generate a new hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Save the new password as an old password
        await saveOldPassword(user.user_id, user.current_password);

        // Update the user's password
        return await model.updateUserPassword(user.user_id, hashedPassword);
    } catch (error) {
        console.log(`Error al intentar cambiar la contraseña ${errorDisplay}`, error);
    }
};

const changePasswordUser = async (userId, oldPassword, newPassword, confirmPassword) => {
    try{
        const salt = await bcrypt.genSalt(saltNumber);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        let message = '';
        const user = await model.getUserId(userId);

        if(!await bcrypt.compare(oldPassword, user.current_password)){
            message = 'La contraseña actual es incorrecta';
        }

        // Check if the new password is the same as the current password
        if (newPassword === await bcrypt.compare(oldPassword, user.current_password)) {
            message = 'La nueva contraseña es igual a la contraseña actual';
            return null;
        }

        // Check if the new password has already been used by the user
        const isOld = await isOldPassword(user.user_id, hashedPassword);
        if (isOld) {
            message = 'La nueva contraseña ya ha sido registrada con este usuario';
        }
        
        // Check if the new password and confirmation match
        if (newPassword !== confirmPassword) {
            message = 'La nueva contraseña y la confirmación no coinciden';
        }
        // Generate a new hashed password

        // Save the new password as an old password
        await saveOldPassword(user.user_id, user.current_password);
        // Update the user's password
        await model.updateUserPassword(user.user_id, hashedPassword);
        return message;
    } catch (error) {
        console.log(`Error al intentar cambiar la contraseña ${errorDisplay}`, error);
    }
}

/**
 * Función para restablecer la contraseña de un usuario.
 * Function to reset a user's password.
 * 
 * @param {string} email - El correo electrónico del usuario. | The user's email.
 * 
 * @returns {Promise} - Promesa que resuelve al restablecer la contraseña, enviando un correo electrónico al usuario con un código para restablecer su contraseña. | Promise that resolves when resetting the password, sending an email to the user with a code to reset their password.
 * @throws {Error} - Error al intentar buscar el usuario. | Error when trying to find the user.
 * @throws {Error} - Error al intentar restablecer la contraseña. | Error when trying to reset the password.
 */
const resetPasswordCode = async (email) => {
    try {
        const user = await model.getUserByEmail(email);
        if (!user) {
            console.log(`Error al intentar buscar el usuario ${errorDisplay}`);
            return null;
        }

        const code = createCode();
        await sendMailPassReset(email, code, user.user_id);
        return code;
    } catch (error) {
        console.log(`Error al intentar restablecer la contraseña ${errorDisplay}`, error);
    }
};

const verifyPasswordResetCode = async (email, code) => {
    try {
        const user = await model.getUserByEmail(email);
        if (!user) {
            console.log(`Error al intentar buscar el usuario ${errorDisplay}`);
        }
        const isCodeValid = await verifyCode(code, user.user_id);
    
        return isCodeValid;        
    } catch (error) {
        console.log(`Error al intentar verificar el código ${errorDisplay}`, error);
    }
}

const getGeneralPanelInfo = async () => {
    try {
        const date = new Date();
        date.setDate(date.getDate() - 7);

        const totalUsers = await model.getTotalUsers();
        const totalActiveUsers = await model.getTotalActiveUsers('Active');
        const totalInactiveUsers = await model.getTotalActiveUsers('Inactive');
        const totalUsersRegitrationWeek = await model.getCountUsersRegistrationWeek(new Date(),date);

        return {
            totalUsers,
            totalActiveUsers,
            totalInactiveUsers,
            totalUsersRegitrationWeek
        };
    } catch (error) {
        console.log(`Error al intentar obtener la información general del panel ${errorDisplay}`, error);
    }
}

function createCode(){
    return Math.floor(Math.random() * 999999);
};

module.exports =  {
    registerUser,
    deleteUserById,
    updateUserById,
    getUserById,
    getUsers,
    loginUser,
    changePassword,
    getUsersByRegistrationDate,
    verifyPasswordResetCode,
    resetPasswordCode,
    getGeneralPanelInfo,
    changePasswordUser
};
