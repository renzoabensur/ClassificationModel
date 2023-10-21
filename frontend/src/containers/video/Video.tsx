import React, { useRef, useEffect, useState } from 'react';
import '../../styles/video.css'

const Video: React.FC = () => {
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
        <button onClick={stopVideo}>Stop Video</button> :
        <button onClick={startVideo}>Start Video</button>
      }
    </div>
  );
}

export default Video;