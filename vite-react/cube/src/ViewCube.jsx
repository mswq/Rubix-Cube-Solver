import React, {useState} from "react";
import {OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import RotatingGroup from "./Cube";
import { solveCubeFromColors } from "./solveCube";
import "./index.css"

export default function ViewCube ({colors, onSolve}) {
    const handleSolve = () => {
        const moves = solveCubeFromColors(colors);
        console.log("Solution: ", moves);
        onSolve(moves.split(" "));
    };

    return (
        <div className="home-container">
            <Canvas className="cube-canvas" camera={{position: [5, 5, 5], fov: 50}}>
                <ambientLight intensity={0.8} />
                <hemisphereLight skyColor="#fff" groundColor="#444" intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1.0} />
                <directionalLight position={[-5, -5, -5]} intensity={0.5} />
                <color attach="background" args={["#000"]} />

                <RotatingGroup colors={colors} x={0.001} y={0.001}/>
                <OrbitControls enableZoom enablePan enableRotate />
            </Canvas>
            <button className="scan-button" onClick={() => window.location.reload()}>Back</button>
            <button className="scan-button" onClick={handleSolve}>Solve</button>
        </div>
    )
}