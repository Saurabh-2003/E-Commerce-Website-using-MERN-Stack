import React from 'react';

const ImageCarousel = ({ images }) => {
  return (
    <div className="w-full h-full">
      <img
        src={images[0].url}
        alt="carousel-image"
        className='w-full h-full object-fill'
      />
    </div>
  );
};

export default ImageCarousel;
