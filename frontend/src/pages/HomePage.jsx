import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrendingUp, FiClock } from 'react-icons/fi';
import { notesAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import SubjectFilter from '../components/SubjectFilter';
import ResourceCard from '../components/ResourceCard';
import CommunityStats from '../components/CommunityStats';
import StudyStreakWidget from '../components/StudyStreakWidget';
import SubjectPopularityWidget from '../components/SubjectPopularityWidget';
import EmptyState from '../components/EmptyState';
import { SkeletonGrid } from '../components/Loader';

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch notes
  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      if (searchQuery) {
        const { data } = await notesAPI.search(searchQuery);
        setNotes(data.notes);
      } else {
        const params = {};
        if (selectedSubject !== 'All') params.subject = selectedSubject;
        const { data } = await notesAPI.getAll(params);
        setNotes(data.notes);
      }
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedSubject]);

  // Fetch stats
  useEffect(() => {
    notesAPI.getStats().then((r) => setStats(r.data.stats)).catch(() => {});
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSearch = useCallback((q) => {
    setSearchQuery(q);
    if (q) setSelectedSubject('All');
  }, []);

  const handleSubjectChange = useCallback((subject) => {
    setSelectedSubject(subject);
    setSearchQuery('');
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="page-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-black text-dark-text mb-2">
              Discover <span className="gradient-text">Resources</span>
            </h1>
            <p className="text-dark-muted">
              Browse and search through study materials shared by the community.
            </p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4 mb-8"
          >
            <SearchBar onSearch={handleSearch} />
            <SubjectFilter
              selected={selectedSubject}
              onSelect={handleSubjectChange}
            />
          </motion.div>

          {/* Community Stats */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-10"
            >
              <CommunityStats stats={stats} />
            </motion.div>
          )}

          {/* Content Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-6">
                {searchQuery ? (
                  <>
                    <FiTrendingUp className="text-primary" />
                    <h2 className="text-lg font-bold text-dark-text">
                      Search results for &ldquo;{searchQuery}&rdquo;
                    </h2>
                  </>
                ) : (
                  <>
                    <FiClock className="text-primary" />
                    <h2 className="text-lg font-bold text-dark-text">
                      {selectedSubject === 'All'
                        ? 'Recent Resources'
                        : `${selectedSubject} Resources`}
                    </h2>
                  </>
                )}
              </div>

              {loading ? (
                <SkeletonGrid count={6} />
              ) : notes.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {notes.map((note) => (
                      <ResourceCard key={note._id} note={note} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <EmptyState
                  title={
                    searchQuery
                      ? 'No results found'
                      : 'No resources yet'
                  }
                  message={
                    searchQuery
                      ? 'Try different keywords or remove filters.'
                      : 'Be the first to share a resource!'
                  }
                  actionLabel="Share Resource"
                  onAction={() => navigate('/add-resource')}
                />
              )}
            </div>

            {/* Sidebar widgets */}
            <div className="lg:w-80 space-y-6 flex-shrink-0">
              <StudyStreakWidget weeklyNotes={stats?.weeklyNotes || 0} />
              <SubjectPopularityWidget
                subjectBreakdown={stats?.subjectBreakdown || []}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
