const model = require('./roleModel');
const errorDisplay = "(Error en el controlador de Roles)";

/**
 * Función para obtener un rol por su ID.
 * Function to get a role by its ID.
 * 
 * @param {string} roleId - El ID del rol a obtener. | The ID of the role to get.
 * @returns {Object} - El rol obtenido. | The fetched role.
 * @throws {Error} - Error al intentar obtener el rol por ID. | Error when trying to get the role by ID.
 */
const getRoleById = async (roleId) => {
    try {
        let role = await model.getRoles(roleId);
        role =  role.map(role => ({
            "role_id": role.role_id ,
            "role_name": role.role_name ,
        }));

        if (role.length === 0) {
            return null;
        }

        return role[0];
    } catch (error) {
        console.log(`Error al intentar obtener el rol por ID ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener roles con paginación.
 * Function to get roles with pagination.
 * 
 * @param {number} limit - El número máximo de roles a obtener por página. | The maximum number of roles to fetch per page.
 * @param {number} page - La página de roles a obtener. | The page of roles to fetch.
 * @returns {Object} - Un objeto que contiene el total de roles, el total de páginas y los roles de la página actual. | An object containing the total number of roles, the total number of pages, and the roles for the current page.
 * @throws {Error} - Error al intentar obtener los roles. | Error when trying to get the roles.
 */
const getRoles = async (limit, page) => {
    try {
        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);
        const skip = (parsedPage - 1) * parsedLimit;

        let roles = await model.getRoles(null, skip, parsedLimit);
        
        const total = await model.getRolesCount();

        return {
            total,
            pages: Math.ceil(total / limit),
            roles
        };
    } catch (error) {
        console.log(`Error al intentar obtener los roles ${errorDisplay}`, error);
    }
};

/**
 * Función para añadir un nuevo rol.
 * Function to add a new role.
 * 
 * @param {Object} role - El objeto rol a añadir. | The role object to add.
 * @returns {Promise} - Promesa que resuelve al añadir el rol. | Promise that resolves when adding the role.
 * @throws {Error} - Error al intentar añadir el rol. | Error when trying to add the role.
 */
const addRole = async (role) => {
    try {
        return await model.insertRole(role);
    } catch (error) {
        console.log(`Error al intentar añadir el rol ${errorDisplay}`, error);
    }
};

/**
 * Función para actualizar un rol por su ID.
 * Function to update a role by its ID.
 * 
 * @param {string} roleId - El ID del rol a actualizar. | The ID of the role to update.
 * @param {Object} role - El objeto rol con los datos actualizados. | The role object with the updated data.
 * @returns {Promise} - Promesa que resuelve al actualizar el rol. | Promise that resolves when updating the role.
 * @throws {Error} - Error al intentar actualizar el rol. | Error when trying to update the role.
 */
const updateRoleById = async (roleId, role_name) => {
    try {
        return await model.updateRole(roleId, role_name);
    } catch (error) {
        console.log(`Error al intentar actualizar el rol ${errorDisplay}`, error);
    }
};

/**
 * Función para eliminar un rol por su ID.
 * Function to delete a role by its ID.
 * 
 * @param {string} roleId - El ID del rol a eliminar. | The ID of the role to delete.
 * @returns {Promise} - Promesa que resuelve al eliminar el rol. | Promise that resolves when deleting the role.
 * @throws {Error} - Error al intentar eliminar el rol. | Error when trying to delete the role.
 */
const deleteRoleById = async (roleId) => {
    try {
        return await model.deleteRole(roleId);
    } catch (error) {
        console.log(`Error al intentar eliminar el rol ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener un rol por el ID de un usuario.
 * Function to get a role by a user's ID.
 * 
 * @param {string} userId - El ID del usuario para obtener su rol. | The ID of the user to get their role.
 * @returns {Promise} - Promesa que resuelve al obtener el rol del usuario. | Promise that resolves when getting the user's role.
 * @throws {Error} - Error al intentar obtener el rol por ID de usuario. | Error when trying to get the role by user ID.
 */
const getRoleByUserId = async (userId) => {
    try {
        return await model.getRoleByUserId(userId);
    } catch (error) {
        console.log(`Error al intentar obtener el rol por ID de usuario ${errorDisplay}`, error);
    }
};

const getAllRoles = async () => {
    try {
        return await model.getAllRoles();
    } catch (error) {
        console.log(`Error al intentar obtener todos los roles ${errorDisplay}`, error);
    }
};

module.exports = { getRoles, getRoleById, addRole, updateRoleById, deleteRoleById, getRoleByUserId, getAllRoles};