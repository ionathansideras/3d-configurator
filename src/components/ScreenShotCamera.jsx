// Import necessary hooks and actions from libraries
import React, { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
import { setPdfPhotos, clearPdfPhotos } from "../redux/store";

// Define the ScreenShotCamera component
export function ScreenShotCamera() {
    // Create a ref for the camera
    const cameraRef = useRef();
    // Get the WebGL rendering context and the scene from react-three/fiber
    const { gl, scene } = useThree();

    // Get the dispatch function from the Redux store
    const dispatch = useDispatch();

    // Get the isPdfClicked state from the Redux store
    const isPdfClicked = useSelector((state) => state.selections.isPdfClicked);

    // Define the positions for the camera
    const positions = [
        [-0.33125390968393836, 0.17667553935655675, -0.3848294547515707],

        [-0.07636107537852524, 1.4928058412020544, 8.890826559052],
    ];
    const lookAt = [0, 0, 0];

    // Define a function to handle the screenshot data
    const screenshotHandler = (dataURL) => {
        dispatch(setPdfPhotos(dataURL));
    };

    const takeScreenshot = async () => {
        // Desired output dimensions for the screenshot
        const outputWidth = 1280;
        const outputHeight = 720;

        // Capture the current renderer size to restore it later
        const originalSize = {
            width: gl.domElement.width,
            height: gl.domElement.height,
        };

        // Capture the original aspect ratio to restore it later
        const originalAspect = cameraRef.current.aspect;

        try {
            // Temporarily adjust the renderer size for the screenshot
            gl.setSize(outputWidth, outputHeight, false); // The 'false' parameter prevents CSS styling from being affected
            cameraRef.current.aspect = outputWidth / outputHeight;
            cameraRef.current.updateProjectionMatrix();

            // Render the scene with the screenshot camera
            gl.render(scene, cameraRef.current);

            // Capture the screenshot as a data URL
            const dataURL = gl.domElement.toDataURL("image/png");

            screenshotHandler(dataURL); // Assuming screenshotHandler returns a Promise
        } catch (error) {
            console.error("Failed to take screenshot:", error);
            // Handle any errors that occur during the screenshot process
        } finally {
            // Restore the original renderer size, primary camera aspect ratio, and projection matrix
            gl.setSize(originalSize.width, originalSize.height, false);
            cameraRef.current.aspect = originalAspect;
            cameraRef.current.updateProjectionMatrix();
        }
    };

    // Use an effect to take screenshots when isPdfClicked changes
    useEffect(() => {
        if (isPdfClicked) {
            positions.forEach((position) => {
                cameraRef.current.position.set(...position);
                cameraRef.current.lookAt(...lookAt);
                cameraRef.current.updateMatrixWorld();
                takeScreenshot();
            });

            setTimeout(() => {
                dispatch(clearPdfPhotos());
            }, 1000);
        }
    }, [isPdfClicked]);

    // Render the PerspectiveCamera component
    return (
        <PerspectiveCamera
            ref={cameraRef}
            makeDefault={false}
            onUpdate={(self) => self.updateProjectionMatrix()}
        />
    );
}
