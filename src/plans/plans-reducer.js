import { createSlice } from "@reduxjs/toolkit";
import { getPlanByIdThunk } from './plans-thunks.js';
const initialState = {
    currentPlan: undefined,
};

const PlansReducer = createSlice({
  name: "plans",
  initialState,
  extraReducers: {
    [getPlanByIdThunk.fulfilled]: (state, action) => {
        state.currentPlan = action.payload;
    },
  },
});

export default PlansReducer.reducer;
