// stripe/controller.js

const stripe = require('stripe')('sk_test_51P5QR3Iqj90TtX551kH7daGUlHYw949RcnB6nI5LMDYrbZALCilz6YXBdofMrujKoKPZTBVDquCsvb0zN3gRuDOi00TK4DySoc');
const errorDisplay = "(Error en el controlador de Stripe)";

/**
 * Función para crear un cliente en Stripe.
 * Function to create a customer in Stripe.
 * 
 * @param {string} email - El correo electrónico del cliente. | The customer's email.
 * @param {string} name - El nombre del cliente. | The customer's name.
 * @returns {Promise} - Promesa que resuelve al crear el cliente en Stripe. | Promise that resolves when creating the customer in Stripe.
 * @throws {Error} - Error al intentar crear el cliente en Stripe. | Error when trying to create the customer in Stripe.
 */
const createStripeCustomer = async (email, name) => {
    try {
        return await stripe.customers.create({ email, name });
    } catch (error) {
        console.log(`Error al intentar crear el cliente Stripe ${errorDisplay}`, error);
    }
};

/**
 * Función para eliminar un cliente de Stripe.
 * Function to delete a Stripe customer.
 * 
 * @param {string} customerId - El ID del cliente. | The customer's ID.
 * @returns {Promise} - Promesa que resuelve al eliminar el cliente de Stripe. | Promise that resolves when deleting the Stripe customer.
 * @throws {Error} - Error al intentar eliminar el cliente de Stripe. | Error when trying to delete the Stripe customer.
 * 
 * @see https://stripe.com/docs/api/customers/delete
 * @see https://stripe.com/docs/api/customers/object#customer_object-deleted
 * @see https://stripe.com/docs/api/customers/object#customer_object
 * 
 **/
const deleteStripeCustomer = async (customerId) => {
    try {
        await stripe.customers.del(customerId);
    } catch (error) {
        console.log(`Error al intentar eliminar el cliente Stripe ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener un cliente de Stripe.
 * Function to get a Stripe customer.
 * 
 * @param {string} userId - El ID del usuario. | The user's ID.
 * @returns {Promise} - Promesa que resuelve al obtener el cliente de Stripe. | Promise that resolves when getting the Stripe customer.
 * @throws {Error} - Error al intentar obtener el cliente de Stripe. | Error when trying to get the Stripe customer.
 */
const getCustomer = async (userId) => {
    try {
        return await stripe.customers.retrieve(userId);
    } catch (error) {
        console.log(`Error al intentar obtener el cliente Stripe ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener los cargos de un cliente de Stripe.
 * Function to get a Stripe customer's charges.
 * 
 * @param {string} userId - El ID del usuario. | The user's ID.
 * @returns {Promise} - Promesa que resuelve al obtener los cargos del cliente de Stripe. | Promise that resolves when getting the Stripe customer's charges.
 * @throws {Error} - Error al intentar obtener los cargos del cliente de Stripe. | Error when trying to get the Stripe customer's charges.
 */
const getCustomerCharges = async (userId) => {
    try {
        return await stripe.charges.list({ customer: userId });
    } catch (error) {
        console.log(`Error al intentar obtener los cargos del cliente ${errorDisplay}`, error);
    }
};

/**
 * Función para crear una sesión de pago en Stripe.
 * Function to create a payment session in Stripe.
 * 
 * @param {string} customerId - El ID del cliente. | The customer's ID.
 * @param {Array} line_items - Los artículos a comprar. | The items to purchase.
 * @returns {Promise} - Promesa que resuelve al crear la sesión de pago en Stripe. | Promise that resolves when creating the payment session in Stripe.
 * @throws {Error} - Error al intentar crear la sesión de pago en Stripe. | Error when trying to create the payment session in Stripe.
 */
const createCheckoutSession = async (customerId, line_items) => {
    try {
        return await stripe.checkout.sessions.create({
            customer: customerId,
            line_items,
            mode: 'payment',
            ui_mode: 'embedded',
            return_url: `${process.env.SERVER_FRONTEND}/success?success=true`,
        });
    } catch (error) {
        console.log(`Error al intentar crear la sesión de pago ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener los métodos de pago de un cliente de Stripe.
 * Function to get a Stripe customer's payment methods.
 * 
 * @param {string} customerId - El ID del cliente. | The customer's ID.
 * @returns {Promise} - Promesa que resuelve al obtener los métodos de pago del cliente de Stripe. | Promise that resolves when getting the Stripe customer's payment methods.
 * @throws {Error} - Error al intentar obtener los métodos de pago del cliente de Stripe. | Error when trying to get the Stripe customer's payment methods.
 */
const getCustomerPaymentMethods = async (customerId) => {
    try {
        const paymentMethods = await stripe.paymentMethods.list({
            customer: customerId,
            type: 'card',
        });

        return paymentMethods;
    } catch (error) {
        console.log(`Error al intentar obtener los métodos de pago del cliente ${errorDisplay}`, error);
    }
};

/**
 * Función para crear un producto en Stripe.
 * Function to create a product in Stripe.
 * 
 * @param {string} name - El nombre del producto. | The product's name.
 * @param {string} description - La descripción del producto. | The product's description.
 * @param {number} price - El precio del producto. | The product's price.
 * @returns {Promise} - Promesa que resuelve al crear el producto en Stripe, devolviendo el ID del producto y el ID del precio. | Promise that resolves when creating the product in Stripe, returning the product ID and the price ID.
 * @throws {Error} - Error al intentar crear el producto en Stripe. | Error when trying to create the product in Stripe.
 */
const createProduct = async (name, description, price) => {
    try {
        const product = await stripe.products.create({
            name,
            description
        });

        const priceObject = await stripe.prices.create({
            unit_amount: parseInt(price)*100,
            currency: 'eur',
            product: product.id
        });

        console.log('priceObject', priceObject);
        console.log('product', product);

        return { stripe_product_id: product.id, stripe_price_id: priceObject.id };
    } catch (error) {
        console.log(`Error al intentar crear el producto ${errorDisplay}`, error);
    }
};

/**
 * Función para eliminar un producto en Stripe.
 * Function to delete a product in Stripe.
 * 
 * @param {string} productId - El ID del producto. | The product's ID.
 * @returns {Promise} - Promesa que resuelve al eliminar el producto en Stripe. | Promise that resolves when deleting the product in Stripe.
 * @throws {Error} - Error al intentar eliminar el producto en Stripe. | Error when trying to delete the product in Stripe.
 */
const deleteProduct = async (productId) => {
    try {
        await stripe.products.update(productId, { active: false });
    } catch (error) {
        console.log(`Error al intentar eliminar el producto: ${error.message}`);
    }
};

/**
 * Función para actualizar un producto en Stripe.
 * Function to update a product in Stripe.
 * 
 * @param {string} productId - El ID del producto. | The product's ID.
 * @param {Object} product - Los nuevos datos del producto. | The new data of the product.
 * @property {string} product.product_name - El nuevo nombre del producto. | The new name of the product.
 * @property {string} product.description - La nueva descripción del producto. | The new description of the product.
 * @property {number} product.price - El nuevo precio del producto. | The new price of the product.
 * 
 * @returns {Promise} - Promesa que resuelve al actualizar el producto en Stripe. | Promise that resolves when updating the product in Stripe.
 * @throws {Error} - Error al intentar actualizar el producto en Stripe. | Error when trying to update the product in Stripe.
 */
const updateProduct = async (productId, product) => {
    try {
        // Actualiza el producto
        await stripe.products.update(productId, {
            name: product.product_name,
            description: product.description
        });

        // Crea un nuevo precio y lo asigna al producto
        const newPrice = await stripe.prices.create({
            unit_amount: product.price * 100,
            currency: 'eur',
            product: productId,
        });
        console.log('newPrice', newPrice);

        // Devuelve el nuevo precio
        return newPrice.id;
    } catch (error) {
        console.log(`Error al intentar actualizar el producto: ${error}`);
    }
};

module.exports = {
    createStripeCustomer,
    deleteStripeCustomer,
    getCustomer,
    getCustomerCharges,
    createCheckoutSession,
    getCustomerPaymentMethods,
    createProduct,
    deleteProduct,
    updateProduct
}