// Import the createSlice and nanoid functions from Redux Toolkit
// createSlice automatically generates action creators and action types
// nanoid generates unique IDs
import { createSlice } from "@reduxjs/toolkit";

// Create a slice of the Redux store for cars
// A "slice" is a portion of the Redux store where a particular feature keeps its state
const colorsSlice = createSlice({
    // The name of the slice. This will be used as a prefix for the generated action types
    name: "colors",
    // The initial state for this slice of the Redux store
    initialState: {
        exteriorColor: "#3ff803",
    },
    // The reducers for this slice of the Redux store
    // Reducers are functions that determine how the state should be updated in response to an action
    reducers: {
        setColor: (state, action) => {
            // Update the exteriorColor property of the state with the value from the action
            state.exteriorColor = action.payload;
        },
    },
});

// Export the generated action creators for the cars slice
// These can be used to dispatch actions that the reducers will respond to
export const { setColor } = colorsSlice.actions;
export const colorsReducer = colorsSlice.reducer;
