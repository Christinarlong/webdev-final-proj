import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersPostsThunk, getAllPostsForPlanThunk, updateIngredientThunk, createPostThunk, deletePostThunk, voteForPostThunk } from "./posts-thunks.js";

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
		[deletePostThunk.fulfilled]: (state, action) => {
			const index = state.postsForPlan.findIndex(post => post._id === action.payload._id)
        if (index > -1) {
            state.postsForPlan.splice(index, 1);
        }
		},
		[voteForPostThunk.fulfilled]: (state, action) => {
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
