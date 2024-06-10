const { Role, UserRoles } = require('../../model');
const errorDisplay = "(Error en el modelo de Role)";

class Model {
    /**
     * Función para insertar un nuevo rol en la base de datos.
     * Function to insert a new role into the database.
     * 
     * @param {Object} role - El objeto rol a insertar. | The role object to insert.
     * @param {string} role.role_name - El nombre del rol. | The name of the role.
     * @returns {string} - El ID del rol insertado. | The ID of the inserted role.
     * @throws {Error} - Error al insertar el rol. | Error when inserting the role.
     */
    insertRole = async (role_name) => {
        try {
            const newRole = await Role.create({
                role_name: role_name
            });
            return newRole.role_id;
        } catch (error) {
            console.log(`Error al insertar el rol ${errorDisplay}`, error);
        }
    };

    /**
     * Función para actualizar un rol en la base de datos.
     * Function to update a role in the database.
     * 
     * @param {string} roleId - El ID del rol a actualizar. | The ID of the role to update.
     * @param {Object} role - El objeto rol con los nuevos datos. | The role object with the new data.
     * @param {string} role.role_name - El nuevo nombre del rol. | The new name of the role.
     * @returns {Promise} - Promesa que resuelve al actualizar el rol. | Promise that resolves when updating the role.
     * @throws {Error} - Error al actualizar el rol. | Error when updating the role.
     */
    updateRole = async (roleId, role_name) => {
        try {
            return await Role.update({
                role_name: role_name
            }, {
                where: {
                    role_id: roleId
                }
            });
        } catch (error) {
            console.log(`Error al actualizar el rol ${errorDisplay}`, error);
        }
    };
    
    /**
     * Función para eliminar un rol en la base de datos.
     * Function to delete a role in the database.
     * 
     * @param {string} roleId - El ID del rol a eliminar. | The ID of the role to delete.
     * @returns {Promise} - Promesa que resuelve al eliminar el rol. | Promise that resolves when deleting the role.
     * @throws {Error} - Error al eliminar el rol. | Error when deleting the role.
     */
    deleteRole = async (roleId) => {
        try {
            return await Role.destroy({
                where: {
                    role_id: roleId
                }
            });
        } catch (error) {
            console.log(`Error al eliminar el rol ${errorDisplay}`, error);
        }
    }; 

    /**
     * Función para obtener roles de la base de datos.
     * Function to get roles from the database.
     * 
     * @param {string} id - El ID del rol a obtener. Si no se proporciona, se obtendrán varios roles. | The ID of the role to get. If not provided, multiple roles will be fetched.
     * @param {number} skip - El número de roles a omitir en la consulta. | The number of roles to skip in the query.
     * @param {number} limit - El número máximo de roles a obtener. | The maximum number of roles to fetch.
     * @returns {Array} - Un array de roles. Si se proporciona un ID, el array contendrá un solo rol. | An array of roles. If an ID is provided, the array will contain a single role.
     * @throws {Error} - Error al obtener los roles. | Error when getting the roles.
     */
    getRoles = async (id, skip = 0, limit = 10 ) => {
        try {
            if (id) {
                return [await Role.findByPk(id)];
            } else {
                return await Role.findAll({
                    offset: skip,
                    limit: limit
                });
            }
        } catch (error) {
            console.log(`Error al obtener los roles ${errorDisplay}`, error);
        }
    };
    
    /**
     * Función para obtener el conteo de roles en la base de datos.
     * Function to get the count of roles in the database.
     * 
     * @returns {number} - El número total de roles en la base de datos. | The total number of roles in the database.
     * @throws {Error} - Error al obtener el conteo de roles. | Error when getting the count of roles.
     */
    getRolesCount = async () => {
        try {
            return await Role.count();
        } catch (error) {
            console.log(`Error al obtener el conteo de roles ${errorDisplay}`, error);
        }
    };
    
    /**
     * Función para obtener el rol de un usuario por su ID de usuario.
     * Function to get a user's role by their user ID.
     * 
     * @param {string} userId - El ID del usuario para obtener su rol. | The ID of the user to get their role.
     * @returns {Object} - El rol del usuario. | The user's role.
     * @throws {Error} - Error al obtener el rol por ID de usuario. | Error when getting the role by user ID.
     */
    getRoleByUserId = async (userId) => {
        try {
            return await UserRoles.findOne({
                where: {
                    user_id: userId
                },
                include: Role
            });
        } catch (error) {
            console.log(`Error al obtener el rol por ID de usuario ${errorDisplay}`, error);
        }
    };

    getAllRoles = async () => {
        try {
            return await Role.findAll();
        } catch (error) {
            console.log(`Error al obtener todos los roles ${errorDisplay}`, error);
        }
    };
}

module.exports = new Model();
