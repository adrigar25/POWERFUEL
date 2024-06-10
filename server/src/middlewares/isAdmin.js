const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {getRoleByUserId} = require('../api/roles/controller');
const errorDisplay = "(Error en isAdmin)";

/**
 * Middleware para verificar si el usuario es administrador.
 * Middleware to check if the user is an administrator.
 * 
 * @param {Object} req - El objeto de solicitud HTTP. | The HTTP request object.
 * @param {Object} res - El objeto de respuesta HTTP. | The HTTP response object.
 * @param {Function} next - La función de callback para pasar al siguiente middleware. | The callback function to pass to the next middleware.
 */
const isAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
        
            if (!user || !user.userId) {
                return res.sendStatus(403);
            }
        
            const {userId} = user;
            try {
                const {role_id} = await fetchRole(userId);
        
                if (role_id !== 10) {
                    next();
                } else {
                    res.status(403).json({ message: 'Unauthorized' });
                }
            } catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    } else {
        res.sendStatus(401);
    }
};

/**
 * Función para obtener el rol de un usuario por su ID.
 * Function to get a user's role by their ID.
 * 
 * @param {string} userId - El ID del usuario. | The user's ID.
 * @returns {Object} El rol del usuario. | The user's role.
 * @throws {Error} Si hay un error al obtener el rol del usuario. | If there is an error getting the user's role.
 */
const fetchRole = async (userId) => {
    try {
        const role = await getRoleByUserId(userId);
        return role;
    } catch (error) {
        console.log(`Error al obtener el rol del usuario ${errorDisplay}`, error);
    }
};

module.exports = isAdmin;