import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Check } from 'lucide-react';

interface PhotoCaptureProps {
  onPhotoCapture: (photo: string) => void;
  onCancel: () => void;
  taskTitle: string;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ onPhotoCapture, onCancel, taskTitle }) => {
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setIsCapturing(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const photoData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedPhoto(photoData);
        
        // Stop camera
        const stream = video.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
        setIsCapturing(false);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCapturedPhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmPhoto = () => {
    if (capturedPhoto) {
      onPhotoCapture(capturedPhoto);
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 text-white">
        <button onClick={onCancel} className="p-2">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold">Proof of Completion</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-4">
          <p className="text-white text-sm mb-2">Take a photo to prove you completed:</p>
          <p className="text-white font-semibold">{taskTitle}</p>
        </div>

        {!isCapturing && !capturedPhoto && (
          <div className="space-y-4 w-full max-w-sm">
            <button
              onClick={startCamera}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Camera className="w-5 h-5" />
              Take Photo
            </button>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-4 bg-gray-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
            >
              <Upload className="w-5 h-5" />
              Upload from Gallery
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {isCapturing && (
          <div className="relative w-full max-w-sm">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-xl"
            />
            <button
              onClick={capturePhoto}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-full" />
            </button>
          </div>
        )}

        {capturedPhoto && (
          <div className="w-full max-w-sm">
            <img
              src={capturedPhoto}
              alt="Captured proof"
              className="w-full rounded-xl mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={retakePhoto}
                className="flex-1 py-3 bg-gray-600 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors"
              >
                Retake
              </button>
              <button
                onClick={confirmPhoto}
                className="flex-1 py-3 bg-green-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
              >
                <Check className="w-5 h-5" />
                Confirm
              </button>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default PhotoCapture;