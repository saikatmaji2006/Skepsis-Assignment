import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiBook,
  FiAward,
  FiTrendingUp,
} from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { notesAPI } from '../services/api';
import Navbar from '../components/Navbar';
import ResourceCard from '../components/ResourceCard';
import { SkeletonGrid } from '../components/Loader';

export default function ProfilePage() {
  const { user } = useAuth();
  const [myNotes, setMyNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notesAPI
      .getMy()
      .then((r) => setMyNotes(r.data.notes))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'Recently joined';

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="page-container">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-8 mb-10 relative overflow-hidden"
          >
            {/* Decorative gradient stripe */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-primary/20">
                {initials}
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-black text-dark-text mb-1">
                  {user?.name || 'Student'}
                </h1>
                <p className="text-dark-muted flex items-center justify-center sm:justify-start gap-2 mb-4">
                  <FiMail size={14} />
                  {user?.email}
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5">
                    <FiBook className="text-primary" size={16} />
                    <span className="text-sm font-semibold text-dark-text">
                      {myNotes.length}
                    </span>
                    <span className="text-xs text-dark-muted">Resources</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5">
                    <FiCalendar className="text-accent" size={16} />
                    <span className="text-xs text-dark-muted">
                      Member since {memberSince}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5">
                    <FiAward className="text-amber-400" size={16} />
                    <span className="text-xs text-dark-muted">
                      {myNotes.length >= 10
                        ? 'Power Contributor 🏆'
                        : myNotes.length >= 5
                        ? 'Active Contributor ⭐'
                        : 'Getting Started 🌱'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <FiTrendingUp className="text-primary" />
              <h2 className="text-lg font-bold text-dark-text">
                Your Recent Resources
              </h2>
            </div>

            {loading ? (
              <SkeletonGrid count={3} />
            ) : myNotes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myNotes.slice(0, 6).map((note) => (
                  <ResourceCard key={note._id} note={note} />
                ))}
              </div>
            ) : (
              <div className="card p-12 text-center">
                <FiBook className="text-dark-muted text-3xl mx-auto mb-4" />
                <p className="text-dark-muted text-sm">
                  You haven't shared any resources yet.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
