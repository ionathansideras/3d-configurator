import { useRef } from "react";
import { setCamera } from "../../redux/store";
import { useDispatch } from "react-redux";
import car from "../../assets/car.png";
import wheel from "../../assets/wheel.png";
import tire from "../../assets/tire.png";

// Define the CameraPosition component
export default function CameraPosition() {
    // Get the dispatch function from the Redux store
    const dispatch = useDispatch();

    // Define refs for the wheel, car, and tire images
    const wheelRef = useRef(null);
    const carRef = useRef(null);
    const tireRef = useRef(null);

    // Define a function to handle the click event
    function handleClick(e, position) {
        // Dispatch the setCamera action with the new position value
        dispatch(setCamera(position));

        // Remove the 'active' class from all images
        wheelRef.current.classList.remove("active");
        carRef.current.classList.remove("active");
        tireRef.current.classList.remove("active");

        // Add the 'active' class to the clicked image
        e.target.classList.add("active");
    }

    // Render the CameraPosition component
    return (
        <div className="camera-controlers">
            <p>Camera View</p>
            <div className="icons">
                <img
                    ref={wheelRef}
                    src={wheel}
                    onClick={(e) =>
                        handleClick(e, {
                            x: -0.33125390968393836,
                            y: 0.17667553935655675,
                            z: -0.3848294547515707,
                            isInside: true,
                        })
                    }
                />
                <img
                    ref={carRef}
                    className="active"
                    src={car}
                    onClick={(e) =>
                        handleClick(e, {
                            x: -0.12753693713244801,
                            y: 2.493258296541688,
                            z: 14.849303552845102,
                            isInside: false,
                        })
                    }
                />
                <img
                    ref={tireRef}
                    src={tire}
                    onClick={(e) =>
                        handleClick(e, {
                            x: 1.8555882238992616,
                            y: 4.982219364165651e-16,
                            z: -7.922168517315024,
                            isInside: false,
                        })
                    }
                />
            </div>
        </div>
    );
}
