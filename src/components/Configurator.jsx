import { useRef } from "react";
import dots from "../assets/drag-dots.svg";
import arrow from "../assets/arrow.png";

function Configurator() {
    const panel = useRef(null);
    const arrowRef = useRef(null);

    function handleDragAndMove(event) {
        event.preventDefault();
        const mouse = { x: 0, y: 0 };
        const moveEvent = event.type.includes("touch")
            ? event.touches[0]
            : event;
        const onMouseMove = (event) => {
            const moveEvent = event.type.includes("touch")
                ? event.touches[0]
                : event;
            mouse.x = moveEvent.clientX - 150;
            mouse.y = moveEvent.clientY - 25;
            // change the position of the panel fixed element
            panel.current.style.left = `${mouse.x}px`;
            panel.current.style.top = `${mouse.y}px`;
        };
        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchmove", onMouseMove);
            window.removeEventListener("touchend", onMouseUp);
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchmove", onMouseMove);
        window.addEventListener("touchend", onMouseUp);
    }

    function handleDropDown() {
        if (arrowRef.current.classList.contains("down")) {
            arrowRef.current.classList.remove("down");
            panel.current.style.height = "50px";
        } else if (!arrowRef.current.classList.contains("down")) {
            arrowRef.current.classList.add("down");
            panel.current.style.height = "300px";
        }
    }

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
        </main>
    );
}

export { Configurator };
