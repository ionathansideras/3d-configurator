import React from "react";
import { Canvas } from "@react-three/fiber";
import {
    Environment,
    Lightformer,
    ContactShadows,
    OrbitControls,
    MeshReflectorMaterial,
} from "@react-three/drei";
import { Porsche } from "./Porsche";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ScreenShotCamera } from "./ScreenShotCamera";
import { useSelector } from "react-redux";

export default function Experience({ setLoading }) {
    // Extract the exteriorColor from the Redux store
    const { cameraState } = useSelector((state) => state.selections);

    return (
        <Canvas
            gl={{ logarithmicDepthBuffer: true, antialias: false }}
            dpr={[1, 1.5]}
            camera={{ position: [0, 4, 15], fov: 25 }}
            className="canvas"
        >
            <color attach="background" args={["#15151a"]} />
            <fog attach="fog" args={["#15151a", 10, 100]} />
            {/* Render the Porsche component and pass the setLoading function */}
            <Porsche
                rotation={[0, Math.PI / 5.5, 0]}
                scale={1.5}
                position={[cameraState.isInside ? -0.55 : 0, -1.16, 0]}
                setLoading={setLoading}
            />
            <hemisphereLight intensity={0.5} />
            <ContactShadows
                key={JSON.stringify(cameraState)}
                resolution={2024}
                frames={50}
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
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, -1.162, -1.5]}>
                <planeGeometry args={[170, 170]} />
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={1024}
                    mixBlur={0.1}
                    mixStrength={70}
                    roughness={1}
                    depthScale={1.2}
                    mixDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#0a0a0a"
                    metalness={0.5}
                />
            </mesh>
            <ScreenShotCamera />

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
            <EffectComposer disableNormalPass>
                <Bloom
                    luminanceThreshold={0.2}
                    mipmapBlur
                    luminanceSmoothing={0}
                    intensity={1}
                />
            </EffectComposer>
            <OrbitControls
                enablePan={false}
                enableZoom={true}
                minPolarAngle={Math.PI / 4.2}
                maxPolarAngle={Math.PI / 2}
                minDistance={0.3} // minimum zoom distance
                maxDistance={35} // maximum zoom distance
            />
        </Canvas>
    );
}
