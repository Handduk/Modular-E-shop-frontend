import axios from "axios";
import { User } from "../Models/User";

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

export const getUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch(ex) {
        console.error("Error while fetching users", ex);
        throw ex;
    }
}

export const getUserById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch(ex) {
        console.error("Error while fetching user by id", ex);
        throw ex;
    }
};

export const getUserByRole = async (role: string) => {
    try {
        const response = await axios.get(`${API_URL}/role/${role}`);
        return response.data;
    } catch(ex) {
        console.error("Error while fetching user by role", ex);
        throw ex;
    }
}   

export const createUser = async (user: User) => {
    try {
        const response = await axios.post(API_URL, user);
        return response.data;
    } catch(ex) {
        console.error("Error while creating user", ex);
        throw ex;
    }
};

export const createReseller = async (user: FormData) => {
    try {
        const response = await axios.post<User>(`${API_URL}/reseller`, user);
        return response.data;
    } catch(ex) {
        console.error("Error while creating reseller", ex);
        throw ex;
    }
}

export const updateUser = async (user: FormData) => {
    try {
        const id = parseInt(user.get("id") as string, 10);
        const response = await axios.put(`${API_URL}/${id}`, user);
        return response.data;
    } catch(ex) {
        console.error("Error while updating user", ex);
        throw ex;
    }
}

export const DeleteUser = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.status;
    } catch(ex) {
        console.error("Error while deleting user", ex);
        throw ex;
    }
}

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        
        if(!response || !response.data) {
            return null;
        }

        return response.data;
    } catch(ex) {
        return null;
    }
}