import { createSlice } from "@reduxjs/toolkit";
import { createFavoriteThunk, deleteFavoriteThunk, findAllFavoritesThunk, findAllRecipesLikedByUserThunk, findUsersThatLikeRecipeThunk } from "./favorites-thunks";

const initialState = {
    likedByUser: [],
    usersThatLikeRecipe: [],
    allFavorites: []
};

const favoritesReducer = createSlice({
  name: "favorites",
  initialState,
  extraReducers: {
    [createFavoriteThunk.fulfilled]: (state, action) => {
      state.usersThatLikeRecipe = [...state.usersThatLikeRecipe, action.payload.user]
    },
    [deleteFavoriteThunk.fulfilled]: (state, action) => {
        const index = state.usersThatLikeRecipe.findIndex(t => t === action.payload.user)
        if (index > -1) {
            state.usersThatLikeRecipe.splice(index, 1);
        }
    },
    [findAllRecipesLikedByUserThunk.fulfilled]: (state, action) => {
        state.likedByUser = action.payload;
        state.loading = false;
    },
    [findUsersThatLikeRecipeThunk.fulfilled]: (state, action) => {
        state.usersThatLikeRecipe = action.payload.map(like => like.user._id);
    },
    [findAllFavoritesThunk.fulfilled]: (state, action) => {
      state.allFavorites = action.payload;
  }
  },
});

export default favoritesReducer.reducer;
