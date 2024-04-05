import React, { useRef } from "react";
import { exteriorColors } from "../data/exteriorColorsData";
import { useDispatch } from "react-redux";
import { setSelection } from "../redux/store";

export default function ExteriorColors() {
    // Get the dispatch function from the Redux store
    const dispatch = useDispatch();

    // Define refs for the color buttons
    const colorButtonRefs = useRef([]);

    // Define a function to handle the click event
    function handleColorChange(color, e) {
        console.log("Clicked on red button");
        // Dispatch the setSelection action with the new color value
        dispatch(setSelection(color));

        console.log(e.target.id);

        // Add 'active' class to the clicked button and remove it from the others
        colorButtonRefs.current.forEach((ref) => {
            if (ref === e.target) {
                ref.classList.add("active");
            } else {
                ref.classList.remove("active");
            }
        });
    }
    return (
        <div className="exterior-colors">
            <p>Exterior Color</p>
            {exteriorColors.map((color, index) => (
                <button
                    key={color.value}
                    ref={(el) => (colorButtonRefs.current[index] = el)}
                    style={{ backgroundColor: color.value }}
                    onClick={(e) => handleColorChange(color.value, e)}
                    title={color.name}
                    id={color.name}
                ></button>
            ))}
        </div>
    );
}
