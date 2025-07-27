import React from "react";
import RotatingGroup from "./Cube";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
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
            <Canvas  className="cube-canvas" camera={{ position: [5, 5, 5], fov: 60 }}>

            <ambientLight intensity={0.8} />                  
            <hemisphereLight args={['#ffffff', '#444444', 0.6]} /> 
            <directionalLight position={[5, 5, 5]} intensity={1.0} />
            <directionalLight position={[-5, -5, -5]} intensity={0.5} /> 

            <color attach="background" args={['#000000']}/>
            <RotatingGroup colors={defaultCube} position={[5, -1, -2]} x={-0.004} y={0.003} />
            <RotatingGroup colors={defaultCube} position={[-2.5, 2.5, -2]} x={0.002} y={-0.0025} />
            <RotatingGroup colors={defaultCube} position={[-5, -4, 4]} x={0.0035} y={-0.0015} />
            {/* <RotatingGroup colors={defaultCube} position={[-15, 1, 3]} x={0.002} y={0.002} /> */}

            <OrbitControls enableZoom enablePan enableRotate/>
            </Canvas>

            <div className="content overlay rubik-mono-one-regular">
                <h1 className="title">Rubik’s Cube Solver</h1>
                <button className="scan-button rubik-mono-one-regular" onClick={onScan}>
                    Scan Your Cube
                </button>
            </div>

        </div>
    )
};

export default HomePage;