import api from './axios';
import toastr from 'toastr';

class SupportTicketService {
    async getSupportTicketById(ticketId) {
        try {
            const response = await api.get(`/supportTickets/${ticketId}`);
            if (!response.data) {
                console.log('Support ticket not found');
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async getSupportTickets(page = 1, limit = 10) {
        try {
            const response = await api.get(`/supportTickets?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async createSupportTicket(ticket) {
        try {
            const response = await api.post('/supportTickets', ticket);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async updateSupportTicket(ticketId, ticket) {
        try {
            const response = await api.put(`/supportTickets/${ticketId}`, ticket);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

const supportTicketService = new SupportTicketService();

export default supportTicketService;