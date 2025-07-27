import React, {useState} from "react";
import HomePage from "./HomePage.jsx";
import CubeScanner from "./CubeScanner.jsx"
import ViewCube from "./ViewCube.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [cubeColors, setCubeColors] = useState(null);
  const [solution, setSolution] = useState(null);

  const startScan = () => setPage("scan");
  
  const handleFinish = (colors) => {
    setCubeColors(colors);
    setPage("view");
  }

  const handleSolve = (moves) => {
    setSolution(moves)
    setPage("solution");
  }

  if (page === "home") return <HomePage onScan={startScan}/> ;
  if (page === "scan") return <CubeScanner onFinish={handleFinish}/>;
  if (page === "view" && cubeColors) return <ViewCube colors={cubeColors} onSolve={handleSolve}/>;
  if (page === "view" && !cubeColors) return <div style={{ color: "white" }}>Missing cube data</div>;
  if (page ==="solution") return <SolutionViewer moves={solution} colors={cubeColors} />;
  return null
}
