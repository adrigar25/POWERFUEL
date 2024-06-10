const model = require('./supportTicketsModel');

const errorDisplay = "(Error en el controlador de Support Tickets)";

/**
 * Función para obtener un ticket de soporte por su ID.
 * Function to get a support ticket by its ID.
 * 
 * @param {number} ticketId - El ID del ticket. | The ID of the ticket.
 *  
 * @returns {Object} - El ticket de soporte obtenido. | The obtained support ticket.
 * @throws {Error} - Error al intentar obtener el ticket de soporte. | Error when trying to get the support ticket.
 */
const getSupportTicketById = async (ticketId) => {
    try {
        return await model.getSupportTicketById(ticketId);
    } catch (error) {
        console.log(`Error al obtener el ticket de soporte ${errorDisplay}`, error);
    }
}

/**
 * Función para crear un nuevo ticket de soporte.
 * Function to create a new support ticket.
 * 
 * @param {Object} ticketData - Los datos del ticket de soporte. | The support ticket data.
 * 
 * @returns {Object} - El ticket de soporte creado. | The created support ticket.
 * @throws {Error} - Error al intentar crear el ticket de soporte. | Error when trying to create the support ticket.
 */
const createSupportTicket = async (ticketData) => {
    try {
        console.log(ticketData);
        return await model.createSupportTicket(ticketData);
    } catch (error) {
        console.log(`Error al crear el ticket de soporte ${errorDisplay}`, error);
    }
}

/**
 * Función para actualizar un ticket de soporte.
 * Function to update a support ticket.
 * 
 * @param {number} ticketId - El ID del ticket. | The ID of the ticket.
 * @param {Object} ticketData - Los datos del ticket de soporte. | The support ticket data.
 * 
 * @returns {Object} - El ticket de soporte actualizado. | The updated support ticket.
 * @throws {Error} - Error al intentar actualizar el ticket de soporte. | Error when trying to update the support ticket.
 */
const updateSupportTicket = async (ticketId, ticketData) => {
    try {
        return await model.updateSupportTicket(ticketId, ticketData);
    } catch (error) {
        console.log(`Error al actualizar el ticket de soporte ${errorDisplay}`, error);
    }
}

/**
 * Función para obtener los tickets de soporte con paginación.
 * Function to get the support tickets with pagination.
 * 
 * @param {number} skip - El número de tickets a saltar. | The number of tickets to skip.
 * @param {number} limit - El límite de tickets por página. | The limit of tickets per page.
 * 
 * @returns {Array} - Los tickets de soporte obtenidos. | The obtained support tickets.
 * @throws {Error} - Error al intentar obtener los tickets de soporte. | Error when trying to get the support tickets.
 */
const getSupportTickets = async (skip = 0, limit = 10) => {
    try {
        return await model.getSupportTickets(skip, limit);
    } catch (error) {
        console.log(`Error al obtener los tickets de soporte ${errorDisplay}`, error);
    }
}

module.exports = {
    getSupportTicketById,
    createSupportTicket,
    updateSupportTicket,
    getSupportTickets
};
