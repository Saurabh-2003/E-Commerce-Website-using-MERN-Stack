import React, { useState } from 'react';
import {ArrowLeft, ArrowRight} from 'lucide-react'

const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative  group w-full h-full">
      <img
        src={images[currentImageIndex].url}
        alt="carousel-image"
        className="w-full h-full object-fill"
      />
      <button
        className="absolute opacity-0 group-hover:opacity-100   top-0 left-0 px-2 text-white py-2 h-full hover:bg-white/10"
        onClick={goToPreviousImage}
      >
        <ArrowLeft size={30}/>
      </button>
      <button
        className=" absolute opacity-0 group-hover:opacity-100  top-0 right-0 px-2 text-white py-2 h-full hover:bg-white/10"
        onClick={goToNextImage}
      >
        <ArrowRight size={30}/>
      </button>
    </div>
  );
};

export default ImageCarousel;
