const express = require('express');
const isAdmin = require('../../middlewares/isAdmin');
const { registerUser, deleteUserById, updateUserById, getUserById, getUsers, loginUser, getUsersByRegistrationDate, changePassword, resetPasswordCode, verifyPasswordResetCode, getGeneralPanelInfo, changePasswordUser } = require('./controller');

const router = express.Router();

router.route('/')
    /**
     * @route POST /
     * Endpoint para registrar un nuevo usuario.
     * Endpoint to register a new user.
     * 
     * @param {Object} req.body.user - Los datos del usuario que se quiere registrar. | The data of the user to be registered.
     * @returns {Object} 200 - El usuario registrado. | The registered user.
     * @returns {Object} 400 - Error al registrar el usuario. | Error when registering the user.
     * @returns {Error} 500 - Error interno del servidor al registrar el usuario. | Internal server error when registering the user.
     */
    .post(async (req, res) => {
        try {
            const user = await registerUser(req.body.user);
            if (!user) {
                 res.status(400).json({ message: 'error registering the user'});
            }
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error registering the user' });
        }
    })
    /**
     * @route GET /
     * Endpoint para obtener todos los usuarios.
     * Endpoint to get all users.
     * 
     * @returns {Array} 200 - Un array de todos los usuarios. | An array of all users.
     * @returns {Error} 500 - Error interno del servidor al obtener los usuarios. | Internal server error when getting the users.
     */
    .get(isAdmin, async (req, res) => {
        try {
            const data = await getUsers(req.query.limit, req.query.page);
            res.send(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error getting the users' });
        }
    });

router.route('/:userId')
    /**
     * @route DELETE /:userId
     * Endpoint para eliminar un usuario por su ID.
     * Endpoint to delete a user by their ID.
     * 
     * @param {string} req.params.userId - El ID del usuario que se quiere eliminar. | The ID of the user to be deleted.
     * @returns {Object} 200 - Mensaje de éxito al eliminar el usuario. | Success message when deleting the user.
     * @returns {Object} 404 - Error cuando el usuario no se encuentra. | Error when the user is not found.
     * @returns {Error} 500 - Error interno del servidor al eliminar el usuario. | Internal server error when deleting the user.
     */
    .delete(isAdmin, async (req, res) => {
        try {
            const userId = req.params.userId;
            const deletedUser = await deleteUserById(userId);
            if (!deletedUser) {
                 res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al eliminar el usuario' });
        }
    })
    /**
     * @route PUT /:userId
     * Endpoint para actualizar un usuario por su ID.
     * Endpoint to update a user by their ID.
     * 
     * @param {string} req.params.userId - El ID del usuario que se quiere actualizar. | The ID of the user to be updated.
     * @param {Object} req.body.user - Los datos actualizados del usuario. | The updated data of the user.
     * @returns {Object} 200 - Mensaje de éxito al actualizar el usuario. | Success message when updating the user.
     * @returns {Object} 404 - Error cuando el usuario no se encuentra. | Error when the user is not found.
     * @returns {Error} 500 - Error interno del servidor al actualizar el usuario. | Internal server error when updating the user.
     */
    .put( async (req, res) => {
        try {
            const userId = req.params.userId;
            const userData = await updateUserById(userId, req.body.user);
            const user = await updateUserById(userId, userData);
            if (!user) {
                 res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json({ message: 'Usuario modificado correctamente' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al modificar el usuario' });
        }
    })
    /**
     * @route GET /:userId
     * Endpoint para obtener un usuario por su ID.
     * Endpoint to get a user by their ID.
     * 
     * @param {string} req.params.userId - El ID del usuario que se quiere obtener. | The ID of the user to be obtained.
     * @returns {Object} 200 - El usuario obtenido. | The obtained user.
     * @returns {Object} 404 - Error cuando el usuario no se encuentra. | Error when the user is not found.
     * @returns {Error} 500 - Error interno del servidor al obtener el usuario. | Internal server error when getting the user.
     */
    .get(async (req, res) => {
        const userId = req.params.userId;
        try {
            const user = await getUserById(userId);
            if (!user) {
                 res.status(404).json({ message: 'Usuario no encontrado' });
            }
             res.status(200).json(user); 
        } catch (error) {
            console.log(error);
            if (!res.headersSent) {
                 res.status(500).json({ message: 'Error al obtener el usuario' });
            }
        }
    });

router.route('/login')
    /**
     * @route POST /login
     * Endpoint para iniciar sesión de un usuario.
     * Endpoint to log in a user.
     * 
     * @param {string} req.body.email - El correo electrónico del usuario que intenta iniciar sesión. | The email of the user trying to log in.
     * @param {string} req.body.password - La contraseña del usuario que intenta iniciar sesión. | The password of the user trying to log in.
     * @returns {Object} 200 - Mensaje de éxito al iniciar sesión y los tokens de autenticación y actualización. | Success message when logging in and the authentication and refresh tokens.
     * @returns {Object} 401 - Error cuando las credenciales son incorrectas. | Error when the credentials are incorrect.
     * @returns {Error} 500 - Error interno del servidor al iniciar sesión. | Internal server error when logging in.
     */
    .post(async (req, res) => {
        try {
            const token = await loginUser(req.body.email, req.body.password);
            if (!token) {
                return res.status(401).json({ message: 'Inicio de sesión fallido' });
            }
            res.status(200).json({ message: 'Inicio de sesión correcto', auth_token: token});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al iniciar sesión' });
        }
    });

router.route('/usersByRegistrationDate')
    /**
     * @route POST /usersByRegistrationDate
     * Endpoint para obtener usuarios por fecha de registro.
     * Endpoint to get users by registration date.
     * 
     * @param {string} req.body.startDate - La fecha de inicio del rango de búsqueda. | The start date of the search range.
     * @param {string} req.body.endDate - La fecha de fin del rango de búsqueda. | The end date of the search range.
     * @returns {Array} 200 - Un array de usuarios que se registraron dentro del rango de fechas proporcionado. | An array of users who registered within the provided date range.
     * @returns {Error} 500 - Error interno del servidor al obtener los usuarios por fecha de registro. | Internal server error when getting users by registration date.
     */
    .post(isAdmin, async (req, res) => {
        const { startDate, endDate } = req.body;
        try {
            const users = await getUsersByRegistrationDate(startDate, endDate);
            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener los usuarios por fecha de registro' });
        }
    });

router.route('/info')
    /**
     * @route POST /info
     * Endpoint para obtener la información de un usuario.
     * Endpoint to get a user's information.
     * 
     * @param {string} req.user.userId - El ID del usuario cuya información se quiere obtener. | The ID of the user whose information is to be obtained.
     * @returns {Object} 200 - La información del usuario. | The user's information.
     * @returns {Object} 404 - Error cuando el usuario no se encuentra. | Error when the user is not found.
     * @returns {Error} 500 - Error interno del servidor al obtener la información del usuario. | Internal server error when getting the user's information.
     */
    .post(async (req, res) => {
        const userId = req.user.userId;
        try {
            const user = await getUserById(userId);
            if (!user) {
                 res.status(404).json({ message: 'Usuario no encontrado' });
            }
             res.status(200).json(user); 
        } catch (error) {
            console.log(error);
            if (!res.headersSent) {
                 res.status(500).json({ message: 'Error al obtener el usuario' });
            }
        }
    });

router.route('/resetPasswordCode')
    /**
     * @route POST /resetPassword
     * Endpoint para restablecer la contraseña de un usuario.
     * Endpoint to reset a user's password.
     * 
     * @param {string} req.body.email - El correo electrónico del usuario que quiere restablecer su contraseña. | The email of the user who wants to reset their password.
     * @returns {Object} 200 - La respuesta del proceso de restablecimiento de contraseña. | The response from the password reset process.
     * @returns {Object} 404 - Error cuando el usuario no se encuentra. | Error when the user is not found.
     * @returns {Error} 500 - Error interno del servidor al restablecer la contraseña del usuario. | Internal server error when resetting the user's password.
     */
    .post(async (req, res) => {
        const email = req.body.email;
        try {
            const response = await resetPasswordCode(email);
            if(response)
                res.status(200).json({ message: 'Código de reseteo de contraseña enviado correctamente' });
            else
                res.status(404).json({ message: 'Usuario no encontrado' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener el código de reseteo de contraseña' });
        }
    });


router.route('/verifyPasswordResetCode')
    .post(async (req, res) => {
        const code = req.body.code;
        const email = req.body.email;
        try {
            const isValid = await verifyPasswordResetCode(email, code);

            if (isValid) {
                 res.status(200).json({ message: 'Código de reseteo de contraseña válido' });
            }
             res.status(400).json({ message: 'Código de reseteo de contraseña inválido' });

        } catch (error) {
            console.log(error);
             res.status(500).json({ message: 'Error al verificar el código de reseteo de contraseña' });
        }
    });

router.route('/resetPassword')
    /**
     * @route POST /resetPassword
     * Endpoint para restablecer la contraseña de un usuario.
     * Endpoint to reset a user's password.
     * 
     * @param {string} req.body.email - El correo electrónico del usuario que quiere restablecer su contraseña. | The email of the user who wants to reset their password.
     * @param {string} req.body.code - El código de restablecimiento de contraseña. | The password reset code.
     * @param {string} req.body.currentPassword - La contraseña actual del usuario. | The current password of the user.
     * @param {string} req.body.newPassword - La nueva contraseña del usuario. | The new password of the user.
     * @param {string} req.body.confirmPassword - La confirmación de la nueva contraseña del usuario. | The confirmation of the new password of the user.
     * @returns {Object} 200 - La respuesta del proceso de restablecimiento de contraseña. | The response from the password reset process.
     * @returns {Object} 404 - Error cuando el usuario no se encuentra. | Error when the user is not found.
     * @returns {Error} 500 - Error interno del servidor al restablecer la contraseña del usuario. | Internal server error when resetting the user's password.
     */
    .post(async (req, res) => {
        const { email, code, currentPassword, newPassword, confirmPassword } = req.body;
        try {
            const response = await changePassword(email, code, currentPassword, newPassword, confirmPassword);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
             res.status(500).json({ message: 'Error al restablecer la contraseña del usuario' });
        }
    });

router.route('/changePasswordUser')
    .post(async (req, res) => {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        try {
            const message = await changePasswordUser(req.user.userId, oldPassword, newPassword, confirmPassword);
            if(!message)
                res.status(200).json({ message: 'Contraseña cambiada correctamente' });
            else{
                console.log(message);
                res.status(500).json({ message: message });
            }
            
        } catch (error) {
             res.status(500).json({ message: "Ha ocurrido un error al cambiar la contraseña" });
        }
    });
    
router.route('/generalPanelInfo')
    .post(async (req, res) => {
        try {
            const response = await getGeneralPanelInfo();
             res.status(200).json(response);
        } catch (error) {
            console.log(error);
             res.status(500).json({ message: 'Error al obtener la información general del panel' });
        }
    });


module.exports = router;