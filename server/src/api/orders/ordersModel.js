const { Order } = require('../../model');
const { Op } = require('sequelize');
const errorDisplay = "(Error en el modelo de Orders)";

class OrderModel {
    /**
     * Función para obtener todas las órdenes de un usuario específico.
     * Function to get all orders from a specific user.
     * 
     * @param {string} userId - El ID del usuario cuyas órdenes se quieren obtener. | The ID of the user whose orders are to be obtained.
     * @returns {Promise<Object[]>} - Una promesa que se resuelve en un array de objetos de órdenes. | A promise that resolves into an array of order objects.
     * @throws {Error} - Lanza un error si hay un problema al obtener las órdenes del usuario. | Throws an error if there is a problem getting the user's orders.
     */
    getOrdersByUser = async (userId) => {
        try {
            return await Order.findAll({
                where: { user_id: userId }
            });
        } catch (error) {
            console.log(`Error al obtener los pedidos del usuario ${errorDisplay}`, error);
        }
    };

    /**
     * Función para obtener una orden específica por su ID.
     * Function to get a specific order by its ID.
     * 
     * @param {string} orderId - El ID de la orden que se quiere obtener. | The ID of the order to be obtained.
     * @returns {Promise<Object>} - Una promesa que se resuelve en un objeto de orden. | A promise that resolves into an order object.
     * @throws {Error} - Lanza un error si hay un problema al obtener la orden por ID. | Throws an error if there is a problem getting the order by ID.
     */
    getOrderById = async (orderId) => {
        try {
            return await Order.findOne({
                where: { order_id: orderId }
            });
        } catch (error) {
            console.log(`Error al obtener el pedido por ID ${errorDisplay}`, error);
        }
    };

    /**
     * Función para crear una nueva orden.
     * Function to create a new order.
     * 
     * @param {Object} orderData - Los datos de la nueva orden. | The data for the new order.
     * @returns {Promise<Object>} - Una promesa que se resuelve en un objeto de orden. | A promise that resolves into an order object.
     * @throws {Error} - Lanza un error si hay un problema al crear la orden. | Throws an error if there is a problem creating the order.
     */
    createOrder = async (orderData) => {
        try {
            return await Order.create(orderData);
        } catch (error) {
            console.log(`Error al crear el pedido ${errorDisplay}`, error);
        }
    };

    /**
     * Función para actualizar una orden existente.
     * Function to update an existing order.
     * 
     * @param {string} orderId - El ID de la orden que se quiere actualizar. | The ID of the order to be updated.
     * @param {Object} orderData - Los nuevos datos de la orden. | The new data for the order.
     * @returns {Promise<Object>} - Una promesa que se resuelve en un objeto de orden actualizado. | A promise that resolves into an updated order object.
     * @throws {Error} - Lanza un error si hay un problema al actualizar la orden. | Throws an error if there is a problem updating the order.
     */
    updateOrder = async (orderId, orderData) => {
        try {
            orderData.shipping_address = JSON.stringify(orderData.shipping_address);
            return await Order.update(orderData, {
                where: { order_id: orderId }
            });
        } catch (error) {
            console.log(`Error al actualizar el pedido ${errorDisplay}`, error);
        }
    };

    /**
     * Función para eliminar una orden existente.
     * Function to delete an existing order.
     * 
     * @param {string} orderId - El ID de la orden que se quiere eliminar. | The ID of the order to be deleted.
     * @returns {Promise<boolean>} - Una promesa que se resuelve en un booleano que indica si la orden fue eliminada (true) o no (false). | A promise that resolves into a boolean indicating whether the order was deleted (true) or not (false).
     * @throws {Error} - Lanza un error si hay un problema al eliminar la orden. | Throws an error if there is a problem deleting the order.
     */
    deleteOrder = async (orderId) => {
        try {
            const result = await Order.destroy({
                where: { order_id: orderId }
            });
            return result > 0;
        } catch (error) {
            console.log(`Error al eliminar el pedido ${errorDisplay}`, error);
        }
    };

    /**
     * Función para obtener el conteo total de órdenes.
     * Function to get the total count of orders.
     * 
     * @returns {Promise<number>} - Una promesa que se resuelve en el número total de órdenes. | A promise that resolves into the total number of orders.
     * @throws {Error} - Lanza un error si hay un problema al obtener el conteo de órdenes. | Throws an error if there is a problem getting the count of orders.
     */
    getOrdersCount = async () => {
        try {
            return await Order.count();
        } catch (error) {
            console.log(`Error al obtener el conteo de pedidos ${errorDisplay}`, error);
        }
    };

    /**
     * Función para obtener las órdenes entre dos fechas.
     * Function to get orders between two dates.
     * 
     * @param {string} startDate - La fecha de inicio del rango de búsqueda. | The start date of the search range.
     * @param {string} endDate - La fecha de fin del rango de búsqueda. | The end date of the search range.
     * @returns {Promise<Object[]>} - Una promesa que se resuelve en un array de objetos de órdenes ordenadas por fecha de forma ascendente. | A promise that resolves into an array of order objects sorted by date in ascending order.
     * @throws {Error} - Lanza un error si hay un problema al obtener las órdenes por fecha. | Throws an error if there is a problem getting orders by date.
     */
    getOrdersByDate = async (startDate, endDate) => {
        try {
            let whereCondition = {};
            if(startDate && endDate && !isNaN(new Date(startDate)) && !isNaN(new Date(endDate))) {
                whereCondition.order_date = {
                    [Op.between]: [startDate, endDate]
                };
            }
    
            let orders = await Order.findAll({
                where: whereCondition,
                order: [
                    ['order_date', 'ASC']
                ]
            });
    
            return orders;
        } catch (error) {
            console.log(`Error al obtener los pedidos por fecha ${errorDisplay}`, error);
        }
    };


    /**
     * Función para obtener todas las órdenes con paginación.
     * Function to get all orders with pagination.
     * 
     * @param {number} skip - El número de órdenes a saltar. | The number of orders to skip.
     * @param {number} limit - El límite de órdenes por página. | The limit of orders per page.
     * @param {string} orderId - El ID de la orden que se quiere obtener. | The ID of the order to be obtained.
     * @returns {Promise<Object[]>} - Una promesa que se resuelve en un array de objetos de órdenes. | A promise that resolves into an array of order objects.
     * @throws {Error} - Lanza un error si hay un problema al obtener las órdenes. | Throws an error if there is a problem getting the orders.
     */
    getAllOrders = async (skip = 0, limit = 10, orderId) => {
        try {
            skip = parseInt(skip);
            limit = parseInt(limit);
            const orders = await Order.findAll({
                where: orderId ? { order_id: orderId } : {},
                offset: skip,
                limit: limit,
                subQuery: false
            });
            return orders;
        } catch (error) {
            console.log(`Error al obtener los pedidos ${errorDisplay}`, error);
        }
    };

    /**
     * Función para obtener el conteo de órdenes por semana.
     * Function to get the count of orders by week.
     * 
     * @param {string} startDate - La fecha de inicio de la semana. | The start date of the week.
     * @param {string} endDate - La fecha de fin de la semana. | The end date of the week.
     * @returns {Promise<number>} - Una promesa que se resuelve en el número de órdenes en la semana especificada. | A promise that resolves into the number of orders in the specified week.
     * @throws {Error} - Lanza un error si hay un problema al obtener el conteo de pedidos por semana. | Throws an error if there is a problem getting the count of orders by week.
     *  
     */
    getCountOrdersWeek = async (startDate, endDate) => {
        try{
            return await Order.count({
                where: {
                    order_date: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            });
        }catch (error) {
            console.log(`Error al obtener el conteo de pedidos por semana ${errorDisplay}`, error);
        }
    }

    /**
     * Función para obtener el conteo de órdenes por estado.
     * Function to get the count of orders by status.
     * 
     * @param {string} status - El estado de la orden. | The status of the order.
     * @returns {Promise<number>} - Una promesa que se resuelve en el número de órdenes con el estado especificado. | A promise that resolves into the number of orders with the specified status.
     * @throws {Error} - Lanza un error si hay un problema al obtener el conteo de pedidos por estado. | Throws an error if there is a problem getting the count of orders by status.
     */
    getCountStatusOrder = async (status) => {
        try{
            return await Order.count({
                where: {
                    status: status
                }
            });
        }catch (error) {
            console.log(`Error al obtener el conteo de pedidos por estado ${errorDisplay}`, error);
        }
    }

    /**
     * Función para cancelar un pedido existente.
     * Function to cancel an existing order.
     * 
     * @param {string} orderId - El ID del pedido que se desea cancelar. | The ID of the order to be canceled.
     * @returns {Promise<boolean>} - Una promesa que se resuelve en un booleano que indica si el pedido fue cancelado (true) o no (false). | A promise that resolves into a boolean indicating whether the order was canceled (true) or not (false).
     * @throws {Error} - Lanza un error si hay un problema al cancelar el pedido. | Throws an error if there is a problem canceling the order.
     */
    cancelOrder = async (orderId) => {
        try {
            const result = await Order.update({ status: 'cancelado' }, {
                where: { order_id: orderId }
            });
            return result > 0;
        } catch (error) {
            console.log(`Error al cancelar el pedido ${errorDisplay}`, error);
        }
    };

    /**
     * Función para devolver una orden existente.
     * Function to return an existing order.
     * 
     * @param {string} orderId - El ID de la orden que se desea devolver. | The ID of the order to be returned.
     * @returns {Promise<boolean>} - Una promesa que se resuelve en un booleano que indica si la orden fue devuelta (true) o no (false). | A promise that resolves into a boolean indicating whether the order was returned (true) or not (false).
     * @throws {Error} - Lanza un error si hay un problema al devolver la orden. | Throws an error if there is a problem returning the order.
     */
    returnOrder = async (orderId) => {
        try {
            console.log('orderId', orderId);
            const result = await Order.update({ status: 'en proceso de devolucion' }, {
                where: { order_id: orderId }
            });
            return result > 0;
        } catch (error) {
            console.log(`Error al devolver la orden ${errorDisplay}`, error);
        }
    };
    
}

module.exports = new OrderModel();