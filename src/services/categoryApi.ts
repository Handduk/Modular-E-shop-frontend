import axios from "axios";
import { Category } from "../Models/Category";

const API_URL = `${import.meta.env.VITE_API_URL}/categorys`;

export const getAllCategorys = async () => {
    try {
        const response = await axios.get<Category[]>(API_URL);
        return response.data;
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

export const getSingleCategory = async (id: number) => {
    try {
        const response = await axios.get<Category>(`${API_URL}/${id}`);
        return response.data;
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

export const createCategory = async (category: FormData) => {
    try {
        const response = await axios.post(API_URL, category);
        return response.data;
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

export const updateCategory = async (category: FormData, id: number) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}`, category);
        return response.data;
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}