import axios from "axios";

const SPOONACULAR_API_KEY = "adc215ee21df4f0dbdc2e6296dfbadc1";
const RECIPES_URL = `https://api.spoonacular.com/recipes`;

export const searchRecipeByTerm = async (term) => {
	const response = await axios.get(
		`${RECIPES_URL}/complexSearch?instructionsRequired=true&apiKey=${SPOONACULAR_API_KEY}&query=${term}`
	);
	return response.data.results;
};

export const getRecipeDetailsById = async (recipeId) => {
	const response = await axios.get(
		`${RECIPES_URL}/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`
	);
	return response.data;
};
