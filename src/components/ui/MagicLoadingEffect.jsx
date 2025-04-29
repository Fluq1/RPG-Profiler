import React from 'react';
import Lottie from 'lottie-react';
import magicAnimation from '../../assets/magic-loading.json';

const MagicLoadingEffect = ({ className = '' }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Lottie 
        animationData={magicAnimation} 
        loop={true} 
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
};

export default MagicLoadingEffect;