// This function is used to create a Redux store
import { configureStore } from "@reduxjs/toolkit";

// Import the action creators and the reducer from the cars slice
import {
    setSelection,
    setIsDoorsOpen,
    setCamera,
    setSeatColor,
    setInteriorColor,
    setRimColor,
    setDiscBrakeColor,
    setIsPdfClicked,
    setPdfPhotos,
    clearPdfPhotos,
} from "./slices/selectionsSlice";
import { selectionsReducer } from "./slices/selectionsSlice";

// Create a Redux store
// The store is configured with reducers for the 'cars' and 'form' slices of the state
const store = configureStore({
    reducer: {
        selections: selectionsReducer, // The reducer for the 'colors' slice of the state
    },
});

// Export the store and the action creators
// The store is used by the application to manage its state
// The action creators are used to dispatch actions to the store
// we export everything from the store so that we can use it in other files
// because its better to call the action creators from the store than to call them from the slices
export {
    store,
    setSelection,
    setIsDoorsOpen,
    setCamera,
    setSeatColor,
    setInteriorColor,
    setRimColor,
    setDiscBrakeColor,
    setIsPdfClicked,
    setPdfPhotos,
    clearPdfPhotos,
};
