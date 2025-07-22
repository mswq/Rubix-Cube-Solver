import React, {useRef, useState} from 'react';
import Webcam from 'react-webcam';

const CubeScanner = ({onFinish}) => {
    const webcamRef = useRef();
    const canvasRef = useRef();
    const [faces, setFaces] = useState([]);

    const gridPoints = [
        [560, 280], [640, 280], [720, 280],
        [560, 360], [640, 360], [720, 360],
        [560, 440], [640, 440], [720, 440]
    ];

    const capture = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const video = webcamRef.current?.video;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const face = gridPoints.map( ([x, y]) => {
            const [r, g, b] = context.getImageData(x, y, 1, 1).data; 
            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        });

        const updatedFaces = [...faces, face]; 
        setFaces(updatedFaces);

        if (updatedFaces.length === 6) {
            onFinish(updatedFaces.flat());
        }
    }

    return (
        <div style ={{ position: 'relative'}}>
            <Webcam ref={webcamRef} width={1280} height={720} screenshotFormat="image/jpeg" style={{border: '2px solid white'}}/>
            <canvas ref = {canvasRef} width={1280} height={720} style ={{ display: 'none'}} />

            <svg viewBox='0 0 1280 720' style={{position: 'absolute', top:0, left:0}}>
                {gridPoints.map(([x, y], i) => (
                    <circle key = {i} cx={x} cy={y} r="5" fill="red"/>
                ))}
            </svg>

            <button onClick={capture} disabled={faces.length >=6} style={{position: 'absolute', bottom: 20,left: '50%', transform: 'translateX(-50%)', padding: '10px 20px', background: 'black', border: '2px solid black', borderRadius: '5px', cursor: 'pointer', zIndex: 10}}>
                Capture Face ({faces.length}/6)
            </button>
        </div>
  );
}

export default CubeScanner;