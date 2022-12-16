import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersPostsThunk, getAllPostsForPlanThunk } from "./posts-thunks.js";

const postsReducer = createSlice({
	name: "posts",
	initialState: {
		posts: [],
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
	},
});

export default postsReducer.reducer;
