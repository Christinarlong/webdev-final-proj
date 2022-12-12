import {createAsyncThunk} from "@reduxjs/toolkit";
import {searchRecipeByTerm, getRecipeDetailsById} from "./spoonacular-service";

export const searchRecipeByTermThunk = createAsyncThunk(
    'searchRecipeByTerm',
    (term) => searchRecipeByTerm(term)
);

export const getRecipeDetailsByIdThunk = createAsyncThunk(
    'getRecipeDetailsById',
    (recipeId) => getRecipeDetailsById(recipeId)
);