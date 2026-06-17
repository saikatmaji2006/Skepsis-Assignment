import { motion } from 'framer-motion';
import { FiBarChart2 } from 'react-icons/fi';
import { SUBJECT_ICONS } from '../utils/constants';

export default function SubjectPopularityWidget({ subjectBreakdown = [] }) {
  const maxCount = Math.max(...subjectBreakdown.map((s) => s.count), 1);
  const top5 = subjectBreakdown.slice(0, 5);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="card p-5"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center shadow-lg">
          <FiBarChart2 className="text-white text-lg" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-dark-text">Popular Subjects</h3>
          <p className="text-xs text-dark-muted">Most shared topics</p>
        </div>
      </div>

      {top5.length > 0 ? (
        <div className="space-y-3">
          {top5.map((subject, index) => (
            <div key={subject._id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-dark-text font-medium flex items-center gap-1.5">
                  <span>{SUBJECT_ICONS[subject._id] || '📚'}</span>
                  {subject._id}
                </span>
                <span className="text-dark-muted">{subject.count}</span>
              </div>
              <div className="h-1.5 bg-dark-bg rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(subject.count / maxCount) * 100}%` }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-dark-muted text-center py-4">
          No data yet. Start sharing!
        </p>
      )}
    </motion.div>
  );
}
