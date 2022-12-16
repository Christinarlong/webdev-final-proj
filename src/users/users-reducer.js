import { createSlice } from "@reduxjs/toolkit";
import {
	findAllUsersThunk,
	findUserByIdThunk,
	loginThunk,
	logoutThunk,
	profileThunk,
	registerThunk,
	findAllRecipesLikedByUserThunk,
	updateUserThunk,
} from "./users-thunks.js";

const usersReducer = createSlice({
	name: "users",
	initialState: {
		users: [],
		loading: false,
		currentUser: null,
		publicProfile: null,
		likedByUser: [],
	},
	extraReducers: {
		[findUserByIdThunk.fulfilled]: (state, action) => {
			state.publicProfile = action.payload;
		},
		[logoutThunk.fulfilled]: (state, action) => {
			state.currentUser = null;
		},
		[profileThunk.fulfilled]: (state, action) => {
			state.currentUser = action.payload;
		},
		[registerThunk.fulfilled]: (state, action) => {
			state.currentUser = action.payload;
		},
		[loginThunk.fulfilled]: (state, action) => {
			state.currentUser = action.payload;
		},
		[findAllUsersThunk.fulfilled]: (state, action) => {
			state.users = action.payload;
			state.loading = false;
		},
		[updateUserThunk.fulfilled]: (state, action) => {
			state.currentUser = action.payload;
			state.loading = false;
		},
	},
});

export default usersReducer.reducer;
