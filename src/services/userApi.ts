import axios from "axios";
import { User } from "../Models/User";

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

export const getUserById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch(ex) {
        console.error("Error while fetching user by id", ex);
        throw ex;
    }
};

export const createUser = async (user: User) => {
    try {
        const response = await axios.post(API_URL, user);
        return response.data;
    } catch(ex) {
        console.error("Error while creating user", ex);
        throw ex;
    }
};

export const updateUser = async (user: User) => {
    try {
        const response = await axios.put(`${API_URL}/${user.id}`, user);
        return response.data;
    } catch(ex) {
        console.error("Error while updating user", ex);
        throw ex;
    }
}

export const DeleteUser = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch(ex) {
        console.error("Error while deleting user", ex);
        throw ex;
    }
}