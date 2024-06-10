// routes.ts
const express = require('express');
const { getCustomer, getCustomerCharges } = require('./controller');

const router = express.Router();

/**
 * @route GET /get-customer
 * Endpoint para obtener los datos de un cliente.
 * Endpoint to get a customer's data.
 * 
 * @param {string} req.query.userId - El ID del usuario en los parámetros de consulta. | The user's ID in the query parameters.
 * 
 * @param {Object} res - El objeto de respuesta HTTP. | The HTTP response object.
 * 
 * @returns {Object} 200 - Los datos del cliente. | The customer's data.
 * @throws {Error} 500 - Error al obtener los datos del cliente. | Error when getting the customer's data.
 */
router.get('/get-customer', async (req, res) => {
    const userId = req.user.userId??req.query.userId;
    const customer = await getCustomer(userId);
    res.send(customer);
});

module.exports = router;