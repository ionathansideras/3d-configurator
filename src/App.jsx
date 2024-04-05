import { Configurator } from "./components/configurator/Configurator";
import Loader from "./components/Loader";
import Experience from "./components/Experience";
import { useState, useEffect, useRef } from "react";

// Define the App component
export default function App() {
    // Define a state variable for loading and a function to update it
    const [loading, setLoading] = useState(true);

    // Define a ref for the loader
    const loaderRef = useRef(null);

    // Define an effect that runs when the loading state changes
    useEffect(() => {
        // If loading, make the loader visible and interactive
        if (loading) {
            loaderRef.current.style.opacity = 1;
            loaderRef.current.style.pointerEvents = "all";
        } else {
            // If not loading, make the loader invisible and non-interactive
            loaderRef.current.style.opacity = 0;
            loaderRef.current.style.pointerEvents = "none";
        }
    }, [loading]); // Depend on the loading state

    // Render the App component
    return (
        <>
            <Loader loaderRef={loaderRef} />
            <Experience setLoading={setLoading} />
            <Configurator />
        </>
    );
}
