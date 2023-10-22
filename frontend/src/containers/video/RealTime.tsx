import React, { useRef, useEffect, useState } from 'react';
import '../../styles/video.css';

const VideoStreaming: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const socketRef = useRef<WebSocket | null>(null); // Using useRef to store the socket

    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.onopen = () => {
                console.log('WebSocket connection established.');
            };
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        }
    }, []); // Empty dependency array ensures this effect runs only on component mount and unmount

    const startVideoStreaming = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
                const newSocket = new WebSocket('ws://localhost:3000');
                socketRef.current = newSocket;
                setStream(videoStream);

                const playListener = () => {    
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d')!;
                    canvas.width = videoRef.current!.videoWidth;
                    canvas.height = videoRef.current!.videoHeight;

                    const captureFrame = () => {
                        context.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height);
                        const frameData = canvas.toDataURL('image/jpeg');

                        // Check if the socket exists and is in the OPEN state before sending data
                        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                            socketRef.current.send(frameData);
                        }

                        requestAnimationFrame(captureFrame);
                    };

                    captureFrame();
                };

                videoRef.current!.addEventListener('play', playListener);

                // Cleanup
                return () => {
                    videoRef.current?.removeEventListener('play', playListener);
                }
            } catch (err) {
                console.log("Error accessing the video:", err);
            }
        } else {
            console.log("Your browser does not support accessing the video.");
        }
    };

    const stopVideo = () => {
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            setStream(null);
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.close();
                console.log('WebSocket connection closed.');
            }
        }
    };

    return (
        <div className="video-container">
            <video ref={videoRef} width="620" height="460" autoPlay />
            {stream ?
                <button onClick={stopVideo}>Stop Video</button> :
                <button onClick={startVideoStreaming}>Start Video</button>
            }
        </div>
    );
};

export default VideoStreaming;
