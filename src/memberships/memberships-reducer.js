import { createSlice } from "@reduxjs/toolkit";
import { getAllPlansForUserThunk, getAllUsersForPlanThunk, addUserToPlanThunk, removeUserFromPlanThunk } from "./memberships-thunks.js";

const initialState = {
    plansForUser: undefined,
    usersForPlan: undefined
};

const membershipsReducer = createSlice({
  name: "memberships",
  initialState,
  extraReducers: {
    [addUserToPlanThunk.fulfilled]: (state, action) => {
        let ownersArr = [...state.usersForPlan.owners];
        let plannersArr = [...state.usersForPlan.planners];
        let guestsArr = [...state.usersForPlan.guests];
        if (action.payload.role === 'owner') {
            ownersArr.push(action.payload.user);
        } else if (action.payload.role === 'planner') {
            plannersArr.push(action.payload.user);
        } else {
            guestsArr.push(action.payload.user);
        }
        state.usersForPlan = {owners: ownersArr, planners: plannersArr, guests: guestsArr};
    },
    [removeUserFromPlanThunk.fulfilled]: (state, action) => {
        if (action.payload.role === 'owner') {
            const index = state.usersForPlan.owners.findIndex(u => u === action.payload.user);
            if (index > -1) {
                state.usersForPlan.owners.splice(index, 1);
            }
        } else if (action.payload.role === 'planner') {
            const index = state.usersForPlan.planners.findIndex(u => u === action.payload.user);
            if (index > -1) {
                state.usersForPlan.planners.splice(index, 1);
            }
        } else {
            const index = state.usersForPlan.guests.findIndex(u => u === action.payload.user);
            if (index > -1) {
                state.usersForPlan.guests.splice(index, 1);
            }
        }
    },
    [getAllPlansForUserThunk.fulfilled]: (state, action) => {
        let ownersArr = [];
        let plannersArr = [];
        let guestsArr = [];
        action.payload.forEach(membership => {
            if (membership.role === 'owner') {
                ownersArr.push(membership.plan);
            } else if (membership.role === 'planner') {
                plannersArr.push(membership.plan);
            } else {
                guestsArr.push(membership.plan);
            }
        });
        state.plansForUser = {owners: ownersArr, planners: plannersArr, guests: guestsArr};
    },
    [getAllUsersForPlanThunk.fulfilled]: (state, action) => {
        let ownersArr = [];
        let plannersArr = [];
        let guestsArr = [];
        action.payload.forEach(membership => {
            if (membership.role === 'owner') {
                ownersArr.push(membership.user._id);
            } else if (membership.role === 'planner') {
                plannersArr.push(membership.user._id);
            } else {
                guestsArr.push(membership.user._id);
            }
        });
        state.usersForPlan = {owners: ownersArr, planners: plannersArr, guests: guestsArr};
    }
  },
});

export default membershipsReducer.reducer;
