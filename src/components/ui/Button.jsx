import React from 'react';

const variants = {
  primary: 'bg-rpg-accent text-white hover:bg-rpg-accent/90 hover:scale-105 hover:font-bold hover:shadow-lg hover:shadow-rpg-accent/30',
  secondary: 'bg-rpg-dark border border-rpg-light/10 text-white hover:bg-rpg-accent hover:border-rpg-accent hover:scale-105 hover:font-bold hover:shadow-lg hover:shadow-rpg-accent/30',
  danger: 'bg-red-500 text-white hover:bg-red-600 hover:scale-105 hover:font-bold hover:shadow-lg hover:shadow-red-500/30',
  icon: 'bg-transparent hover:bg-rpg-accent/20 hover:scale-110 p-2',
};

const sizes = {
  sm: 'py-1.5 px-3 text-sm',
  md: 'py-2 px-4',
  lg: 'py-3 px-6 text-lg',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseClasses = 'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F97316]/50';
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = variant === 'icon' ? 'p-2' : (sizes[size] || sizes.md);
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;