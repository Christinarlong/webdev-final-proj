import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsersPosts, getAllPostsForPlan, updateIngredient } from "./posts-service";

export const getAllUsersPostsThunk = createAsyncThunk(
	"getAllUsersPosts",
	async (uid) => await getAllUsersPosts(uid)
);

export const getAllPostsForPlanThunk = createAsyncThunk(
	"getAllPostsForPlan",
	async (pid) => await getAllPostsForPlan(pid)
);

export const updateIngredientThunk = createAsyncThunk(
	"updateIngredient",
	async (info) => await updateIngredient(info)
);
