import React from "react";
import logo from "../assets/porsche-logo.webp";

export default function Loader({ loaderRef }) {
    return (
        <div className="loader-container" ref={loaderRef}>
            <img src={logo} alt="Porsche logo" />
            <span className="loader"></span>
        </div>
    );
}
