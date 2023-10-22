import React, { useRef, useEffect, useState } from 'react';
import '../../styles/video.css'

const UploadVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const startVideo = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(videoStream);
      } catch (err) {
        console.error("Error accessing the video:", err);
      }
    } else {
      console.log("Your browser does not support accessing the video.");
    }
  }

  const stopVideo = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setStream(null);
    }
  }

  return (
    <div className="video-container">
      <video ref={videoRef} width="620" height="460" autoPlay />
      {stream ? 
        <button onClick={stopVideo}>Stop UploadVideo</button> :
        <button onClick={startVideo}>Start UploadVideo</button>
      }
    </div>
  );
}

export default UploadVideo;