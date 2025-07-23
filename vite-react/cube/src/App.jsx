import React, {useState} from "react";
import HomePage from "./HomePage.jsx";
import CubeScanner from "./CubeScanner.jsx"
import ViewCube from "./ViewCube.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [cubeColors, setCubeColors] = useState(null);

  const startScan = () => setPage("scan");
  const handleFinish = (colors) => {
    setCubeColors(colors);
    setPage("view");
  }

  if (page === "home") {
    return <HomePage onScan={startScan}/>
  }
  if (page === "scan") {
    return <CubeScanner onFinish={handleFinish}/>
  }
  return <ViewCube colors={cubeColors}/>
    // <>
    // {!cubeColors && <HomePage onStart={() => setCubeColors(defaultCube)}/>} 
    // {cubeColors && (
    // <Canvas style={{height: '100vh', width: "100vw", display: 'flex', justifyContent: 'center', alignItems:'center'}}>
    //   <OrbitControls enableZoom enablePan enableRotate/>

    //   <ambientLight intensity={0.8} />                  
    //   <hemisphereLight args={['#ffffff', '#444444', 0.6]} /> 
    //   <directionalLight position={[5, 5, 5]} intensity={1.0} />
    //   <directionalLight position={[-5, -5, -5]} intensity={0.5} /> 

    //   <color attach="background" args={['#000000']}/>

    //   <RotatingGroup colors={cubeColors}/>
    // </Canvas>
    // )}
    // </>
  
}
