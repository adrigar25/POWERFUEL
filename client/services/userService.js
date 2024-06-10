import api from './axios';

class UserService {
    async loginUser(email, password) {
        const response = await api.post(`/users/login`, {
            email: email,
            password: password,
        });
        localStorage.setItem('auth_token', response.data.auth_token);
        return response.data;
    }

    async registerUser(user) {
        const response = await api.post(`/users`, { user });
        return response.data;
    }

    async generalPanelInfo(){
        const response = await api.post(`/users/generalPanelInfo`);
        return response.data;
    }

    async updateUser(id, user) {
        return api.put(`/users/${id}`, { user });
    }

    async getAllUsersInfo(page = 1, limit = 10) {
        const response = await api.get(`/users?page=${page}&limit=${limit}`);
        return response.data;
    }

    async deleteUser(id) {
        return await api.delete(`/users/${id}`);
    }

    async getUserById(id) {
        const response =  await api.get(`/users/${id}`);
        return response.data;
    }

    async getUserInfo() {
        const response = await api.post(`/users/info`);
        return response.data;
    }

    async getUserByRegisterWeek(startDate, endDate) {
        const response = await api.post(`/users/usersByRegistrationDate`, { startDate, endDate });
        return response.data;
    }

    async setUserImage(images) {
        const formData = new FormData();
        formData.append('image', images);
    
        const response = await api.post(`/files/uploadUser`, formData);
    
        return response.data;
    }

    async getPasswordResetCode(email) {
        const response = await api.post(`/users/resetPasswordCode`, {
            email: email,
        });
        return response.data
    }
    
    async verifyPasswordResetCode(email, code) {
        return api.post(`/users/verifyPasswordResetCode`, {
            email: email,
            code: code,
        });
    }

    async resetPassword(email, code, newPassword, confirmPassword) {
        const response = await api.post(`/users/resetPassword`, {
            email: email,
            code: code,
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        });
        return response.data;
    }

    async changePasswordUser(oldPassword, newPassword, confirmPassword) {
        const response = api.post(`/users/changePasswordUser`, {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
        });

    return response?true:false;
    }
}

const userService = new UserService();
export default userService;
