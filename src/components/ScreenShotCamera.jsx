import React, { useRef, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
import { setPdfPhotos, clearPdfPhotos } from "../redux/store";

export function ScreenShotCamera() {
    const cameraRef = useRef();
    const { gl, scene } = useThree();

    const dispatch = useDispatch();

    // selector for if the PDF button has been clicked
    const isPdfClicked = useSelector((state) => state.selections.isPdfClicked);

    const position1 = [
        -0.33125390968393836, 0.17667553935655675, -0.3848294547515707,
    ];
    const position2 = [
        -0.12753693713244801, 2.493258296541688, 14.849303552845102,
    ];
    const lookAt = [0, 0, 0];

    const screenshotHandler = (dataURL) => {
        dispatch(setPdfPhotos(dataURL));
    };

    // A function to capture a screenshot with this camera
    const takeScreenshot = () => {
        gl.render(scene, cameraRef.current);
        const dataURL = gl.domElement.toDataURL("image/png");
        screenshotHandler(dataURL);
    };

    useEffect(() => {
        if (isPdfClicked) {
            cameraRef.current.position.set(...position1);
            cameraRef.current.lookAt(...lookAt);
            cameraRef.current.updateMatrixWorld();
            takeScreenshot();

            cameraRef.current.position.set(...position2);
            cameraRef.current.lookAt(...lookAt);
            cameraRef.current.updateMatrixWorld();
            takeScreenshot();

            setTimeout(() => {
                dispatch(clearPdfPhotos());
            }, 1000);
        }
    }, [isPdfClicked]);

    return (
        <PerspectiveCamera
            ref={cameraRef}
            makeDefault={false}
            onUpdate={(self) => self.updateProjectionMatrix()}
        />
    );
}
