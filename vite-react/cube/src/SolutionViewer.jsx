import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RotatingGroup from "./Cube";
import "./index.css";

export default function SolutionViewer ({moves, colors}) {
    const [currentMove, setCurrentMove] = useState(0);

    const handleKeyDown = (e) => {
        if (e.key === "ArrowRight" && currentMove < moves.length) {
            setCurrentMove((prev) => prev + 1);
        }
        if (e.key === "ArrowLeft" && currentMove > 0) {
            setCurrentMove((prev) => prev - 1);
        }
    };


    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentMove]);

    return (
        <div className="home-container">
            <Canvas className="cube-canvas" camera={{ position: [5, 5, 5], fov: 50 }}>
                <ambientLight intensity={0.8} />
                <hemisphereLight args={["#ffffff", "#444444", 0.6]} />
                <directionalLight position={[5, 5, 5]} intensity={1.0} />
                <directionalLight position={[-5, -5, -5]} intensity={0.5} />
                <color attach="background" args={["#000000"]} />

                <RotatingGroup
                    colors={colors}
                    move={moves[currentMove - 1]} // send the move to animate
                    animate
                />
                <OrbitControls enableZoom enablePan enableRotate />
            </Canvas>
            <div className="overlay">
                <h2 className="title">Step {currentMove} of {moves.length}</h2>
                <p className="title">Press ← or → to navigate</p>
                <div className="solution-moves">
                {moves.map((move, i) => (
                    <span key={i} style={{ margin: 6, color: i === currentMove - 1 ? "#00ff00" : "#fff" }}>
                    {move}
                    </span>
                ))}
                </div>
            </div>
        </div>
    )
}
