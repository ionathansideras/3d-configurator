import { useDispatch } from "react-redux";
import { useRef } from "react";

export default function Colors({ data, dispatchAction, title }) {
    // Get the dispatch function from the Redux store
    const dispatch = useDispatch();

    // Define refs for the color buttons
    const colorButtonRefs = useRef([]);

    // Define a function to handle the click event
    function handleColorChange(color, e) {
        console.log("Clicked on red button");
        // Dispatch the setSelection action with the new color value
        dispatch(dispatchAction(color));

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
        <div>
            <p>{title}</p>
            {data.map((color, index) => (
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
