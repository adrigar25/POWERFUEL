// routes.js
const express = require('express');
const router = express.Router();

/**
 * @route /api/users
 * Rutas para la gestión de usuarios. | Routes for user management.
 */
router.use('/api/users', require('./api/users/routes'));

/**
 * @route /api/products
 * Rutas para la gestión de productos. | Routes for product management.
 */
router.use('/api/products', require('./api/products/routes'));

/**
 * @route /api/roles
 * Rutas para la gestión de roles. | Routes for role management.
 */
router.use('/api/roles', require('./api/roles/routes'));

/**
 * @route /api/categories
 * Rutas para la gestión de categorías. | Routes for category management.
 */
router.use('/api/categories', require('./api/categories/routes'));

/**
 * @route /api/brands
 * Rutas para la gestión de marcas. | Routes for brand management.
 */
router.use('/api/brands', require('./api/brands/routes'));

/**
 * @route /api/files
 * Rutas para la gestión de archivos. | Routes for file management.
 */
router.use('/api/files', require('./api/files/routes'));

/**
 * @route /api/address
 * Rutas para la gestión de direcciones. | Routes for address management.
 */
router.use('/api/address', require('./api/addresses/routes'));

/**
 * @route /api/payment
 * Rutas para la gestión de pagos. | Routes for payment management.
 */
router.use('/api/payment', require('./api/payment/routes'));

/**
 * @route /api/stripe
 * Rutas para la gestión de Stripe. | Routes for Stripe management.
 */
router.use('/api/stripe', require('./api/stripe/routes'));

/**
 * @route /api/server
 * Rutas para la gestión del servidor. | Routes for server management.
 */
router.use('/api/server', require('./api/server/routes'));

/**
 * @route /api/orders
 * Rutas para la gestión de pedidos. | Routes for order management.
 */
router.use('/api/orders', require('./api/orders/routes'));

/**
 * @route /api/notifications
 * Rutas para la gestión de notificaciones. | Routes for notification management.
 */
router.use('/api/notifications', require('./api/notifications/routes'));

/**
 * @route /api/support
 * Rutas para la gestión de soporte. | Routes for support management.
 */
router.use('/api/support', require('./api/support/routes'));

module.exports = router;
