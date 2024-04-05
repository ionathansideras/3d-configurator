// Define a function to handle dragging and moving the panel
function dragMovePanel({ e, panel }) {
    e.preventDefault();
    const mouse = { x: 0, y: 0 };
    // Determine the event type (mouse or touch)
    const moveEvent = e.type.includes("touch") ? e.touches[0] : e;
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

// Export the handleDragAndMove function
export { dragMovePanel };
