import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsersPosts, getAllPostsForPlan } from "./posts-service";

export const getAllUsersPostsThunk = createAsyncThunk(
	"getAllUsersPosts",
	async (uid) => await getAllUsersPosts(uid)
);

export const getAllPostsForPlanThunk = createAsyncThunk(
	"getAllPostsForPlan",
	async (pid) => await getAllPostsForPlan(pid)
);