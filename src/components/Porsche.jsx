// Import the useGLTF hook from the @react-three/drei library
import { useGLTF } from "@react-three/drei";

// Define the Porsche component
export function Porsche(props) {
    // Use the useGLTF hook to load the Porsche model from the specified path
    const { scene } = useGLTF("/models/porsche.glb");

    // Extract the setLoading function from the props
    const { setLoading } = props;

    // Call the setLoading function with false to indicate that loading is complete
    setLoading(false);

    // Return a primitive component with the loaded scene and any other passed props
    return <primitive object={scene} {...props} />;
}
