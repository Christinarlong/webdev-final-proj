import axios from "axios";

const BASE_API_URL =
	process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

const api = axios.create({ withCredentials: true });

export const getAllPlansForUser = async (uid) => {
    const response = await api.get(`${BASE_API_URL}/users/${uid}/plans`);
    return response.data;
}

export const getAllUsersForPlan = async (pid) => {
    const response = await api.get(`${BASE_API_URL}/plans/${pid}/users`);
    return response.data;
}

export const addUserToPlan = async ({pid, uid, role}) => {
    const response = await api.post(`${BASE_API_URL}/memberships/${pid}/${uid}`, { role: role });
    return response.data;
}


export const updateUserForPlan = async ({pid, uid, role}) => {
    const response = await api.put(`${BASE_API_URL}/memberships/${pid}/${uid}`, { role: role });
    return response.data;
}

export const removeUserFromPlan = async ({pid, uid}) => {
    const response = await api.delete(`${BASE_API_URL}/memberships/${pid}/${uid}`);
    return response.data;
}