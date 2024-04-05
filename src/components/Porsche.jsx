import { useGLTF } from "@react-three/drei";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { doorAnimation } from "../helpers/doorAnimation";

// Define the Porsche component
export function Porsche(props) {
    // Use the useGLTF hook to load the Porsche model from the specified path
    const { scene, materials, nodes } = useGLTF("/models/porsche.glb");

    // Extract the exteriorColor from the Redux store
    const { exteriorColor, isDoorsOpen } = useSelector(
        (state) => state.selections
    );

    // Update the material color
    materials.P918_paint.color.set(exteriorColor);

    // Call the doorAnimation function with the door state
    doorAnimation({ isDoorsOpen });

    // Extract the setLoading function from the props
    const { setLoading } = props;

    // Call the setLoading function with false to indicate that loading is complete
    setLoading(false);

    // Return a primitive component with the loaded scene and any other passed props
    return <primitive object={scene} {...props} />;
}
