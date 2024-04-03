import { Canvas } from "@react-three/fiber";
import { OrbitControls, Gltf, useGLTF } from "@react-three/drei";

export default function App() {
    const garage = useGLTF("/models/bedroom.glb");
    console.log(garage);
    return (
        <main>
            <Canvas
                shadows
                camera={{
                    position: [3, 0, 0.0006],
                }}
            >
                <OrbitControls />
                <ambientLight intensity={2} />
                <Gltf
                    src="/models/bedroom.glb"
                    position={[0, -1.2, -0]} // Adjusted model position
                    rotation-y={-1.6} // Adjusted model rotation
                />
                <directionalLight
                    castShadow
                    position={[10, 30, 0]}
                    intensity={3}
                    shadow-normalBias={0.05}
                />
            </Canvas>
        </main>
    );
}
