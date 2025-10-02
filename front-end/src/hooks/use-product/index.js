import { api } from "../../api";

export function useProducts() {
    async function listProducts(params) {
        let response;
        if (params) {
            response = await api.get(`/carro/pesquisar?${params}`);
        } else {
            response = await api.get("/carro");
        }
        if (response.status === 201) return [];
        return response.data
    }

    async function getProductById(id) {
        const response = await api.get(`/carro/${id}`);
        return response.data;
    }

    async function putProduct(values) {
        const { id, ...rest } = values;
        await api.put(`/carro/${id}`, rest);
    }

    async function createProduct(values) {
        await api.post("/carro", values);
    }

    async function deleteProduct(id) {
        await api.delete(`/carro/${id}`);
    }

    return {
        createProduct,
        putProduct,
        getProductById,
        listProducts,
        deleteProduct
    };
}
