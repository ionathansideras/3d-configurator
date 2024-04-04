import { Canvas } from "@react-three/fiber";
import {
    Environment,
    Lightformer,
    ContactShadows,
    OrbitControls,
} from "@react-three/drei";
import { Porsche } from "./components/Porsche";
import { Effects } from "./components/Effects";
import { Configurator } from "./components/Configurator";
import Loader from "./components/Loader";
import { useState, useEffect, useRef } from "react";

export default function App() {
    const [loading, setLoading] = useState(true);
    const loaderRef = useRef(null);

    useEffect(() => {
        if (loading) {
            loaderRef.current.style.opacity = 1;
            loaderRef.current.style.pointerEvents = "all";
        } else {
            loaderRef.current.style.opacity = 0;
            loaderRef.current.style.pointerEvents = "none";
        }
    }, [loading]);

    return (
        <>
            <Loader loaderRef={loaderRef} />
            <Canvas
                gl={{ logarithmicDepthBuffer: true, antialias: false }}
                dpr={[1, 1.5]}
                camera={{ position: [0, 4, 15], fov: 25 }}
            >
                <color attach="background" args={["#15151a"]} />
                <Porsche
                    rotation={[0, Math.PI / 5.5, 0]}
                    scale={1.5}
                    position={[0, -1.16, 0]}
                    setLoading={setLoading}
                />
                <hemisphereLight intensity={0.5} />
                <ContactShadows
                    resolution={1024}
                    frames={1}
                    position={[0, -1.16, 0]}
                    scale={15}
                    blur={0.5}
                    opacity={1}
                    far={20}
                />
                <mesh
                    scale={4}
                    position={[3, -1.161, -1.5]}
                    rotation={[-Math.PI / 2, 0, Math.PI / 5.5]}
                >
                    <ringGeometry args={[0.9, 1, 4, 1]} />
                    <meshStandardMaterial color="white" roughness={0.75} />
                </mesh>
                <mesh
                    scale={4}
                    position={[-3, -1.161, -1]}
                    rotation={[-Math.PI / 2, 0, Math.PI / 4.7]}
                >
                    <ringGeometry args={[0.9, 1, 3, 1]} />
                    <meshStandardMaterial color="white" roughness={0.75} />
                </mesh>
                {/* We're building a cube-mapped environment declaratively.
          Anything you put in here will be filmed (once) by a cubemap-camera
          and applied to the scenes environment, and optionally background. */}
                <Environment resolution={512}>
                    {/* Ceiling */}
                    <Lightformer
                        intensity={2}
                        rotation-x={Math.PI / 2}
                        position={[0, 4, -9]}
                        scale={[10, 1, 1]}
                    />
                    <Lightformer
                        intensity={2}
                        rotation-x={Math.PI / 2}
                        position={[0, 4, -6]}
                        scale={[10, 1, 1]}
                    />
                    <Lightformer
                        intensity={2}
                        rotation-x={Math.PI / 2}
                        position={[0, 4, -3]}
                        scale={[10, 1, 1]}
                    />
                    <Lightformer
                        intensity={2}
                        rotation-x={Math.PI / 2}
                        position={[0, 4, 0]}
                        scale={[10, 1, 1]}
                    />
                    <Lightformer
                        intensity={2}
                        rotation-x={Math.PI / 2}
                        position={[0, 4, 3]}
                        scale={[10, 1, 1]}
                    />
                    <Lightformer
                        intensity={2}
                        rotation-x={Math.PI / 2}
                        position={[0, 4, 6]}
                        scale={[10, 1, 1]}
                    />
                    <Lightformer
                        intensity={2}
                        rotation-x={Math.PI / 2}
                        position={[0, 4, 9]}
                        scale={[10, 1, 1]}
                    />
                    {/* Sides */}
                    <Lightformer
                        intensity={2}
                        rotation-y={Math.PI / 2}
                        position={[-50, 2, 0]}
                        scale={[100, 2, 1]}
                    />
                    <Lightformer
                        intensity={2}
                        rotation-y={-Math.PI / 2}
                        position={[50, 2, 0]}
                        scale={[100, 2, 1]}
                    />
                    {/* Key */}
                    <Lightformer
                        form="ring"
                        color="red"
                        intensity={10}
                        scale={2}
                        position={[10, 5, 10]}
                        onUpdate={(self) => self.lookAt(0, 0, 0)}
                    />
                </Environment>
                <Effects />
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minPolarAngle={Math.PI / 4.2}
                    maxPolarAngle={Math.PI / 2}
                    minDistance={0.3} // minimum zoom distance
                    maxDistance={35} // maximum zoom distance
                />
            </Canvas>
            <Configurator />
        </>
    );
}
