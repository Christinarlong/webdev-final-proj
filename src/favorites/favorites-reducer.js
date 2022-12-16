import { createSlice } from "@reduxjs/toolkit";
import { createFavoriteThunk, deleteFavoriteThunk, findAllRecipesLikedByUserThunk, findUsersThatLikeRecipeThunk } from "./favorites-thunks";

const initialState = {
    likedByUser: [],
    usersThatLikeRecipe: []
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
    }
  },
});

export default favoritesReducer.reducer;
