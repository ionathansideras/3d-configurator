// Import necessary hooks from libraries
import { useRef } from "react";
// Import assets
import dots from "../assets/drag-dots.svg";
import arrow from "../assets/arrow.png";
import ExteriorColors from "./ExteriorColors";
// Import the openDropDown function
import { openDropDown } from "../helpers/openDropDown";
// Import the dragMovePanel function
import { dragMovePanel } from "../helpers/dragMovePanel";
import DoorsOpen from "./DoorsOpen";

// Define the Configurator component
function Configurator() {
    // Define refs for the panel and the arrow
    const panel = useRef(null);
    const arrowRef = useRef(null);

    // Render the Configurator component
    return (
        <main ref={panel}>
            <div className="panel-controls">
                <img
                    src={arrow}
                    ref={arrowRef}
                    onClick={() => openDropDown({ arrowRef, panel })}
                    draggable="false"
                    className="arrow"
                />
                <img
                    src={dots}
                    onMouseDown={(e) => dragMovePanel({ e, panel })}
                    onTouchStart={(e) => dragMovePanel({ e, panel })}
                    draggable="false"
                    className="dots"
                />
            </div>
            <div className="panel-content">
                <ExteriorColors />
                <DoorsOpen />
            </div>
        </main>
    );
}

// Export the Configurator component
export { Configurator };
