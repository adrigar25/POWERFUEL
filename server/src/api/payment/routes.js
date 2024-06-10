// routes.ts
const express = require('express');
const { getCustomerPaymentMethods, createCheckout, getLastPayment, getUserPayments } = require("./controller");
const router = express.Router();

/**
 * @route POST /create-checkout-session
 * Endpoint para crear una sesión de checkout.
 * Endpoint to create a checkout session.
 * 
 * @param {Object} req.body.cart - El carrito de compras del usuario. | The user's shopping cart.
 * @param {string} req.user.userId - El ID del usuario. | The user's ID.
 * @returns {Object} 200 - El secreto del cliente de la sesión de checkout. | The client secret of the checkout session.
 * @returns {Error} 500 - Error al crear la sesión de checkout. | Error when creating the checkout session.
 */
router.post('/create-checkout-session', async (req, res) => {
    try {
        const cart = req.body.cart;
        const userId = req.user.userId;
        const session = await createCheckout(cart, userId);
        res.status(200).json({clientSecret: session.client_secret});
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al intentar crear la sesión de checkout.' });
    }
});

/**
 * @route GET /get-customer-payment-methods
 * Endpoint para obtener los métodos de pago de un cliente.
 * Endpoint to get a customer's payment methods.
 * 
 * @param {string} req.user.userId - El ID del usuario. | The user's ID.
 * @param {string} req.query.userId - El ID del usuario en la consulta. | The user's ID in the query.
 * @returns {Object[]} 200 - Los métodos de pago del cliente. | The customer's payment methods.
 * @returns {Error} 500 - Error al obtener los métodos de pago. | Error when fetching payment methods.
 */
router.get('/get-customer-payment-methods', async (req, res) => {
    try {
        const userId = req.user.userId??req.query.userId;
        const paymentMethods = await getCustomerPaymentMethods(userId);
        res.status(200).json(paymentMethods);
    }catch (error) {
        res.status(500).json({message: 'Error fetching payment methods'});
    }
});

/**
 * @route GET /last-payment
 * Endpoint para obtener el último pago de un usuario.
 * Endpoint to get a user's last payment.
 * 
 * @param {string} req.user.userId - El ID del usuario. | The user's ID.
 * @param {string} req.query.userId - El ID del usuario en la consulta. | The user's ID in the query.
 * @returns {Object} 200 - El último pago del usuario. | The user's last payment.
 * @returns {Error} 500 - Error al obtener el último pago. | Error when fetching last payment.
 */
router.get('/last-payment', async (req, res) => {
    try {
        const userId = req.user.userId??req.query.userId;
        const lastPayment = await getLastPayment(userId);
        res.status(200).json(lastPayment);
    } catch (error) {
        res.status(500);
    }
});

/**
 * @route GET /get-customer-orders
 * Endpoint para obtener los pedidos de un cliente.
 * Endpoint to get a customer's orders.
 * 
 * @param {Object} req.user.userId - El ID del usuario del que se quieren obtener los pedidos. | The ID of the user whose orders are to be obtained.
 * @param {Object} req.query.userId - El ID del usuario del que se quieren obtener los pedidos, proporcionado como un parámetro de consulta. | The ID of the user whose orders are to be obtained, provided as a query parameter.
 * @returns {Object} 200 - Los pedidos del usuario. | The user's orders.
 * @returns {Error} 500 - Error al obtener los pedidos. | Error when getting the orders.
 */
router.get('/get-customer-orders', async (req, res) => {
    try {
        const userId = req.user.userId??req.query.userId;
        const orders = await getUserPayments(userId);
        res.status(200).json(orders);
    }catch (error) {
        res.status(500).json({message: 'Erro al obtener los pagos del usuario'});
    }
});

module.exports = router;