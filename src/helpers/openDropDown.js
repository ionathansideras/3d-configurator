// Define a function to handle the dropdown
function openDropDown({ arrowRef, panel }) {
    // If the arrow is down, make it up and shrink the panel
    if (arrowRef.current.classList.contains("down")) {
        arrowRef.current.classList.remove("down");
        panel.current.style.height = "50px";
    } else if (!arrowRef.current.classList.contains("down")) {
        // If the arrow is up, make it down and expand the panel
        arrowRef.current.classList.add("down");
        panel.current.style.height = "550px";
    }
}

export { openDropDown };
