import React from 'react';

const GlassPanel = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-[#2D2D2D] rounded-xl border border-[rgba(255,255,255,0.1)] p-6 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassPanel;