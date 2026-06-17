import { motion } from 'framer-motion';
import { FiInbox } from 'react-icons/fi';
import Button from './Button';

export default function EmptyState({
  icon: Icon = FiInbox,
  title = 'No resources found',
  message = 'Try adjusting your search or filters.',
  actionLabel,
  onAction,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-2xl bg-dark-card flex items-center justify-center mb-6 border border-dark-border">
        <Icon className="text-dark-muted text-3xl" />
      </div>
      <h3 className="text-lg font-bold text-dark-text mb-2">{title}</h3>
      <p className="text-sm text-dark-muted max-w-sm mb-6">{message}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
