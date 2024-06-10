const express = require('express');
const { addAddress, getAddresses, getAddressById, updateAddress, deleteAddressById, getAddressesByUserId, setDefaultAddress } = require('./controller');

const router = express.Router();

router.route('/')
    /**
     * Endpoint para añadir una nueva dirección.
     * Endpoint to add a new address.
     * 
     * @route POST /
     * @param {Object} req.body - El objeto con los datos de la nueva dirección. | The object with the new address data.
     * @returns {Object} 201 - El objeto de la dirección añadida. | The added address object.
     * @returns {Error} 500 - Error al añadir la dirección. | Error when adding the address.
     */
    .post(async(req, res) => {
        try{
            const newAddress = req.body;
            newAddress.user_id = req.user.userId;
            const address = await addAddress(newAddress);
            res.status(201).json({ message: 'Dirección añadida correctamente', address });
        }catch(error){
            res.status(500).json({ message: 'Error al añadir la dirección' });
        }
    })
    /**
     * Endpoint para obtener todas las direcciones.
     * Endpoint to get all addresses.
     * 
     * @route GET /
     * @returns {Array} 200 - Un array con todos los objetos de dirección. | An array with all the address objects.
     * @returns {Error} 404 - Dirección no encontrada. | Address not found.
     * @returns {Error} 500 - Error al obtener las direcciones. | Error when getting the addresses.
     */
    .get(async(req, res) => {
        try{
            const address = await getAddresses();
            if (!address) {
                return res.status(404);
            }
            res.status(200).json(address);
        }catch(error){
            res.status(500);
        }
    });

router.route('/:addressId')
    /**
     * Endpoint para obtener una dirección por su ID.
     * Endpoint to get an address by its ID.
     * 
     * @route GET /:addressId
     * @param {number} req.params.addressId - El ID de la dirección que se quiere obtener. | The ID of the address to be obtained.
     * @returns {Object} 200 - El objeto de la dirección obtenida. | The obtained address object.
     * @returns {Error} 404 - Dirección no encontrada. | Address not found.
     * @returns {Error} 500 - Error al obtener la dirección. | Error when getting the address.
     */
    .get(async(req, res) => {
        try{
            const address = await getAddressById(req.params.addressId);
            if (!address) {
                return res.status(404).json({ message: 'Dirección no encontrada' });
            }
            res.status(200).json(address);
        }catch(error){
            res.status(500).json({ message: 'Error al obtener la dirección' });
        }
    })
    /**
     * Endpoint para actualizar una dirección por su ID.
     * Endpoint to update an address by its ID.
     * 
     * @route PUT /:addressId
     * @param {number} req.params.addressId - El ID de la dirección que se quiere actualizar. | The ID of the address to be updated.
     * @param {Object} req.body - El objeto con los datos actualizados de la dirección. | The object with the updated address data.
     * @returns {Object} 200 - Mensaje de éxito. | Success message.
     * @returns {Error} 500 - Error al actualizar la dirección. | Error when updating the address.
     */
    .put(async(req, res) => {
        try{
            const address = await updateAddress(req.params.addressId, req.body);
            res.status(200).json({ message: 'Dirección modificada correctamente' });
        }catch(error){
            res.status(500).json({ message: 'Error al modificar la dirección' });
        }
    })
    /**
     * Endpoint para eliminar una dirección por su ID.
     * Endpoint to delete an address by its ID.
     * 
     * @route DELETE /:addressId
     * @param {number} req.params.addressId - El ID de la dirección que se quiere eliminar. | The ID of the address to be deleted.
     * @returns {Object} 200 - Mensaje de éxito. | Success message.
     * @returns {Error} 404 - Dirección no encontrada. | Address not found.
     * @returns {Error} 500 - Error al eliminar la dirección. | Error when deleting the address.
     */
    .delete(async(req, res) => {
        try{
            const deletedAddress = await deleteAddressById(req.params.addressId);
            if (!deletedAddress) {
                return res.status(404).json({ message: 'Dirección no encontrada' });
            }
            res.status(200).json({ message: 'Dirección eliminada correctamente' });
        }catch(error){
            res.status(500).json({ message: 'Error al eliminar la dirección' });
        }
    });


router.route('/default/:addressId')
    /**
     * Endpoint para establecer una dirección como la dirección por defecto de un usuario.
     * Endpoint to set an address as the default address of a user.
     * 
     * @route PUT /default/:addressId
     * @param {number} req.params.addressId - El ID de la dirección que se quiere establecer como por defecto. | The ID of the address to be set as default.
     * @param {number} req.user.userId - El ID del usuario que quiere establecer la dirección por defecto. | The ID of the user who wants to set the default address.
     * @returns {Object} 200 - Mensaje de éxito. | Success message.
     * @returns {Error} 500 - Error al establecer la dirección por defecto. | Error when setting the default address.
     */
    .put(async(req, res) => {
        try {
            const addressId = req.params.addressId;
            const userId = req.user.userId;
            await setDefaultAddress(userId, addressId);
            res.status(200).json({ message: 'Dirección predeterminada establecida correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al establecer la dirección por defecto' });
        }
    });

router.route('/user/:userId')
    /**
     * Endpoint para obtener todas las direcciones de un usuario por su ID.
     * Endpoint to get all addresses of a user by their ID.
     * 
     * @route GET /user/:userId
     * @param {number} req.params.userId - El ID del usuario del que se quieren obtener las direcciones. Si es "null", se usa el ID del usuario actual. | The ID of the user whose addresses are to be obtained. If it's "null", the current user's ID is used.
     * @returns {Object} 200 - Un objeto con un array de las direcciones del usuario. | An object with an array of the user's addresses.
     * @returns {Error} 500 - Error al obtener las direcciones del usuario. | Error when getting the user's addresses.
     */
    .get(async(req, res) => {
        try {
            const userId = req.params.userId==="null"?req.user.userId:req.params.userId;
            const addresses = await getAddressesByUserId(userId);
            res.status(200).json({addresses});
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las direcciones del usuario' });
        }
    });

module.exports = router;