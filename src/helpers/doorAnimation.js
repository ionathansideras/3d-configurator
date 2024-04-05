import { useFrame } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";

function doorAnimation({ isDoorsOpen }) {
    // Use the useGLTF hook to load the Porsche model from the specified path
    const { nodes } = useGLTF("/models/porsche.glb");

    // Define the animated properties for the left door
    const { positionL, rotationZL } = useSpring({
        positionL: isDoorsOpen ? [75, 0, -40] : [0, 0, 0],
        rotationZL: isDoorsOpen ? -0.8 : 0,
        config: { mass: 1, tension: 200, friction: 26 },
    });

    // Define the animated properties for the right door
    const { positionR, rotationZR } = useSpring({
        positionR: isDoorsOpen ? [-75, 0, -40] : [0, 0, 0],
        rotationZR: isDoorsOpen ? 0.8 : 0,
        config: { mass: 1, tension: 200, friction: 26 },
    });

    useFrame(() => {
        // Apply the interpolated values each frame
        nodes.p918_door_L.position.set(...positionL.get());
        nodes.p918_door_L.rotation.z = rotationZL.get();

        nodes.p918_door_R.position.set(...positionR.get());
        nodes.p918_door_R.rotation.z = rotationZR.get();
    });
}

// Export the doorAnimation function
export { doorAnimation };
