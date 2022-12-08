import {createAsyncThunk} from "@reduxjs/toolkit";
import {searchRecipeByTerm} from "./spoonacular-service";

export const searchRecipeByTermThunk = createAsyncThunk(
    'searchRecipeByTerm',
    (term) => searchRecipeByTerm(term)
)
/*
export const findMovieByImdbIdThunk = createAsyncThunk(
    'findMovieByImdbId',
    (imdbID) => findMovieByImdbId(imdbID)
)*/