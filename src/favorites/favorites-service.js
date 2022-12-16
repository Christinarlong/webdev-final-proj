import axios from "axios";

const BASE_API_URL =
	process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

const api = axios.create({ withCredentials: true });

export const deleteFavorite = async (recipeId) => {
    const response = await api.delete(`${BASE_API_URL}/likes/${recipeId}`);
    return response.data;
}

export const createFavorite = async ({recipeId, recipeName}) => {
    const response = await api.post(`${BASE_API_URL}/likes/${recipeId}`, { recipeName: recipeName});
    return response.data;
}

export const findAllRecipesLikedByUser = async (uid) => {
	const response = await api.get(`${BASE_API_URL}/users/${uid}/likes`);
	return response.data;
};

export const findUsersThatLikeRecipe = async (rid) => {
	const response = await api.get(`${BASE_API_URL}/recipes/${rid}/likes`);
	return response.data;
};