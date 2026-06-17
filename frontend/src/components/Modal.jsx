import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="relative w-full max-w-lg glass-strong rounded-2xl shadow-2xl shadow-black/20 z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-0">
              <h3 className="text-lg font-bold text-dark-text">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-dark-muted hover:text-dark-text hover:bg-white/5 transition-all duration-200"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
