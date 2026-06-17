import { motion } from 'framer-motion';
import { FiExternalLink, FiUser, FiClock, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { SUBJECT_ICONS, SUBJECT_COLORS, formatDate } from '../utils/constants';

export default function ResourceCard({ note, onEdit, onDelete, showActions = false }) {
  const subjectIcon = SUBJECT_ICONS[note.subject] || '📚';
  const subjectColor = SUBJECT_COLORS[note.subject] || 'from-gray-500 to-slate-500';
  const uploaderName = note.uploadedBy?.name || 'Anonymous';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="card p-5 flex flex-col h-full group"
    >
      {/* Subject badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${subjectColor} text-white shadow-sm`}
        >
          <span>{subjectIcon}</span>
          {note.subject}
        </span>

        {showActions && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit?.(note)}
              className="p-1.5 rounded-lg text-dark-muted hover:text-primary hover:bg-primary/10 transition-all duration-200"
              title="Edit"
            >
              <FiEdit2 size={14} />
            </button>
            <button
              onClick={() => onDelete?.(note)}
              className="p-1.5 rounded-lg text-dark-muted hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
              title="Delete"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-dark-text mb-2 line-clamp-2 leading-snug">
        {note.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-dark-muted mb-4 line-clamp-3 leading-relaxed flex-1">
        {note.description}
      </p>

      {/* Meta info */}
      <div className="flex items-center justify-between text-xs text-dark-muted mb-4">
        <span className="flex items-center gap-1.5">
          <FiUser size={12} />
          {uploaderName}
        </span>
        <span className="flex items-center gap-1.5">
          <FiClock size={12} />
          {formatDate(note.createdAt)}
        </span>
      </div>

      {/* CTA */}
      <a
        href={note.driveLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary text-center text-sm flex items-center justify-center gap-2 w-full py-2.5"
      >
        Open Resource
        <FiExternalLink size={14} />
      </a>
    </motion.div>
  );
}
