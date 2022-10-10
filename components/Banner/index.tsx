import React from 'react';
import MatrixRainCanvas from './Canvas';


const Banner: React.FC = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center -z-10'>
      <MatrixRainCanvas />
    </div>
  );
}

export default Banner;
