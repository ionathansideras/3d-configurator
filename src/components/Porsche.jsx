import { useGLTF } from "@react-three/drei";

export function Porsche(props) {
    const { scene } = useGLTF("/models/porsche.glb");

    return <primitive object={scene} {...props} />;
}
