import axios from "axios";

const BASE_API_URL =
	process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

const api = axios.create({ withCredentials: true });

export const getAllUsersPosts = async (uid) => {
	const response = await api.get(`${BASE_API_URL}/users/${uid}/posts`);
	const user = response.data;
	return user;
};
