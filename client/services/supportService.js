import api from './axios';

class SupportService{

    async createTicket(ticket){
        try {
            const response = await api.post('/support', ticket);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async updateTicket(ticketId, ticket){
        try {
            const response = await api.put(`/support/${ticketId}`, ticket);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getTickets(skip, limit){
        try {
            const response = await api.get(`/support?skip=${skip}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getTicketById(ticketId){
        try {
            const response = await api.get(`/support/${ticketId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteTicket(ticketId){
        try {
            const response = await api.delete(`/support/${ticketId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

}

export default new SupportService();