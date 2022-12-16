import axios from "axios";

const BASE_API_URL =
	process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

const api = axios.create({ withCredentials: true });

export const getPlanById = async (pid) => {
    const response = await api.get(`${BASE_API_URL}/plans/${pid}`);
    return response.data;
}