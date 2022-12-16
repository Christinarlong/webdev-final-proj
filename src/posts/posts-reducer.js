import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersPostsThunk, createPostThunk } from "./posts-thunks.js";

const postsReducer = createSlice({
	name: "posts",
	initialState: {
		posts: [],
		loading: false,
		lastCreatedPost: null,
	},
	extraReducers: {
		[getAllUsersPostsThunk.fulfilled]: (state, action) => {
			state.posts = action.payload;
			state.loading = false;
		},
		[createPostThunk.fulfilled]: (state, action) => {
			state.lastCreatedPost = action.payload;
			state.loading = false;
		},
	},
});

export default postsReducer.reducer;
