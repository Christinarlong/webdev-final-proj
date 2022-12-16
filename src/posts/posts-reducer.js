import { createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD
import { getAllUsersPostsThunk, getAllPostsForPlanThunk, updateIngredientThunk } from "./posts-thunks.js";
=======
import { getAllUsersPostsThunk, createPostThunk } from "./posts-thunks.js";
>>>>>>> 6d36fc87b769dfcb8e7b1c083de16f34295ac926

const postsReducer = createSlice({
	name: "posts",
	initialState: {
		posts: [], /* For user */
		postsForPlan: [],
		loading: false,
		lastCreatedPost: null,
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
		[createPostThunk.fulfilled]: (state, action) => {
			state.lastCreatedPost = action.payload;
			state.loading = false;
		},
	},
});

export default postsReducer.reducer;
