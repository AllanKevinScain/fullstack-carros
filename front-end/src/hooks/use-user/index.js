import { api } from "../../api";

export function useUser() {
    async function listUsers() {
        const response = await api.get("/usuario");
        if (response.status === 201) return [];
        return response.data
    }

    async function getUserById(id) {
        const response = await api.get(`/usuario/${id}`);
        return response.data;
    }

    async function putUser(values) {
        const { id, ...rest } = values;
        await api.put(`/usuario/${id}`, rest);
    }

    async function createUser(values) {
        await api.post("/usuario", values);
    }

    async function deleteUser(id) {
        await api.delete(`/usuario/${id}`);
    }

    return {
        createUser,
        putUser,
        getUserById,
        listUsers,
        deleteUser
    };
}
