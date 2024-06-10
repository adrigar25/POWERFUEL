const express = require('express');
const {
    getOrdersByDate, 
    getOrdersByUser, 
    getOrderById, 
    createOrder, 
    updateOrder, 
    deleteOrder, 
    getOrdersCount, 
    getAllOrders, 
    getGeneralPanelInfo, 
    cancelOrder,
    returnOrder
} = require('./controller');
const router = express.Router();

router.route('/user/:userId')
    /**
     * @route GET /user/:userId
     * Endpoint para obtener las órdenes de un usuario especificado por su ID en los parámetros de la ruta.
     * Endpoint to get orders of a user specified by its ID in the route parameters.
     * 
     * @param {string} req.params.userId - El ID del usuario del cual se quieren obtener las órdenes. | The ID of the user from which the orders are to be obtained.
     * @returns {Array} 200 - Un array de órdenes del usuario. | An array of user's orders.
     * @returns {Error} 500 - Error al obtener las órdenes. | Error when getting the orders.
     */
    .get(async (req, res) => {
        try {
            const userId = req.params.userId;
            const orders = await getOrdersByUser(userId);
            res.status(200).json(orders);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Hubo un problema al obtener los pedidos' });
        }
    });

router.route('/user')
    /**
     * @route GET /user
     * Endpoint para obtener las órdenes del usuario actualmente autenticado.
     * Endpoint to get orders of the currently authenticated user.
     * 
     * @param {string} req.user.userId - El ID del usuario autenticado del cual se quieren obtener las órdenes. | The ID of the authenticated user from which the orders are to be obtained.
     * @returns {Array} 200 - Un array de órdenes del usuario. | An array of user's orders.
     * @returns {Error} 500 - Error al obtener las órdenes. | Error when getting the orders.
     */
    .get(async (req, res) => {
        try {
            const userId = req.user.userId;
            const orders = await getOrdersByUser(userId);
            res.status(200).json(orders);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Hubo un problema al obtener los pedidos' });
        }
    });

router.route('/:orderId')
    /**
     * @route GET /:orderId
     * Endpoint para obtener una orden especificada por su ID en los parámetros de la ruta.
     * Endpoint to get an order specified by its ID in the route parameters.
     * 
     * @param {string} req.params.orderId - El ID de la orden que se quiere obtener. | The ID of the order to be obtained.
     * @returns {Object} 200 - La orden obtenida. | The obtained order.
     * @returns {Error} 500 - Error al obtener la orden. | Error when getting the order.
     */
    .get(async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const order = await getOrderById(orderId);
            res.status(200).json(order);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Hubo un problema al obtener el pedido' });
        }
    })
    /**
     * @route PUT /:orderId
     * Endpoint para actualizar una orden especificada por su ID en los parámetros de la ruta.
     * Endpoint to update an order specified by its ID in the route parameters.
     * 
     * @param {string} req.params.orderId - El ID de la orden que se quiere actualizar. | The ID of the order to be updated.
     * @param {Object} req.body - Los nuevos datos de la orden. | The new data of the order.
     * @returns {Object} 200 - La orden actualizada. | The updated order.
     * @returns {Error} 500 - Error al actualizar la orden. | Error when updating the order.
     */
    .put(async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const order = req.body;
            const updatedOrder = await updateOrder(orderId, order);
            res.status(200).json({updatedOrder, message: 'Pedido modificado correctamente' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Hubo un problema al modificar el pedido' });
        }
    })
    /**
     * @route DELETE /:orderId
    * Endpoint para eliminar una orden especificada por su ID en los parámetros de la ruta.
    * Endpoint to delete an order specified by its ID in the route parameters.
    * 
    * @param {string} req.params.orderId - El ID de la orden que se quiere eliminar. | The ID of the order to be deleted.
    * @returns {Object} 200 - Resultado de la operación de eliminación. | Result of the deletion operation.
    * @returns {Error} 500 - Error al eliminar la orden. | Error when deleting the order.
    */
    .delete(async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const result = await deleteOrder(orderId);
            res.status(200).json({ success: result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Hubo un problema al eliminar el pedido' });
        }
    });

router.route('/')
    /**
     * @route POST /
     * Endpoint para crear una nueva orden.
     * Endpoint to create a new order.
     * 
     * @param {Object} req.body - Los datos de la nueva orden. | The data of the new order.
     * @returns {Object} 200 - La orden creada. | The created order.
     * @returns {Error} 500 - Error al crear la orden. | Error when creating the order.
     */
    .post(async (req, res) => {
        try {
            const order = req.body;
            order.user_id = req.user.userId;
            const newOrder = await createOrder(order);
            res.json(newOrder);
        } catch (error) {
            res.status(500).json({ message: 'Hubo un problema al crear el pedido' });
        }
    })
    .get(async (req, res) => {
        try {
            const orders = await getAllOrders(req.query.page, req.query.limit);
            res.status(200).json(orders);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Hubo un problema al obtener los pedidos' });
        }
    });


router.route('/count')
    /**
     * @route GET /
     * Endpoint para obtener el conteo de órdenes.
     * Endpoint to get the count of orders.
     * 
     * @returns {Object} 200 - El conteo de órdenes. | The count of orders.
     * @returns {Error} 500 - Error al obtener el conteo de órdenes. | Error when getting the count of orders.
     */
    .get(async (req, res) => {
        try {
            const count = await getOrdersCount();
            res.status(200).json({ count });
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    });

router.route('/date')
    /**
     * @route GET /date
     * Endpoint para obtener las órdenes entre dos fechas.
     * Endpoint to get orders between two dates.
     * 
     * @param {string} req.query.startDate - La fecha de inicio del rango de búsqueda. | The start date of the search range.
     * @param {string} req.query.endDate - La fecha de fin del rango de búsqueda. | The end date of the search range.
     * @returns {Object[]} 200 - Las órdenes encontradas en el rango de fechas. | The orders found in the date range.
     * @returns {Error} 500 - Error al obtener las órdenes. | Error when getting the orders.
     */
    .get(async (req, res) => {
        try {
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;
            const orders = await getOrdersByDate(startDate, endDate);
            res.json(orders);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Hubo un problema al obtener los pedidos' });
        }
    });

router.route('/generalPanelInfo')
    /**
     * @route POST /generalPanelInfo
     * Endpoint para obtener la información general del panel.
     * Endpoint to get the general information of the panel.
     * 
     * @returns {Object} 200 - La información general del panel. | The general information of the panel.
     * @returns {Error} 500 - Error al obtener la información general del panel. | Error when getting the general information of the panel.
     */
    .post(async (req, res) => {
        try {
            const info = await getGeneralPanelInfo();
            res.status(200).json(info);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Hubo un problema al obtener la información general del panel' });
        }
    });

router.route('/cancel/:orderId')
    /**
     * @route POST /cancel/:orderId
     * Endpoint para cancelar una orden especificada por su ID en los parámetros de la ruta.
     * Endpoint to cancel an order specified by its ID in the route parameters.
     * 
     * @param {string} req.params.orderId - El ID de la orden que se quiere cancelar. | The ID of the order to be cancelled.
     * @returns {Object} 200 - Resultado de la operación de cancelación. | Result of the cancellation operation.
     * @returns {Error} 500 - Error al cancelar la orden. | Error when cancelling the order.
     */
    .post(async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const result = await cancelOrder(orderId);
            res.status(200).json({ message: 'Pedido cancelado correctamente' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Hubo un problema al cancelar el pedido' });
        }
    });

router.route('/return/:orderId')
    /**
     * @route POST /return/:orderId
     * Endpoint para devolver una orden especificada por su ID en los parámetros de la ruta.
     * Endpoint to return an order specified by its ID in the route parameters.
     * 
     * @param {string} req.params.orderId - El ID de la orden que se quiere devolver. | The ID of the order to be returned.
     * @returns {Object} 200 - Resultado de la operación de devolución. | Result of the return operation.
     * @returns {Error} 500 - Error al devolver la orden. | Error when returning the order.
     */
    .post(async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const result = await returnOrder(orderId);
            res.status(200).json({ message: 'Pedido devuelto correctamente' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Hubo un problema al devolver el pedido' });
        }
    });
    

module.exports = router;