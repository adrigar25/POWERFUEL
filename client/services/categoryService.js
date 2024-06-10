import api from './axios.js';

class CategoryService {
     async getCategoryById(categoryId) {
        try {
            const response = await api.get(`/categories/${categoryId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching category:', error.message);
        }
    };

    async getCategories(page = null, limit = null) {
       try {
          const url = `/categories${page ? `?page=${page}` : ''}${limit ? `&limit=${limit}` : ''}`;
          const response = await api.get(url);
          return response.data;
       } catch (error) {
          console.error('Error fetching categories:', error.message);
       }
    };

     async createCategory(category) {
        try {
            const response = await api.post('/categories', category);
            return response.data;
        } catch (error) {
            console.error('Error adding category:', error.message);
        }
    };

     async updateCategory(id, category) {
        try {
            const response = await api.put(`/categories/${id}`, category);
            return response.data;
        } catch (error) {
            console.error('Error updating category:', error.message);
        }
    };

     async deleteCategory(id) {
        try {
            const response = await api.delete(`/categories/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting category:', error.message);
        }
    };

     async getParentCategories() {
        try {
            const response = await api.get('/categories/parent');
            return response.data;
        } catch (error) {
            console.error('Error fetching parent categories:', error.message);
        }
    };

     async getChildCategories(categoryId) {
        try {
            const response = await api.get(`/categories/${categoryId}/child`);
            return response.data.categories??[];
        } catch (error) {
            console.error('Error fetching child categories:', error.message);
        }
    };

    async getAllCategories() {
        try {
            const response = await api.post('/categories/all');
            return response.data;
        } catch (error) {
            console.error('Error fetching all categories:', error.message);
        }
    }
}

const categoryService = new CategoryService();

export default categoryService;