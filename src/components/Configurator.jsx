// Import necessary hooks from libraries
import { useRef } from "react";
// Import assets
import dots from "../assets/drag-dots.svg";
import arrow from "../assets/arrow.png";
import { useDispatch } from "react-redux";
import { setColor } from "../redux/slices/colorsSlice";
import { exteriorColors } from "../data/exteriorColorsData";

// Define the Configurator component
function Configurator() {
    // Define refs for the panel and the arrow
    const panel = useRef(null);
    const arrowRef = useRef(null);

    // Get the dispatch function from the Redux store
    const dispatch = useDispatch();

    // Define refs for the color buttons
    const colorButtonRefs = useRef([]);

    // Define a function to handle dragging and moving the panel
    function handleDragAndMove(event) {
        event.preventDefault();
        const mouse = { x: 0, y: 0 };
        // Determine the event type (mouse or touch)
        const moveEvent = event.type.includes("touch")
            ? event.touches[0]
            : event;
        // Define a function to handle mouse movement
        const onMouseMove = (event) => {
            // Determine the event type (mouse or touch)
            const moveEvent = event.type.includes("touch")
                ? event.touches[0]
                : event;
            // Update the mouse position
            mouse.x = moveEvent.clientX - 150;
            mouse.y = moveEvent.clientY - 25;
            // Change the position of the panel
            panel.current.style.left = `${mouse.x}px`;
            panel.current.style.top = `${mouse.y}px`;
        };
        // Define a function to handle mouse up (end of dragging)
        const onMouseUp = () => {
            // Remove the event listeners
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchmove", onMouseMove);
            window.removeEventListener("touchend", onMouseUp);
        };
        // Add the event listeners
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchmove", onMouseMove);
        window.addEventListener("touchend", onMouseUp);
    }

    // Define a function to handle the dropdown
    function handleDropDown() {
        // If the arrow is down, make it up and shrink the panel
        if (arrowRef.current.classList.contains("down")) {
            arrowRef.current.classList.remove("down");
            panel.current.style.height = "50px";
        } else if (!arrowRef.current.classList.contains("down")) {
            // If the arrow is up, make it down and expand the panel
            arrowRef.current.classList.add("down");
            panel.current.style.height = "fit-content";
        }
    }

    // Define a function to handle the click event
    function handleColorChange(color, e) {
        console.log("Clicked on red button");
        // Dispatch the setColor action with the new color value
        dispatch(setColor(color));

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

    // Render the Configurator component
    return (
        <main ref={panel}>
            <div className="panel-controls">
                <img
                    src={arrow}
                    ref={arrowRef}
                    onClick={handleDropDown}
                    draggable="false"
                    className="arrow"
                />
                <img
                    src={dots}
                    onMouseDown={handleDragAndMove}
                    onTouchStart={handleDragAndMove}
                    draggable="false"
                    className="dots"
                />
            </div>
            <div className="panel-content">
                <div className="exterior-colors">
                    <p>Exterior Colors</p>
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
            </div>
        </main>
    );
}

// Export the Configurator component
export { Configurator };
