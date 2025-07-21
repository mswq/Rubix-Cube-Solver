import React, {useRef, useState} from 'react';
import Webcam from 'react-webcam';

const CubeScanner = () => {
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
        const video = webcamRef.current.video;
        
    }

    return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  );
}

export default CubeScanner