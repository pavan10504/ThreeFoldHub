import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = ({ children, to, variant = 'primary', className = '', onClick }) => {
  const baseClasses = "inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-sm transition-all duration-300 hover-lift";
  
  const variants = {
    primary: "bg-primary text-surface hover:bg-primary/80 hover:shadow-lg",
    secondary: "bg-surface text-primary border border-primary/10 hover:border-primary/20 hover:bg-primary/5",
    accent: "bg-[var(--color-accent)] text-white hover:bg-red-600 hover:shadow-lg shadow-red-500/20"
  };

  const Component = to ? Link : motion.button;
  const props = to ? { to, className: `${baseClasses} ${variants[variant]} ${className}` } : { onClick, className: `${baseClasses} ${variants[variant]} ${className}` };

  return (
    <Component {...props}>
      {children}
    </Component>
  );
};

export default Button;
