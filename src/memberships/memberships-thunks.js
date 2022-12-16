import {createAsyncThunk} from "@reduxjs/toolkit";
import { getAllPlansForUser, getAllUsersForPlan, addUserToPlan, removeUserFromPlan, updateUserForPlan } from "./memberships-service.js";

export const getAllPlansForUserThunk = createAsyncThunk(
    'getAllPlansForUser',
    (uid) => getAllPlansForUser(uid)
);

export const getAllUsersForPlanThunk = createAsyncThunk(
    'getAllUsersForPlan',
    (pid) => getAllUsersForPlan(pid)
);

export const addUserToPlanThunk = createAsyncThunk(
    'addUserToPlan',
    (addInfo) => addUserToPlan(addInfo)
);

export const removeUserFromPlanThunk = createAsyncThunk(
    'removeUserFromPlan',
    (removeInfo) => removeUserFromPlan(removeInfo)
);

export const updateUserForPlanThunk = createAsyncThunk(
    'updateUserForPlan',
    (info) => updateUserForPlan(info)
);