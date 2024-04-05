// Import necessary hooks and actions from libraries
import React from "react";
import Switch from "@mui/material/Switch";
import { setIsDoorsOpen } from "../redux/store";
import { useDispatch } from "react-redux";

// Define the DoorsOpen component
export default function DoorsOpen() {
    // Get the dispatch function from the Redux store
    const dispatch = useDispatch();

    // Define a function to handle the change event of the switch
    const handleChange = (event) => {
        // Dispatch the setIsDoorsOpen action with the new checked value
        dispatch(setIsDoorsOpen(event.target.checked));
    };

    // Render the DoorsOpen component
    return (
        <div className="doors-open">
            <p>Open Doors</p>
            <Switch onChange={handleChange} color="warning" />
        </div>
    );
}
