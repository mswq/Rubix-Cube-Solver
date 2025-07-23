import React from "react";
import RotatingGroup from "./Cube";
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useRef, useState} from "react";
import "./index.css";

const defaultCube = [
  "#ff0000", "#27cc27", "#ffff00", "#ffffff", "#267bc5", "#ff0000", "#ffa500", "#ffff00",  "#27cc27", 
  "#ffa500", "#ff0000", "#267bc5", "#27cc27", "#ffff00", "#27cc27", "#ffff00", "#ffffff", "#ff0000", 
  "#267bc5", "#ffa500", "#ff0000", "#27cc27", "#ffff00", "#ffffff", "#ffa500", "#ff0000", "#ffff00",
  "#ff0000", "#27cc27", "#ffff00", "#ffffff", "#ffa500", "#ff0000", "#ff0000", "#ffffff", "#267bc5",
  "#ff0000", "#267bc5", "#ffff00", "#267bc5", "#ffa500", "#ff0000", "#27cc27", "#ffffff", "#27cc27",
  "#ffff00", "#ff0000", "#27cc27", "#27cc27", "#ffff00", "#ffffff", "#ffa500", "#ff0000", "#ffffff"
];

const HomePage = ({onScan}) => {
    return (
        <div className="home-container">
            <Canvas  className="cube-canvas" camera={{ position: [5, 5, 5], fov: 50 }}>
            <OrbitControls enableZoom enablePan enableRotate/>

            <ambientLight intensity={0.8} />                  
            <hemisphereLight args={['#ffffff', '#444444', 0.6]} /> 
            <directionalLight position={[5, 5, 5]} intensity={1.0} />
            <directionalLight position={[-5, -5, -5]} intensity={0.5} /> 

            <color attach="background" args={['#000000']}/>

            <RotatingGroup colors={defaultCube}/>
            </Canvas>

            <div className="overlay">
                <h1 className="title">Rubik’s Cube Solver</h1>
                <button className="scan-button" onClick={onScan}>
                    Scan Your Cube
                </button>
            </div>

        </div>
    )
};

export default HomePage;