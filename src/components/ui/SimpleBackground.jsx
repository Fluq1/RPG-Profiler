import React from 'react';

const SimpleBackground = () => {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundColor: '#1A1A1A', // Cor de fundo escura similar ao Claude.ai
      }}
    />
  );
};

export default SimpleBackground;