import axios from "axios";

const SPOONACULAR_API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const SEARCH_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}`;
//const DETAILS_URL = 'https://omdbapi.com/?apikey=852159f0&i=';

export const searchRecipeByTerm = async (term) => {
    const response = await axios.get(`${SEARCH_URL}&query=${term}`);
    return response.data.results;
}

/*export const findMovieByImdbId = async (imdbID) => {
    const response = await axios.get(`${DETAILS_URL}${imdbID}`)
    return response.data
}*/