import axios from "axios";

const BASE_API_URL =
	process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

const api = axios.create({ withCredentials: true });

export const findUserById = async (uid) => {
	const response = await api.get(`${BASE_API_URL}/users/${uid}`);
	const user = response.data;
	return user;
};

export const register = async (user) => {
	const response = await api.post(`${BASE_API_URL}/register`, user);
	const newUser = response.data;
	return newUser;
};

export const login = async (user) => {
	const response = await api.post(`${BASE_API_URL}/login`, user);
	return response.data;
};

export const logout = async () => {
	const response = await api.post(`${BASE_API_URL}/logout`);
	return response.data;
};
export const profile = async () => {
	const response = await api.post(`${BASE_API_URL}/profile`);
	return response.data;
};

export const findAllUsers = async () => {
	const response = await api.get(`${BASE_API_URL}/users`);
	return response.data;
};

export const updateUser = async (user) => {
	const response = await api.put(`${BASE_API_URL}/users/${user.uid}`, user);
	return response.data;
};

// TODO: delete these?
const createUser = (user) => {};
const deleteUser = () => {};
