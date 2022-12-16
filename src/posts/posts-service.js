import axios from "axios";

const BASE_API_URL =
	process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

const api = axios.create({ withCredentials: true });

export const getAllUsersPosts = async (uid) => {
	const response = await api.get(`${BASE_API_URL}/users/${uid}/posts`);
	const user = response.data;
	return user;
};

export const createPost = async (post) => {
	console.log("SENT", post);
	const response = await api.post(
		`${BASE_API_URL}/plans/${post.planId}/posts`,
		post.body
	);
	console.log("RECV", response);
	const postResponse = response.data;
	return postResponse;
};
