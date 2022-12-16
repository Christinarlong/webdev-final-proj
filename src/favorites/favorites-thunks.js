import {createAsyncThunk} from "@reduxjs/toolkit";
import { deleteFavorite, createFavorite, findAllRecipesLikedByUser, findUsersThatLikeRecipe, findAllFavorites } from "./favorites-service";

export const deleteFavoriteThunk = createAsyncThunk(
    'deleteFavorite',
    (recipeId) => deleteFavorite(recipeId)
);

export const createFavoriteThunk = createAsyncThunk(
    'createFavorite',
    (recipeInfo) => createFavorite(recipeInfo)
);

export const findAllRecipesLikedByUserThunk = createAsyncThunk(
	"findAllRecipesLikedByUser",
	async (uid) => await findAllRecipesLikedByUser(uid)
);

export const findUsersThatLikeRecipeThunk = createAsyncThunk(
    "findUsersThatLikeRecipe",
    async (rid) => await findUsersThatLikeRecipe(rid)
);

export const findAllFavoritesThunk = createAsyncThunk(
    "findAllFavorites",
    async (rid) => await findAllFavorites(rid)
);