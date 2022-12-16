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
	const response = await api.post(
		`${BASE_API_URL}/plans/${post.planId}/posts`,
		post.body
	);

	const postResponse = response.data;
	return postResponse;
};
export const getAllPostsForPlan = async (pid) => {
	const response = await api.get(`${BASE_API_URL}/plans/${pid}/posts`);
	const posts = response.data;
	return posts;
};

export const updateIngredient = async ({pid, postId, ingredient, owned}) => {
	const response = await api.put(`${BASE_API_URL}/plans/${pid}/posts/${postId}/ingredients`, { ingredient: ingredient, owned: owned});
	const posts = response.data;
	return posts;
};

export const deletePost = async ({pid, postId}) => {
	const response = await api.delete(`${BASE_API_URL}/plans/${pid}/posts/${postId}`);
	const deletedPost = response.data;
	return deletedPost;
};