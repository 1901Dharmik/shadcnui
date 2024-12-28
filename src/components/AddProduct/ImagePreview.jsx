import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

const ImagePreview = ({ image, onClose }) => {
  const [scale, setScale] = useState(1);

  const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
        <img
          src={image.url}
          alt="Preview"
          className="max-w-full max-h-full object-contain transition-transform duration-200 ease-in-out"
          style={{ transform: `scale(${scale})` }}
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <X size={24} />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button
            onClick={zoomOut}
            className="bg-white text-black p-2 rounded-full hover:bg-gray-200"
          >
            <ZoomOut size={20} />
          </button>
          <button
            onClick={zoomIn}
            className="bg-white text-black p-2 rounded-full hover:bg-gray-200"
          >
            <ZoomIn size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;