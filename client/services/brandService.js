import api from "./axios";

class BrandService{
    async getBrandById(id) {
        const response = await api.get(`/brands/${id}`);
        return response.data[0];
    }

    async getBrands(page = 1, limit = 10) {
        const response = await api.get(`/brands?page=${page}&limit=${limit}`);
        return response.data;
    }

    async getAllBrandsNoPagination() {
        const response = await api.get(`/brands`);
        return response.data;
    }

    async addBrand(brand) {
        const response = await api.post(`/brands`, { brand_name: brand });
        return response.data.data;
    }

    async updateBrand(id, brand) {
        const response = await api.put(`/brands/${id}`, {brand_name: brand});
        return response.data.data;
    }

    async deleteBrand(id) {
        return await api.delete(`/brands/${id}`);
    }
}

const brandService = new BrandService();

export default brandService;