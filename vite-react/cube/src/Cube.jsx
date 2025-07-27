import React, {useRef, useState, useEffect} from 'react';
import {useFrame} from "@react-three/fiber";

const moveToAxis = {
  "R": { axis: "x", layer: 1 },
  "L": { axis: "x", layer: -1 },
  "U": { axis: "y", layer: 1 },
  "D": { axis: "y", layer: -1 },
  "F": { axis: "z", layer: 1 },
  "B": { axis: "z", layer: -1 },
}


const RotatingCube = ({ position, color} ) => {
  return(
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} emissive={color}/>
    </mesh>
)}

const RotatingGroup = ({colors, move = null, animate = false, position=[0,0,0], x=0.005, y=0.005}) => {
  const groupRef = useRef()
  const [cubes, setCubes] = useState([]);
  const [moveIndex, setMoveIndex] = useState(0);

  useEffect(() => {
    const positions = [];
    for (let x=-1; x<=1; x++) {
      for(let y=-1; y<=1; y++) {
        for (let z=-1; z<=1; z++) {
          positions.push({pos: [x, y, z], color: colors?.[positions.length] || "#808080"})
        }
      }
    }
    setCubes(positions);
    }, [colors]);

    useEffect(() => {
      if (!animate || !move) return;

      console.log("Animating move:", move);

      // You can implement proper rotation logic here
      // For now: just a placeholder animation
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.5; // fake rotate
      }

    }, [move]);

    useFrame(() => {
      if (!animate && groupRef.current) {
        groupRef.current.rotation.x += x
        groupRef.current.rotation.y += y
        }
    })

    return (
    <group ref={groupRef} position={position}>
      {cubes.map((cube, idx) => (
        <RotatingCube key={idx} position={cube.pos} color={cube.color} />
      ))}
    </group>
  )
}

export default RotatingGroup;