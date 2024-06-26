// Import necessary hooks from libraries
import { useRef } from "react";
// Import assets
import dots from "../../assets/drag-dots.svg";
import arrow from "../../assets/arrow.png";
// Import the openDropDown function
import { openDropDown } from "../../helpers/openDropDown";
// Import the dragMovePanel function
import { dragMovePanel } from "../../helpers/dragMovePanel";
import DoorsOpen from "./DoorsOpen";
import CameraPosition from "./CameraPosition";
import {
    setSelection,
    setSeatColor,
    setInteriorColor,
    setRimColor,
    setDiscBrakeColor,
} from "../../redux/store";
import Colors from "./Colors";
import { exteriorColorsData } from "../../data/exteriorColorsData";
import { seatColorsData } from "../../data/seatColorsData";
import { interiorColorsData } from "../../data/interiorColorsData";
import { setRimColorData } from "../../data/setRimColorData";
import { discBrakeColorData } from "../../data/discBrakeColorData";
import PdfButton from "./PdfButton";
import Chat from "./Chat.jsx";

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
                    className="arrow down"
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
                <CameraPosition />
                <p>Extra</p>
                <div className="extra">
                    <PdfButton />
                    <Chat />
                </div>
                <DoorsOpen />

                <Colors
                    data={exteriorColorsData}
                    dispatchAction={setSelection}
                    title="Exterior Color"
                    storeCode="exteriorColor"
                />
                <Colors
                    data={seatColorsData}
                    dispatchAction={setSeatColor}
                    title="Seat Color"
                    storeCode="seatColor"
                />
                <Colors
                    data={interiorColorsData}
                    dispatchAction={setInteriorColor}
                    title="Interior Color"
                    storeCode="interiorColor"
                />
                <Colors
                    data={setRimColorData}
                    dispatchAction={setRimColor}
                    title="Rim Color"
                    storeCode="rimColor"
                />
                <Colors
                    data={discBrakeColorData}
                    dispatchAction={setDiscBrakeColor}
                    title="Disc Brake Color"
                    storeCode="discBrakeColor"
                />
            </div>
        </main>
    );
}

// Export the Configurator component
export { Configurator };
