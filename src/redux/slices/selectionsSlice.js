// Import the createSlice and nanoid functions from Redux Toolkit
// createSlice automatically generates action creators and action types
// nanoid generates unique IDs
import { createSlice } from "@reduxjs/toolkit";

// Create a slice of the Redux store for cars
// A "slice" is a portion of the Redux store where a particular feature keeps its state
const selections = createSlice({
    // The name of the slice. This will be used as a prefix for the generated action types
    name: "selections",
    // The initial state for this slice of the Redux store
    initialState: {
        exteriorColor: "#00ff00",
        isDoorsOpen: false,
        cameraState: {
            x: -0.12753693713244801,
            y: 2.493258296541688,
            z: 14.849303552845102,
        },
        isInside: false,
        seatColor: "#930007",
        interiorColor: "#000000",
    },
    // The reducers for this slice of the Redux store
    // Reducers are functions that determine how the state should be updated in response to an action
    reducers: {
        setSelection: (state, action) => {
            // Update the exteriorColor property of the state with the value from the action
            state.exteriorColor = action.payload;
        },
        setIsDoorsOpen: (state, action) => {
            // Update the isDoorsOpen property of the state with the value from the action
            state.isDoorsOpen = action.payload;
        },
        setCamera: (state, action) => {
            // Update the camera position with the values from the action
            state.cameraState = action.payload;
            if (action.payload.isInside === true) {
                state.isInside = true;
            } else {
                state.isInside = false;
            }
        },
        setSeatColor: (state, action) => {
            // Update the seatColor property of the state with the value from the action
            state.seatColor = action.payload;
        },
        setInteriorColor: (state, action) => {
            // Update the interiorColor property of the state with the value from the action
            state.interiorColor = action.payload;
        },
    },
});

// Export the generated action creators for the cars slice
// These can be used to dispatch actions that the reducers will respond to
export const {
    setSelection,
    setIsDoorsOpen,
    setCamera,
    setSeatColor,
    setInteriorColor,
} = selections.actions;
export const selectionsReducer = selections.reducer;
