// stripe/controller.js

const stripe = require('stripe')('sk_test_51P5QR3Iqj90TtX55z91nDeNdwkwNqgDntRABpqklGubEOnrtfEsR2M6YivU8ithiAG0EktidG1W2F50YYIVHG0LL00ste7Tm41');
const { getProductById } = require('../products/controller');
const { getUserById } = require('../users/controller');
const { createOrder } = require('../orders/controller');
const { createCheckoutSession, getCustomerCharges } = require('../stripe/controller');
const errorDisplay = "(Error en el controlador de Payment)";

/**
 * Función para crear una sesión de checkout.
 * Function to create a checkout session.
 * 
 * @param {Object[]} cart - El carrito de compras del usuario. | The user's shopping cart.
 * @param {string} userId - El ID del usuario que está realizando el checkout. | The ID of the user who is checking out.
 * @returns {Promise<Object>} - Una promesa que se resuelve en un objeto de sesión de checkout. | A promise that resolves into a checkout session object.
 * @throws {Error} - Lanza un error si hay un problema al crear la sesión de checkout. | Throws an error if there is a problem creating the checkout session.
 */
const createCheckout = async (cart, userId) => {
    try {
        const user = await getUserById(userId);

        const line_items = await Promise.all(cart.map(async item => {
            const product = await getProductById(item.product_id);
            return {
                price: product.stripe_price_id,
                quantity: parseInt(item.quantity)
            };
        }));

        const session = await createCheckoutSession(user.stripe_customer_id, line_items);

        return session;
    } catch (error) {
        console.log(`Error al intentar crear el checkout ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener los métodos de pago de un cliente.
 * Function to get the payment methods of a client.
 * 
 * @param {string} userId - El ID del usuario del que se quieren obtener los métodos de pago. | The ID of the user whose payment methods are to be obtained.
 * @returns {Promise<Object>} - Una promesa que se resuelve en un objeto que contiene los métodos de pago del cliente. | A promise that resolves into an object containing the client's payment methods.
 * @throws {Error} - Lanza un error si hay un problema al obtener los métodos de pago del cliente. | Throws an error if there is a problem getting the client's payment methods.
 */
const getCustomerPaymentMethods = async (userId) => {
    try {
        const user = await getUserById(userId);

        const paymentMethods = await stripe.paymentMethods.list({
            customer: user.stripe_customer_id,
            type: 'card',
        });

        return paymentMethods;
    } catch (error) {
        console.log(`Error al intentar obtener los métodos de pago del cliente ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener los pagos de un usuario.
 * Function to get the payments of a user.
 * 
 * @param {string} userId - El ID del usuario del que se quieren obtener los pagos. | The ID of the user whose payments are to be obtained.
 * @returns {Promise<Object>} - Una promesa que se resuelve en un objeto que contiene los pagos del usuario. | A promise that resolves into an object containing the user's payments.
 * @throws {Error} - Lanza un error si hay un problema al obtener los pagos del usuario. | Throws an error if there is a problem getting the user's payments.
 */
const getUserPayments = async (userId) => {
    try {
        const user = await getUserById(userId);

        return await getCustomerCharges(user.stripe_customer_id);
    } catch (error) {
        console.log(`Error al intentar obtener los pagos del usuario ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener el último pago de un usuario.
 * Function to get the last payment of a user.
 * 
 * @param {string} userId - El ID del usuario del que se quiere obtener el último pago. | The ID of the user whose last payment is to be obtained.
 * @returns {Promise<Object>} - Una promesa que se resuelve en un objeto que contiene el último pago del usuario. | A promise that resolves into an object containing the user's last payment.
 * @throws {Error} - Lanza un error si hay un problema al obtener el último pago del usuario. | Throws an error if there is a problem getting the user's last payment.
 */
const getLastPayment = async (userId) => {
    try {
        const user = await getUserById(userId);
        const charges = await getCustomerCharges(user.stripe_customer_id);

        const lastCharge = charges.data[0];

        return lastCharge;
    } catch (error) {
        console.log(`Error al intentar obtener el último pago ${errorDisplay}`, error);
    }
};

module.exports = {
    createCheckout,
    getCustomerPaymentMethods,
    getUserPayments,
    getLastPayment
}