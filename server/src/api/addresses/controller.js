const model = require('./addressModel');
const errorDisplay = "(Error en el controlador de Direcciones)";

/**
 * Agrega una nueva dirección.
 * Adds a new address.
 * 
 * @param {Object} newAddress - El objeto de dirección que se quiere agregar. | The address object to be added.
 * @returns {Promise<Object>} El objeto de dirección agregado. | The added address object.
 * @throws {Error} Si ocurre un error al intentar agregar la dirección. | If an error occurs trying to add the address.
 */
const addAddress = async (newAddress) => {
    try {
        const address = await model.insertAddress(newAddress);
        return address;
    } catch (error) {
        console.log(`Error al intentar agregar la dirección ${errorDisplay}`, error);
    }
};

/**
 * Elimina una dirección por su ID.
 * Deletes an address by its ID.
 * 
 * @param {number} addressId - El ID de la dirección que se quiere eliminar. | The ID of the address to be deleted.
 * @returns {Promise<boolean>} Verdadero si la dirección fue eliminada, falso en caso contrario. | True if the address was deleted, false otherwise.
 * @throws {Error} Si ocurre un error al intentar eliminar la dirección. | If an error occurs trying to delete the address.
 */
const deleteAddressById = async (addressId) => {
    try {
        const deletedAddress = await model.deleteAddress(addressId);
        return deletedAddress;
    } catch (error) {
        console.log(`Error al intentar eliminar la dirección ${errorDisplay}`, error);
    }
};

/**
 * Actualiza una dirección existente.
 * Updates an existing address.
 * 
 * @param {number} addressId - El ID de la dirección que se quiere actualizar. | The ID of the address to be updated.
 * @param {Object} data - El objeto con los datos actualizados de la dirección. | The object with the updated data of the address.
 * @returns {Promise<Object|null>} El objeto de dirección actualizado, o null si no se encontró la dirección. | The updated address object, or null if the address was not found.
 * @throws {Error} Si ocurre un error al intentar actualizar la dirección. | If an error occurs trying to update the address.
 */
const updateAddress = async (addressId, data) => {
    try {
        const address = await model.updateAddress(addressId, data);
        if (!address) {
            console.log('Not found');
        }
        return address;
    } catch (error) {
        console.log(`Error al intentar actualizar la dirección ${errorDisplay}`, error);
    }
};

/**
 * Obtiene una dirección por su ID.
 * Gets an address by its ID.
 * 
 * @param {number} addressId - El ID de la dirección que se quiere obtener. | The ID of the address to be obtained.
 * @returns {Promise<Object|null>} El objeto de dirección obtenido, o null si no se encontró la dirección. | The obtained address object, or null if the address was not found.
 * @throws {Error} Si ocurre un error al intentar obtener la dirección. | If an error occurs trying to get the address.
 */
const getAddressById = async (addressId) => {
    try {
        return await model.getAddress(addressId);
    } catch (error) {
        console.log(`Error al intentar obtener la dirección por ID ${errorDisplay}`, error);
    }
};

/**
 * Obtiene todas las direcciones.
 * Gets all addresses.
 * 
 * @returns {Promise<Array>} Un array con todos los objetos de dirección, o un error si no se encontraron direcciones. | An array with all the address objects, or an error if no addresses were found.
 * @throws {Error} Si ocurre un error al intentar obtener las direcciones. | If an error occurs trying to get the addresses.
 */
const getAddresses = async () => {
    try {
        const addresses = await model.getAddresses();
        if (!addresses) {
            console.log('Not found addresses');
        }
        return addresses;
    } catch (error) {
        console.log(`Error al intentar obtener las direcciones ${errorDisplay}`, error);
    }
};

/**
 * Obtiene todas las direcciones de un usuario por su ID.
 * Gets all addresses of a user by their ID.
 * 
 * @param {number} userId - El ID del usuario cuyas direcciones se quieren obtener. | The ID of the user whose addresses are to be obtained.
 * @returns {Promise<Array>} Un array con todos los objetos de dirección del usuario, o un error si no se encontraron direcciones. | An array with all the user's address objects, or an error if no addresses were found.
 * @throws {Error} Si ocurre un error al intentar obtener las direcciones del usuario. | If an error occurs trying to get the user's addresses.
 */
const getAddressesByUserId = async (userId) => {
    try {
        const addresses = await model.getAddressesByUserId(userId);
        if (!addresses) {
            console.log('Not found');
        }
        return addresses;
    } catch (error) {
        console.log(`Error al intentar obtener las direcciones por ID de usuario ${errorDisplay}`, error);
    }
};

/**
 * Establece una dirección como la dirección por defecto de un usuario.
 * Sets an address as the default address of a user.
 * 
 * @param {number} userId - El ID del usuario que quiere establecer la dirección por defecto. | The ID of the user who wants to set the default address.
 * @param {number} addressId - El ID de la dirección que se quiere establecer como por defecto. | The ID of the address to be set as default.
 * @returns {Promise<Object|null>} El objeto de respuesta, o null si no se encontró la dirección o el usuario. | The response object, or null if the address or user was not found.
 * @throws {Error} Si ocurre un error al intentar establecer la dirección por defecto. | If an error occurs trying to set the default address.
 */
const setDefaultAddress = async (userId, addressId) => {
    try {
        const response = await model.setDefaultAddress(userId, addressId);
        if (!response) {
            console.log('Not found');
        }
        return response;
    } catch (error) {
        console.log(`Error al intentar establecer la dirección por defecto ${errorDisplay}`, error);
    }
};

module.exports = {
    addAddress,
    getAddresses,
    getAddressById,
    getAddressesByUserId,
    updateAddress,
    deleteAddressById,
    setDefaultAddress
};