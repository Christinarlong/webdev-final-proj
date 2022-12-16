import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersPostsThunk } from "./posts-thunks.js";

const postsReducer = createSlice({
	name: "posts",
	initialState: {
		posts: [],
		loading: false,
	},
	extraReducers: {
		[getAllUsersPostsThunk.fulfilled]: (state, action) => {
			state.posts = action.payload;
			state.loading = false;
		},
	},
});

export default postsReducer.reducer;
