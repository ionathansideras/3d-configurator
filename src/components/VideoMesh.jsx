import React, { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export function VideoMesh() {
    const mesh = useRef(null);
    const { gl } = useThree(); // This is used to ensure compatibility with the renderer

    useEffect(() => {
        const observer = new MutationObserver((mutationsList, observer) => {
            for (let mutation of mutationsList) {
                if (mutation.type === "childList") {
                    const video2 = document.querySelector(
                        ".z1WvYJgksHY23EwdFNB5._lsMxWcmJ586WoIFahdx.pVo6XoSfywa4eLk9ef2S"
                    );

                    if (video2) {
                        const video = document.querySelector(
                            ".z1WvYJgksHY23EwdFNB5.pVo6XoSfywa4eLk9ef2S"
                        );
                        console.log("hii", video);
                        console.log(video.src);

                        video.crossOrigin = "anonymous";
                        video.loop = true;
                        video.muted = true;

                        video.onloadedmetadata = () => {
                            video.play();

                            const texture = new THREE.VideoTexture(video);
                            texture.minFilter = THREE.LinearFilter;
                            texture.magFilter = THREE.LinearFilter;
                            texture.format = THREE.RGBFormat;

                            mesh.current.material.map = texture;
                            mesh.current.material.needsUpdate = true;
                        };
                    }
                }
            }
        });

        // Start observing the document with the configured parameters
        observer.observe(document, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
        };
    }, [gl]);

    return (
        <mesh ref={mesh} position={[6, 1, -1.5]} rotation-y={-1} scale={1.5}>
            <planeGeometry args={[2, 1]} />
            <meshBasicMaterial toneMapped={false} />
        </mesh>
    );
}
