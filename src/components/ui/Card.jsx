import React from 'react';

const Card = ({ children, onClick, className = '', selected = false }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-[#2D2D2D] rounded-xl border ${selected ? 'border-[#F97316]' : 'border-[rgba(255,255,255,0.1)]'} shadow-lg transition-all duration-200 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;