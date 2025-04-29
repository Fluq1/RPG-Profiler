import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-rpg-accent text-rpg-dark hover:bg-rpg-accent/90',
  secondary: 'bg-rpg-light/10 border border-rpg-light/20 hover:bg-rpg-light/20',
  danger: 'bg-red-500/80 hover:bg-red-500',
  icon: 'bg-transparent hover:bg-rpg-light/10 p-2',
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
  const baseClasses = 'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rpg-accent/50';
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = variant === 'icon' ? 'p-2' : (sizes[size] || sizes.md);
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;