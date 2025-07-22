import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useRef, useState} from "react";
import CubeScanner from "./CubeScanner.jsx"

const RotatingCube = ({ position, color} ) => {
  return(
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color={color} emissive={color}/>
    </mesh>
)}

const RotatingGroup = ({colors}) => {
  const groupRef = useRef()

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.01
      groupRef.current.rotation.y += 0.01
      }
    }
  )
  const positions = [];
  for (let x=-1; x<=1; x++) {
    for(let y=-1; y<=1; y++) {
      for (let z=-1; z<=1; z++) {
        positions.push([x, y, z])
      }
    }
  }

  // const colors = ['#737687', '#747587', '#74798f', '#6e707d', '#706f7d', '#707382', '#716e75', '#757077', '#726f7a',
  //               '#8a7c71', '#2f5586', '#3b747d', '#2e6757', '#2f695d', '#306b69', '#2d644f', '#7b7158', '#2d6355', 
  //               '#9d5d6e', '#996176', '#3c727c', '#713d53', '#817461', '#654763', '#817151', '#8f4b58', '#6c3a55', 
  //               '#34547d', '#644f6f', '#33598a', '#264770', '#2d4971', '#807971', '#26436a', '#2f6453', '#6e3852', 
  //               '#6e5068', '#7c7d77', '#90647b', '#723e56', '#74445a', '#887871', '#70384d', '#2a4469', '#86725f', 
  //               '#9b6677', '#926375', '#365b8f', '#9f5460', '#995566', '#2c5185', '#9e5058', '#2e6550', '#877662'];

  return (
    <group ref={groupRef}>
      {positions.map((pos, idx) => (
        <RotatingCube key={idx} position={pos} color={colors[idx] || "#808080"} />
      ))}
    </group>
  )
}

const App = () => {
  const [cubeColors, setCubeColors ] = useState(null) 
  return (
    <>
    {!cubeColors && <CubeScanner onFinish={setCubeColors}/>} 
    {cubeColors && (
    <Canvas style={{height: '100vh', width: "100vw", display: 'flex', justifyContent: 'center', alignItems:'center'}}>
      <OrbitControls enableZoom enablePan enableRotate/>

      <ambientLight intensity={0.6} color={0x404040}/>
      <directionalLight position={[3, 3, 3]} />
      <color attach="background" args={['#000000']}/>

      <RotatingGroup colors={cubeColors}/>
    </Canvas>
    )}
    </>
  )
}

export default App;