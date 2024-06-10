const express = require('express');
const { getRoles, getRoleById, addRole, updateRoleById, deleteRoleById, getRoleByUserId, getAllRoles } = require('./controller');

const router = express.Router();

router.route('/')
    /**
     * @route POST /
     * Endpoint para añadir un nuevo rol.
     * Endpoint to add a new role.
     * 
     * @param {string} req.body.role_name - El nombre del rol a añadir. | The name of the role to add.
     * @returns {Object} 200 - El rol añadido. | The added role.
     * @returns {Object} 400 - Error al añadir el rol. | Error when adding the role.
     * @returns {Error} 500 - Error al añadir el rol. | Error when adding the role.
     */
    .post(async (req, res) => {
        try {
            if (!req.body.role_name) {
                return res.status(400).json({ message: 'El nombre del rol es requerido' });
            }
            const role = await addRole(req.body.role_name);
            if (!role) {
                return res.status(400).json({ message: 'Error al añadir el rol'});
            }
            res.status(200).json({role,  message: 'Rol añadido correctamente' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al añadir el rol' });
        }
    })
    /**
     * @route GET /
     * Endpoint para obtener roles.
     * Endpoint to get roles.
     * 
     * @param {number} req.query.limit - El límite de roles por página. | The limit of roles per page.
     * @param {number} req.query.page - La página de roles a obtener. | The page of roles to get.
     * @returns {Object} 200 - Los roles obtenidos. | The obtained roles.
     * @returns {Error} 500 - Error al obtener los roles. | Error when getting the roles.
     */
    .get(async (req, res) => {
        try {
            const roles = await getRoles(req.query.limit, req.query.page);
            res.status(200).json(roles);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener los roles' });
        }
    });

router.route('/allRoles')
    .get(async (req, res) => {
        try {
            const roles = await getAllRoles();
            res.status(200).json(roles);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener los roles' });
        }
    });

router.route('/:roleId')
    /**
     * @route DELETE /:roleId
     * Endpoint para eliminar un rol por su ID.
     * Endpoint to delete a role by its ID.
     * 
     * @param {string} req.params.roleId - El ID del rol a eliminar. | The ID of the role to delete.
     * @returns {Object} 200 - Mensaje de éxito al eliminar el rol. | Success message when deleting the role.
     * @returns {Object} 404 - Rol no encontrado. | Role not found.
     * @returns {Error} 500 - Error al borrar el rol. | Error when deleting the role.
     */
    .delete(async (req, res) => {
        try {
            const deletedRole = await deleteRoleById(req.params.roleId);
            if (!deletedRole) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            res.status(200).json({ message: 'Rol eliminado correctamente' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al borrar el rol' });
        }
    })
    /**
     * @route PUT /:roleId
     * Endpoint para actualizar un rol por su ID.
     * Endpoint to update a role by its ID.
     * 
     * @param {string} req.params.roleId - El ID del rol a actualizar. | The ID of the role to update.
     * @param {string} req.body.role_name - El nuevo nombre del rol. | The new name of the role.
     * @returns {Object} 200 - Mensaje de éxito al actualizar el rol. | Success message when updating the role.
     * @returns {Object} 404 - Rol no encontrado. | Role not found.
     * @returns {Error} 500 - Error al actualizar el rol. | Error when updating the role.
     */
    .put(async (req, res) => {
        try {
            const roleId = req.params.roleId;
            const role_name = req.body.role_name;
            const role = await updateRoleById(roleId, role_name);
            if (!role) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            res.status(200).json({ message: 'Rol modificado correctamente' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al modificar el rol' });
        }
    })
    /**
     * @route GET /:roleId
     * Endpoint para obtener un rol por su ID.
     * Endpoint to get a role by its ID.
     * 
     * @param {string} req.params.roleId - El ID del rol a obtener. | The ID of the role to get.
     * @returns {Object} 200 - El rol obtenido. | The obtained role.
     * @returns {Object} 404 - Rol no encontrado. | Role not found.
     * @returns {Error} 500 - Error al obtener el rol. | Error when getting the role.
     */
    .get(async (req, res) => {
        try {
                const roleId = req.params.roleId;
            const response = await getRoleById(roleId);
            if (response === null) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    });

router.route('/user/:userId')
    /**
     * @route GET /user/:userId
     * Endpoint para obtener el rol de un usuario por su ID.
     * Endpoint to get a user's role by their ID.
     * 
     * @param {string} req.params.userId - El ID del usuario para obtener su rol. | The ID of the user to get their role.
     * @returns {Object} 200 - El rol del usuario. | The user's role.
     * @returns {Object} 404 - Rol no encontrado para este usuario. | Role not found for this user.
     * @returns {Error} 500 - Error al obtener el rol del usuario. | Error when getting the user's role.
     */
    .get(async (req, res) => {
        try {
            const role = await getRoleByUserId(req.params.userId);
            if (!role) {
                return res.status(404).json({ message: 'Rol no encontrado para este usuario' });
            }
            res.status(200).json(role);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener el rol del usuario' });
        }
    });

router.route('/user')
    /**
     * @route POST /user
     * Endpoint para obtener el rol del usuario actual.
     * Endpoint to get the current user's role.
     * 
     * @param {string} req.user.userId - El ID del usuario actual para obtener su rol. | The ID of the current user to get their role.
     * @returns {Object} 200 - El rol del usuario. | The user's role.
     * @returns {Object} 404 - Rol no encontrado para este usuario. | Role not found for this user.
     * @returns {Error} 500 - Error al obtener el rol del usuario. | Error when getting the user's role.
     */
    .post(async (req, res) => {
        try {
            const role = await getRoleByUserId(req.user.userId);
            if (!role) {
                return res.status(404).json({ message: 'Rol no encontrado para este usuario' });
            }
            res.status(200).json(role);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener el rol del usuario' });
        }
    });

module.exports = router;