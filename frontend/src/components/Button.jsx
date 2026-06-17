import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  onClick,
  ...props
}) {
  const baseClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    ghost: 'px-4 py-2 rounded-xl text-dark-muted hover:text-dark-text hover:bg-white/5 font-medium transition-all duration-200',
    danger: 'px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg hover:shadow-red-500/25 transition-all duration-300 active:scale-[0.98]',
  };

  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses[variant]} ${className} ${
        loading ? 'opacity-70 cursor-wait' : ''
      }`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <FiLoader className="animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
