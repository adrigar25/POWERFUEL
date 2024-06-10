import api from './axios';

class RoleService{

    async getRoleById(roleId=null) {
        const response = await api.get(`/roles/${roleId}`);
        return response.data;
    }

    async getRoleByUserId(userId) {
        let response;
        if(userId!=null){
            response = await api.get(`/roles/user/${userId}`);
        }else{
            response = await api.post(`/roles/user`);
        }
        return response;
    }

    async deleteRole(roleId) {
        const response = await api.delete(`/roles/${roleId}`);
        return response.data;
    }

    async getRoles(page = 1, limit = 10) {
        const response = await api.get(`/roles?page=${page}&limit=${limit}`);
        return response.data;
    }

    async getAllRoles(){
        const response = await api.get(`/roles/allRoles`);
        return response.data;
    }

    async updateRole(id, roleName) {
        const response = await api.put(`/roles/${id}`, {
            role_name: roleName, 
        });
        return response.data;
    }

    async addRole(roleName) {
        const response = await api.post(`/roles`, {
            role_name: roleName,
        });
        return response.data;
    }
}

const roleService = new RoleService();

export default roleService;
