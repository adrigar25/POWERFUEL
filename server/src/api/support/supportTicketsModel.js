const { SupportTicket } = require('../../model');
const sequelize = require('../../model/database');
const { Op } = require('sequelize');
const errorDisplay = "(Error en el modelo de SupportTicket)";

class model {
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
    getSupportTickets = async (skip = 0, limit = 10) => {
        try {
            skip = parseInt(skip);
            limit = parseInt(limit);

            const tickets = await SupportTicket.findAll({
                offset: skip,
                limit: limit,
                subQuery: false
            });
            return tickets;
        } catch (error) {
            console.log(`Error al obtener los tickets de soporte ${errorDisplay}`, error);
        }
    };

    /**
     * Función para obtener un ticket de soporte por su ID.
     * Function to get a support ticket by its ID.
     * 
     * @param {number} ticketId - El ID del ticket. | The ID of the ticket.
     * 
     * @returns {Object} - El ticket de soporte obtenido. | The obtained support ticket.
     * @throws {Error} - Error al intentar obtener el ticket de soporte. | Error when trying to get the support ticket.
     */
    getSupportTicketById = async (ticketId) => {
        try {
            const ticket = await SupportTicket.findOne({
                where: {
                    ticket_id: ticketId
                }
            });
            return ticket;
        } catch (error) {
            console.log(`Error al obtener el ticket de soporte ${errorDisplay}`, error);
        }
    };

    /**
     * Función para crear un nuevo ticket de soporte.
     * Function to create a new support ticket.
     * 
     * @param {Object} ticketData - Los datos del ticket de soporte. | The support ticket data.
     * 
     * @returns {Object} - El ticket de soporte creado. | The created support ticket.
     * @throws {Error} - Error al intentar crear el ticket de soporte. | Error when trying to create the support ticket.
     */

    createSupportTicket = async (ticketData) => {
        try {
            const ticket = await SupportTicket.create(ticketData);
            return ticket;
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

    updateSupportTicket = async (ticketId, ticketData) => {
        try {
            const ticket = await SupportTicket.update(ticketData, {
                where: {
                    ticket_id: ticketId
                }
            });
            return ticket;
        } catch (error) {
            console.log(`Error al actualizar el ticket de soporte ${errorDisplay}`, error);
        }

    }

    /**
     * Función para eliminar un ticket de soporte.
     * Function to delete a support ticket.
     * 
     * @param {number} ticketId - El ID del ticket. | The ID of the ticket.
     * 
     * @returns {Object} - El ticket de soporte eliminado. | The deleted support ticket.
     * @throws {Error} - Error al intentar eliminar el ticket de soporte. | Error when trying to delete the support ticket.
     */

    deleteSupportTicket = async (ticketId) => {
        try {
            const ticket = await SupportTicket.destroy({
                where: {
                    ticket_id: ticketId
                }
            });
            return ticket;
        } catch (error) {
            console.log(`Error al eliminar el ticket de soporte ${errorDisplay}`, error);
        }

    }

    /**
     * Función para buscar tickets de soporte por su tipo.
     * Function to search support tickets by their type.
     * 
     * @param {string} type - El tipo de ticket. | The type of ticket.
     * @param {number} skip - El número de tickets a saltar. | The number of tickets to skip.
     * @param {number} limit - El límite de tickets por página. | The limit of tickets per page.
     * 
     * @returns {Array} - Los tickets de soporte obtenidos. | The obtained support tickets.
     * @throws {Error} - Error al intentar buscar tickets de soporte. | Error when trying to search support tickets.
     */

    searchSupportTicketByType = async (type, skip = 0, limit = 10) => {
        try {
            skip = parseInt(skip);
            limit = parseInt(limit);

            const tickets = await SupportTicket.findAll({
                where: {
                    type: {
                        [Op.like]: `%${type}%`
                    }
                },
                offset: skip,
                limit: limit,
                subQuery: false
            });
            return tickets;
        } catch (error) {
            console.log(`Error al buscar tickets de soporte por tipo ${errorDisplay}`, error);
        }

    }

    

};

module.exports = new model();