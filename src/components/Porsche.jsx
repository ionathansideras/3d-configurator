import { useGLTF } from "@react-three/drei";

export function Porsche(props) {
    const { scene } = useGLTF("/models/porsche.glb");
    const { setLoading } = props;
    setLoading(false);
    console.log("ok");
    return <primitive object={scene} {...props} />;
}
