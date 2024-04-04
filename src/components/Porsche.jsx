// Import the useGLTF hook from the @react-three/drei library
import { useGLTF } from "@react-three/drei";
// Import the useSelector and useDispatch hooks from Redux
import { useSelector } from "react-redux";

// Define the Porsche component
export function Porsche(props) {
    // Use the useGLTF hook to load the Porsche model from the specified path
    const { scene, materials } = useGLTF("/models/porsche.glb");

    // Extract the exteriorColor from the Redux store
    const exteriorColor = useSelector((state) => state.colors.exteriorColor);

    materials.P918_paint.color.set(exteriorColor);

    // Extract the setLoading function from the props
    const { setLoading } = props;

    // Call the setLoading function with false to indicate that loading is complete
    setLoading(false);

    // Return a primitive component with the loaded scene and any other passed props
    return <primitive object={scene} {...props} />;
}
