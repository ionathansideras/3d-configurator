import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";

export default function Colors({ data, dispatchAction, title, storeCode }) {
    // Get the dispatch function from the Redux store
    const dispatch = useDispatch();

    // Get the current color value from the Redux store
    const store = useSelector((state) => state.selections);

    // Define refs for the color buttons
    const colorButtonRefs = useRef([]);

    // Define a function to handle the click event
    function handleColorChange(color, e) {
        // Dispatch the setSelection action with the new color value
        dispatch(dispatchAction(color));

        // Add 'active' class to the clicked button and remove it from the others
        colorButtonRefs.current.forEach((ref) => {
            if (ref === e.target) {
                ref.classList.add("active");
            } else {
                ref.classList.remove("active");
            }
        });
    }

    // Set the active color button when the component mounts based storeCode name
    useEffect(() => {
        colorButtonRefs.current.forEach((ref) => {
            if (ref.id.toLowerCase() === store[storeCode].name.toLowerCase()) {
                ref.classList.add("active");
            } else {
                ref.classList.remove("active");
            }
        });
    }, []);

    return (
        <div>
            <p>{title}</p>
            {data.map((color, index) => (
                <button
                    className="color-button"
                    key={color.value}
                    ref={(el) => (colorButtonRefs.current[index] = el)}
                    style={{ backgroundColor: color.value }}
                    onClick={(e) => handleColorChange(color, e)}
                    title={color.name}
                    id={color.name}
                ></button>
            ))}
        </div>
    );
}
