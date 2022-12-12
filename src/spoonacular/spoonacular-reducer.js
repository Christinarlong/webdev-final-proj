import { createSlice } from "@reduxjs/toolkit";
import { searchRecipeByTermThunk, getRecipeDetailsByIdThunk } from "./spoonacular-thunks";

const initialState = {
  recipes: [],
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
    [getRecipeDetailsByIdThunk.fulfilled]: (state, action) => {
      state.details = action.payload
    },
  },
});

export default spoonacularReducer.reducer;
