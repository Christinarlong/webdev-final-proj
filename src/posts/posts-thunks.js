import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsersPosts, createPost } from "./posts-service";

export const getAllUsersPostsThunk = createAsyncThunk(
	"getAllUsersPosts",
	async (uid) => await getAllUsersPosts(uid)
);

export const createPostThunk = createAsyncThunk(
	"createPost",
	async (post) => await createPost(post)
);
