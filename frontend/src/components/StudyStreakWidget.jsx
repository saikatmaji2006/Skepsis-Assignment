import { motion } from 'framer-motion';
import { FiTrendingUp, FiZap } from 'react-icons/fi';

export default function StudyStreakWidget({ weeklyNotes = 0 }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="card p-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
          <FiZap className="text-white text-lg" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-dark-text">Study Streak</h3>
          <p className="text-xs text-dark-muted">Resources this week</p>
        </div>
      </div>

      <div className="flex items-end gap-2">
        <span className="text-4xl font-black gradient-text">{weeklyNotes}</span>
        <span className="text-sm text-dark-muted mb-1">shared</span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs">
        <FiTrendingUp className="text-emerald-400" />
        <span className="text-emerald-400 font-medium">
          {weeklyNotes > 0 ? 'Keep the streak going! 🔥' : 'Share your first resource!'}
        </span>
      </div>
    </motion.div>
  );
}
