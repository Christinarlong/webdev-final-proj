import {createAsyncThunk} from "@reduxjs/toolkit";
import { getPlanById } from "./plans-service.js";

export const getPlanByIdThunk = createAsyncThunk(
    'getPlanById',
    (pid) => getPlanById(pid)
);
