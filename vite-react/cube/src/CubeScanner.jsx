import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const referenceColors = {
  red: "#ff0000",
  green: "#27cc27",
  blue: "#267bc5",
  orange: "#ffa500",
  yellow: "#ffff00",
  white: "#ffffff",
};

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function classifyColor({ r, g, b }) {
  let closestColor = "white";
  let closestDistance = Infinity;
  for (let [_, hex] of Object.entries(referenceColors)) {
    const target = hexToRgb(hex);
    const dist = Math.sqrt(
      (r - target.r) ** 2 + (g - target.g) ** 2 + (b - target.b) ** 2
    );
    if (dist < closestDistance) {
      closestDistance = dist;
      closestColor = hex;
    }
  }
  return closestColor;
}

const CubeScanner = ({ onFinish }) => {
  const webcamRef = useRef();
  const canvasRef = useRef();
  const [faces, setFaces] = useState([]);

  const gridPoints = [
    [560, 280], [640, 280], [720, 280],
    [560, 360], [640, 360], [720, 360],
    [560, 440], [640, 440], [720, 440]
  ];

  useEffect(() => {
    if (faces.length === 6) {
      const allColors = faces.flat();
      console.log("✅ Final 54 classified colors:", allColors);
      console.log("🧠 Calling onFinish()");
      onFinish(allColors);
    }
  }, [faces, onFinish]);

  const capture = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const video = webcamRef.current?.video;

    if (!canvas || !context || !video) {
      console.warn("Canvas, context, or video not ready");
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const face = gridPoints.map(([x, y], i) => {
      const [r, g, b] = context.getImageData(x, y, 1, 1).data;
      return classifyColor({ r, g, b });
    });

    console.log(`📸 Captured face ${faces.length + 1}:`, face);
    setFaces(prev => [...prev, face]);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Webcam
        ref={webcamRef}
        width={1280}
        height={720}
        screenshotFormat="image/jpeg"
        style={{ border: '2px solid white' }}
      />
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        style={{ display: 'none' }}
      />
      <svg viewBox="0 0 1280 720" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
        {gridPoints.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="red" />
        ))}
      </svg>

      <div style={{ marginTop: 12 }}>
        <button onClick={capture} disabled={faces.length >= 6}>
          Capture Face ({faces.length}/6)
        </button>
        {faces.length > 0 && faces.length < 6 && (
          <button onClick={() => setFaces([])} style={{ marginLeft: 10 }}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default CubeScanner;
