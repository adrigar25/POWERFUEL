const e = require('express');
const { UserAddress } = require('../../model');
const errorDisplay = "(Error en el modelo de Address)";

class model {
    /**
     * Obtiene todas las direcciones de los usuarios.
     * Gets all addresses from users.
     * 
     * @returns {Promise<Array>} Un array de objetos de direcciones. | An array of address objects.
     * @throws {Error} Si ocurre un error al intentar obtener las direcciones. | If an error occurs trying to get the addresses.
     */
    getAddresses = async () => {
        try {
            return await UserAddress.findAll();
        } catch (error) {
            console.log(`Error al intentar obtener todas las direcciones ${errorDisplay}`, error);
        }
    };
    
    /**
     * Obtiene una dirección específica por su ID.
     * Gets a specific address by its ID.
     * 
     * @param {number} AddressId - El ID de la dirección que se quiere obtener. | The ID of the address to get.
     * @returns {Promise<Object>} Un objeto de dirección. | An address object.
     * @throws {Error} Si ocurre un error al intentar obtener la dirección. | If an error occurs trying to get the address.
     */
    getAddress = async (AddressId) => {
        try {
            return await UserAddress.findByPk(AddressId);
        } catch (error) {
            console.log(`Error al intentar obtener la dirección por ID ${errorDisplay}`, error);
        }
    };

    /**
     * Obtiene todas las direcciones de un usuario específico.
     * Gets all addresses from a specific user.
     * 
     * @param {number} userId - El ID del usuario cuyas direcciones se quieren obtener. | The ID of the user whose addresses are to be obtained.
     * @returns {Promise<Array>} Un array de objetos de direcciones. | An array of address objects.
     * @throws {Error} Si ocurre un error al intentar obtener las direcciones. | If an error occurs trying to get the addresses.
     */
    getAddressesByUserId = async (userId) => {
        try {
            return await UserAddress.findAll({
                where: {
                    user_id: userId
                }
            });
        } catch (error) {
            console.log(`Error al intentar obtener las direcciones por ID de usuario ${errorDisplay}`, error);
        }
    };
    
    /**
     * Inserta una nueva dirección para un usuario.
     * Inserts a new address for a user.
     * 
     * @param {Object} address - El objeto de dirección que se quiere insertar. | The address object to be inserted.
     * @returns {Promise<Object|null>} El objeto de dirección insertado, o null si no se proporcionó una dirección. | The inserted address object, or null if no address was provided.
     * @throws {Error} Si ocurre un error al intentar insertar la dirección. | If an error occurs trying to insert the address.
     */
    insertAddress = async (address) => {
        
        try {
            if (!address) {
                return null;
            }
            const existingAddresses = await UserAddress.findAll({
                where: {
                    user_id: address.user_id
                }
            });
    
            if (existingAddresses.length === 0) {
                address.is_default = "1";
            }else{
                address.is_default = "0";
            }


            return await UserAddress.create(address);

        } catch (error) {
            console.log(error);
            console.log(`Error al intentar insertar la dirección ${errorDisplay}`, error);
        }
    };

    /**
     * Actualiza una dirección existente.
     * Updates an existing address.
     * 
     * @param {number} addressId - El ID de la dirección que se quiere actualizar. | The ID of the address to be updated.
     * @param {Object} editedAddress - El objeto de dirección con los datos actualizados. | The address object with the updated data.
     * @returns {Promise<Object|null>} El objeto de dirección actualizado, o null si no se encontró la dirección. | The updated address object, or null if the address was not found.
     * @throws {Error} Si ocurre un error al intentar actualizar la dirección. | If an error occurs trying to update the address.
     */
    updateAddress = async (addressId, editedAddress) => {
        try {
            const updatedaddress = await UserAddress.findByPk(addressId);
            if (updatedaddress) {
                await UserAddress.update(editedAddress, {
                    where: {
                        address_id: addressId
                    }
                });
                return updatedaddress;
            }
            return null;
        } catch (error) {
            console.log(`Error al intentar actualizar la dirección ${errorDisplay}`, error);
        }
    };
    
    /**
     * Elimina una dirección existente.
     * Deletes an existing address.
     * 
     * @param {number} addressId - El ID de la dirección que se quiere eliminar. | The ID of the address to be deleted.
     * @returns {Promise<boolean>} Verdadero si la dirección fue eliminada, falso en caso contrario. | True if the address was deleted, false otherwise.
     * @throws {Error} Si ocurre un error al intentar eliminar la dirección. | If an error occurs trying to delete the address.
     */
    deleteAddress = async (addressId) => {
        try {
            if (!addressId) {
                return false;
            }
            const result = await UserAddress.destroy({
                where: {
                    address_id: addressId
                }
            });
            return result > 0;
        } catch (error) {
            console.log(`Error al intentar eliminar la dirección ${errorDisplay}`, error);
        }
    };

    /**
     * Establece una dirección como la dirección por defecto para un usuario.
     * Sets an address as the default address for a user.
     * 
     * @param {number} userId - El ID del usuario para el que se quiere establecer la dirección por defecto. | The ID of the user for whom the default address is to be set.
     * @param {number} addressId - El ID de la dirección que se quiere establecer como por defecto. | The ID of the address to be set as default.
     * @returns {Promise<Object>} El resultado de la operación de actualización. | The result of the update operation.
     * @throws {Error} Si ocurre un error al intentar establecer la dirección por defecto. | If an error occurs trying to set the default address.
     */
    setDefaultAddress = async (userId, addressId) => {
        try{
            await UserAddress.update({ is_default: 0 }, { where: { user_id: userId , is_default: 1} });
            const result= await UserAddress.update({ is_default: 1 }, { where: { address_id: addressId } });
            return result;
        }catch (error) {
            console.log(`Error al intentar establecer la dirección por defecto ${errorDisplay}`, error);
        }
    };
}

module.exports = new model();