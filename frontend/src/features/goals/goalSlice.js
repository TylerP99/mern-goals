import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

// Get goals
export const getGoals = createAsyncThunk("/goals/get", 
async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.getGoals(token);
    }
    catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

// Create goal
export const createGoal = createAsyncThunk("/goals/create", 
async (goal, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.createGoal(goal, token);
    }
    catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

// Update goal
export const updateGoal = createAsyncThunk("/goals/update", 
async (updatedGoal, goalID, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.updateGoal(updatedGoal, goalID, token);
    }
    catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

// Delete goal
export const deleteGoal = createAsyncThunk("/goals/delete", 
async (goalID, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.deleteGoal(goalID, token);
    }
    catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});


export const goalSlice = createSlice({
    name: "goal",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        // Get Goals
        .addCase(getGoals.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getGoals.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.goals = action.payload;
        })
        .addCase(getGoals.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload
        })
        // Create goal
        .addCase(createGoal.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createGoal.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.goals.push(action.payload);
        })
        .addCase(createGoal.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload
        })
        // Update goal
        .addCase(updateGoal.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateGoal.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.goals = state.goals.map(x => (x._id === action.payload.id) ? action.payload : x);
        })
        .addCase(updateGoal.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload
        })
        // Delete goal
        .addCase(deleteGoal.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteGoal.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.goals = state.goals.filter(x => x._id !== action.payload._id)
            console.log(action.payload);
        })
        .addCase(deleteGoal.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload
        })
    }
});

export const {reset} = goalSlice.actions;
export default goalSlice.reducer;