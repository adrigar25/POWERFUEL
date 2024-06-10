const express = require('express');
const { getSupportTicketById, createSupportTicket, updateSupportTicket, getSupportTickets } = require('./controller');

const router = express.Router();

router.route('/')
    /**
     * @route POST /
     * Endpoint para crear un nuevo ticket de soporte.
     * Endpoint to create a new support ticket.
     * 
     * @param {Object} req.body - Los datos del ticket de soporte. | The support ticket data.
     * @returns {Object} 200 - El ticket de soporte creado. | The created support ticket.
     * @returns {Error} 500 - Error al crear el ticket de soporte. | Error when creating the support ticket.
     */
    .post(async (req, res) => {
        try {
            const ticket = await createSupportTicket(req.body);
            res.status(200).json({message: 'El mensaje de soporte ha sido creado exitosamente'});
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el ticket de soporte' });
        }
    })
    /**
     * @route GET /
     * Endpoint para obtener tickets de soporte con paginación.
     * Endpoint to get support tickets with pagination.
     * 
     * @param {number} req.query.skip - El número de tickets a saltar. | The number of tickets to skip.
     * @param {number} req.query.limit - El límite de tickets por página. | The limit of tickets per page.
     * @returns {Object} 200 - Los tickets de soporte obtenidos. | The obtained support tickets.
     * @returns {Error} 500 - Error al obtener los tickets de soporte. | Error when getting the support tickets.
     */
    .get(async (req, res) => {
        try {
            const tickets = await getSupportTickets(req.query.skip, req.query.limit);
            res.status(200).json(tickets);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los tickets de soporte' });
        }
    });

router.route('/:ticketId')
    /**
     * @route GET /:ticketId
     * Endpoint para obtener un ticket de soporte por su ID.
     * Endpoint to get a support ticket by its ID.
     * 
     * @param {number} req.params.ticketId - El ID del ticket. | The ID of the ticket.
     * @returns {Object} 200 - El ticket de soporte obtenido. | The obtained support ticket.
     * @returns {Error} 500 - Error al obtener el ticket de soporte. | Error when getting the support ticket.
     */
    .get(async (req, res) => {
        try {
            const ticket = await getSupportTicketById(req.params.ticketId);
            res.status(200).json(ticket);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el ticket de soporte' });
        }
    })
    /**
     * @route PUT /:ticketId
     * Endpoint para actualizar un ticket de soporte.
     * Endpoint to update a support ticket.
     * 
     * @param {number} req.params.ticketId - El ID del ticket. | The ID of the ticket.
     * @param {Object} req.body - Los datos del ticket de soporte. | The support ticket data.
     * @returns {Object} 200 - El ticket de soporte actualizado. | The updated support ticket.
     * @returns {Error} 500 - Error al actualizar el ticket de soporte. | Error when updating the support ticket.
     */
    .put(async (req, res) => {
        try {
            const ticket = await updateSupportTicket(req.params.ticketId, req.body);
            res.status(200).json(ticket);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el ticket de soporte' });
        }
    });

module.exports = router;