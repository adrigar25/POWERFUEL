const {insertNotification} = require('../notifications/controller');
const { updateProductStock } = require('../products/controller');
const OrderModel = require('./ordersModel');
const errorDisplay = "(Error en el controlador de Orders)";


/**
 * Función para obtener las órdenes de un usuario específico.
 * Function to get the orders of a specific user.
 * 
 * @param {string} userId - El ID del usuario cuyas órdenes se quieren obtener. | The ID of the user whose orders are to be obtained.
 * @returns {Object[]} - Las órdenes del usuario. | The user's orders.
 * @throws {Error} - Error al intentar obtener los pedidos del usuario. | Error when trying to get the user's orders.
 */
const getOrdersByUser = async (userId) => {
    try {
        return await OrderModel.getOrdersByUser(userId);
    } catch (error) {
        console.log(`Error al intentar obtener los pedidos del usuario ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener una orden específica por su ID.
 * Function to get a specific order by its ID.
 * 
 * @param {string} orderId - El ID de la orden que se quiere obtener. | The ID of the order to be obtained.
 * @returns {Object} - La orden obtenida. | The obtained order.
 * @throws {Error} - Error al intentar obtener el pedido por ID. | Error when trying to get the order by ID.
 */
const getOrderById = async (orderId) => {
    try {
        return await OrderModel.getOrderById(orderId);
    } catch (error) {
        console.log(`Error al intentar obtener el pedido por ID ${errorDisplay}`, error);
    }
};

/**
 * Función para crear una nueva orden.
 * Function to create a new order.
 * 
 * @param {Object} orderData - Los datos de la nueva orden. | The data of the new order.
 * @returns {Object} - La respuesta de la creación de la orden. | The response of the order creation.
 * @throws {Error} - Error al intentar crear el pedido. | Error when trying to create the order.
 */
const createOrder = async (orderData) => {
    try {
        const response = await OrderModel.createOrder(orderData);
        console.log(orderData);

        if(response.order_id != null){
            const notificationData = {
                title: "Pedido " + response.order_id + " creado",
                description: "Se ha creado un nuevo pedido con el número de orden: " + response.order_id,
                notification_date: new Date(),
                viewed: "0",
                reference: response.order_id,
                notification_user: response.user_id,
                type: "Order",
            };

            await insertNotification(notificationData);

            // Parse details to get products and quantities
            const details = JSON.parse(orderData.details);
            for (let detail of details) {
                // Update stock for each product
                await updateProductStock(detail.product_id, -detail.quantity);
            }
        }

        return response;
    } catch(err) {
        console.log(`Error al intentar crear el pedido ${errorDisplay}`, err);
    }
};

/**
 * Función para actualizar una orden existente.
 * Function to update an existing order.
 * 
 * @param {string} orderId - El ID de la orden que se quiere actualizar. | The ID of the order to be updated.
 * @param {Object} orderData - Los nuevos datos de la orden. | The new data of the order.
 * @returns {Object} - La respuesta de la actualización de la orden. | The response of the order update.
 * @throws {Error} - Error al intentar actualizar el pedido. | Error when trying to update the order.
 */
const updateOrder = async (orderId, orderData) => {
    try {
        return await OrderModel.updateOrder(orderId, orderData);
    } catch (error) {
        console.log(`Error al intentar actualizar el pedido ${errorDisplay}`, error);
    }
};

/**
 * Función para eliminar una orden existente.
 * Function to delete an existing order.
 * 
 * @param {string} orderId - El ID de la orden que se quiere eliminar. | The ID of the order to be deleted.
 * @returns {Object} - La respuesta de la eliminación de la orden. | The response of the order deletion.
 * @throws {Error} - Error al intentar eliminar el pedido. | Error when trying to delete the order.
 */
const deleteOrder = async (orderId) => {
    try {
        return await OrderModel.deleteOrder(orderId);
    } catch (error) {
        console.log(`Error al intentar eliminar el pedido ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener el conteo total de órdenes.
 * Function to get the total count of orders.
 * 
 * @returns {number} - El conteo total de órdenes. | The total count of orders.
 * @throws {Error} - Error al intentar obtener el conteo de pedidos. | Error when trying to get the count of orders.
 */
const getOrdersCount = async () => {
    try {
        return await OrderModel.getOrdersCount();
    } catch (error) {
        console.log(`Error al intentar obtener el conteo de pedidos ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener las órdenes entre dos fechas.
 * Function to get orders between two dates.
 * 
 * @param {string} startDate - La fecha de inicio del rango de búsqueda. | The start date of the search range.
 * @param {string} endDate - La fecha de fin del rango de búsqueda. | The end date of the search range.
 * @returns {Object[]} - Las órdenes encontradas en el rango de fechas. | The orders found in the date range.
 * @throws {Error} - Error al intentar obtener los pedidos por fecha. | Error when trying to get the orders by date.
 */
const getOrdersByDate = async (startDate, endDate) => {
    try {
        return await OrderModel.getOrdersByDate(startDate, endDate);
    } catch (error) {
        console.log(`Error al intentar obtener los pedidos por fecha ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener todos los pedidos con paginación.
 * Function to get all orders with pagination.
 *      
 * @param {number} page - La página actual. | The current page.
 * @param {number} limit - El límite de pedidos por página. | The limit of orders per page.
 * @returns {Object} - Los pedidos obtenidos. | The obtained orders.
 * @throws {Error} - Error al intentar obtener todos los pedidos. | Error when trying to get all orders.
 */

const getAllOrders = async (page, limit) => {
    try {
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;
        let orders = await OrderModel.getAllOrders(skip, limit);
        const total = await OrderModel.getOrdersCount();
        return {
            total,
            pages: Math.ceil(total / limit),
            orders
        };
    } catch (error) {
        console.log(`Error al intentar obtener todos los pedidos ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener la información general del panel.
 * Function to get the general panel information.
 * 
 * @returns {Object} - La información general del panel. | The general panel information.
 * @throws {Error} - Error al intentar obtener la información general del panel. | Error when trying to get the general panel information.
 */

const getGeneralPanelInfo = async () => {
    try {
        const date = new Date();
        date.setDate(date.getDate() - 7);

        const orders = await OrderModel.getOrdersCount();
        const ordersWeek = await OrderModel.getCountOrdersWeek(new Date(), date);
        const orderDelivery = await OrderModel.getCountStatusOrder('delivery');
        const orderDelivered = await OrderModel.getCountStatusOrder('delivered');

        return {
            orders,
            ordersWeek,
            orderDelivery,
            orderDelivered,
        };
    } catch (error) {
        console.log(`Error al intentar obtener la información general del panel ${errorDisplay}`, error);
    }
};

/**
 * Función para cancelar una orden.
 * Function to cancel an order.
 * 
 * @param {string} orderId - El ID de la orden que se quiere cancelar. | The ID of the order to be cancelled.
 * @returns {Object} - La respuesta de la cancelación de la orden. | The response of the order cancellation.
 * @throws {Error} - Error al intentar cancelar el pedido. | Error when trying to cancel the order.
 */

const cancelOrder = async (orderId) => {
    try {
        return await OrderModel.cancelOrder(orderId);
    } catch (error) {
        console.log(`Error al intentar cancelar el pedido ${errorDisplay}`, error);
    }
};

/**
 * Función para devolver una orden.
 * Function to return an order.
 * 
 * @param {string} orderId - El ID de la orden que se quiere devolver. | The ID of the order to be returned.
 * @returns {Object} - La respuesta de la devolución de la orden. | The response of the order return.
 * @throws {Error} - Error al intentar devolver el pedido. | Error when trying to return the order.
 */
const returnOrder = async (orderId) => {
    try {
        return await OrderModel.returnOrder(orderId);
    } catch (error) {
        console.log(`Error al intentar devolver el pedido ${errorDisplay}`, error);
    }
}

module.exports = {
    getOrdersByUser,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrdersCount,
    getOrdersByDate,
    getGeneralPanelInfo,
    getAllOrders,
    cancelOrder,
    returnOrder
};