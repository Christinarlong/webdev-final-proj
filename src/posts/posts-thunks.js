import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsersPosts } from "./posts-service";

export const getAllUsersPostsThunk = createAsyncThunk(
	"getAllUsersPosts",
	async (uid) => await getAllUsersPosts(uid)
);
