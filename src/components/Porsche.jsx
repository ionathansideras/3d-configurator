import { useGLTF } from "@react-three/drei";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { doorAnimation } from "../helpers/doorAnimation";
import { useThree, useFrame } from "@react-three/fiber";

// Define the Porsche component
export function Porsche(props) {
    // Use the useGLTF hook to load the Porsche model from the specified path
    const { scene, materials } = useGLTF("/models/porsche.glb");

    // Extract the exteriorColor from the Redux store
    const { exteriorColor, isDoorsOpen, cameraState } = useSelector(
        (state) => state.selections
    );

    // the camera from the useThree hook
    const { camera } = useThree();

    // Update the camera position based on the cameraState
    useEffect(() => {
        camera.position.set(cameraState.x, cameraState.y, cameraState.z);
    }, [cameraState]);

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
