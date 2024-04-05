import { useFrame } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";

function doorAnimation({ isDoorsOpen }) {
    // Use the useGLTF hook to load the Porsche model from the specified path
    const { nodes } = useGLTF("/models/porsche.glb");
    // Unified tension for a coherent start
    const unifiedTension = 410; // A mid-value between your initial tensions

    // Define the animated properties for the left door
    const { positionL } = useSpring({
        positionL: isDoorsOpen ? [78, 0, -37.5] : [0, 0, 0],
        config: { mass: 0.1, tension: 400, friction: 26 },
    });

    // Define the animated properties for the right door
    const { positionR } = useSpring({
        positionR: isDoorsOpen ? [-78, 0, -37.5] : [0, 0, 0],
        config: { mass: 0.1, tension: 400, friction: 26 },
    });

    const { rotationZR } = useSpring({
        rotationZR: isDoorsOpen ? Math.PI / 4 : 0,
        config: { mass: 0.1, tension: unifiedTension, friction: 26 },
    });

    const { rotationZL } = useSpring({
        rotationZL: isDoorsOpen ? -Math.PI / 4 : 0,
        config: { mass: 0.1, tension: unifiedTension, friction: 26 },
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
