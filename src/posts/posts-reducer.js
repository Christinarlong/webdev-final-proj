import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersPostsThunk, getAllPostsForPlanThunk, updateIngredientThunk } from "./posts-thunks.js";

const postsReducer = createSlice({
	name: "posts",
	initialState: {
		posts: [], /* For user */
		postsForPlan: [],
		loading: false,
	},
	extraReducers: {
		[getAllUsersPostsThunk.fulfilled]: (state, action) => {
			state.posts = action.payload;
			state.loading = false;
		},
		[getAllPostsForPlanThunk.fulfilled]: (state, action) => {
			state.postsForPlan = action.payload;
			state.loading = false;
		},
		[updateIngredientThunk.fulfilled]: (state, action) => {
			const index = state.postsForPlan.findIndex(post => post._id === action.payload._id)
        if (index > -1) {
			const copy = [...state.postsForPlan];
            copy[index] = action.payload;
			state.postsForPlan = copy;
        }
		},
	},
});

export default postsReducer.reducer;
