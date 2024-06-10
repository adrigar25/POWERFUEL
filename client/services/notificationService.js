import api from './axios';
import toastr from 'toastr';

class NotificationService {
    async getNotificationsByUser(limit = 10, page = 1) {
        try {
            const response = await api.get(`/notifications/user?limit=${limit}&page=${page}`);
            return response.data;
        } catch (error) {
            toastr.error(error);
            throw error;
        }
    }

    async insertNotification(notificationData) {
        try {
            const response = await api.post(`/notifications`, notificationData);
            return response.data;
        } catch (error) {
            toastr.error(error);
            throw error;
        }
    }

    async getAllNotifications() {
        try {
            const response = await api.get(`/notifications`);
            return response.data;
        } catch (error) {
            toastr.error(error);
            throw error;
        }
    }

    async deleteNotificationById(notificationId) {
        try {
            const response = await api.delete(`/notifications/${notificationId}`);
            return response.data;
        } catch (error) {
            toastr.error(error);
            throw error;
        }
    }

    async markAsViewed() {
        try {
            const response = await api.put(`/notifications/viewed`);
            return response.data;
        } catch (error) {
            toastr.error(error);
            throw error;
        }
    }
}

const notificationService = new NotificationService();

export default notificationService;