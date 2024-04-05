import React from "react";
import Switch from "@mui/material/Switch";
import { setIsDoorsOpen } from "../redux/store";
import { useDispatch } from "react-redux";

export default function DoorsOpen() {
    const label = { inputProps: { "aria-label": "Switch demo" } };

    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(setIsDoorsOpen(event.target.checked));
    };

    return (
        <div className="doors-open">
            <p>Open Doors</p>
            <Switch onChange={handleChange} color="warning" />
        </div>
    );
}
