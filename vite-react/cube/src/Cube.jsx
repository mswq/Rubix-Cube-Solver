import React, {useRef} from 'react';
import {useFrame} from "@react-three/fiber";


const RotatingCube = ({ position, color} ) => {
  return(
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} emissive={color}/>
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
    return (
    <group ref={groupRef}>
      {positions.map((pos, idx) => (
        <RotatingCube key={idx} position={pos} color={colors[idx] || "#808080"} />
      ))}
    </group>
  )
}

export default RotatingGroup;
