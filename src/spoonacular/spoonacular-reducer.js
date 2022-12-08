import { createSlice } from "@reduxjs/toolkit";
import { searchRecipeByTerm } from "./spoonacular-service";
import { searchRecipeByTermThunk } from "./spoonacular-thunks";

const initialState = {
  movies: [],
  loading: false,
  details: {},
};

const spoonacularReducer = createSlice({
  name: "spoonacular",
  initialState,
  extraReducers: {
    [searchRecipeByTermThunk.fulfilled]: (state, action) => {
      state.recipes = action.payload;
    },
    /*[findMovieByImdbIdThunk.fulfilled]: (state, action) => {
            state.details = action.payload
        }*/
  },
});

export default spoonacularReducer.reducer;
