import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiShare2,
  FiSearch,
  FiFolder,
  FiUsers,
  FiBook,
  FiGrid,
  FiChevronDown,
  FiChevronUp,
  FiArrowRight,
  FiStar,
  FiBookOpen,
} from 'react-icons/fi';
import { SUBJECT_ICONS } from '../utils/constants';
import { notesAPI } from '../services/api';
import Footer from '../components/Footer';

/* ─── Floating particle (memoized) ─── */
function Particle({ style }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={style}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        opacity: [0.15, 0.4, 0.15],
      }}
      transition={{
        duration: style.dur,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: style.delay,
      }}
    />
  );
}

export default function LandingPage() {
  const [stats, setStats] = useState(null);
  const [faqOpen, setFaqOpen] = useState(null);

  useEffect(() => {
    notesAPI.getStats().then((r) => setStats(r.data.stats)).catch(() => {});
  }, []);

  /* Pre-compute particles */
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        width: Math.random() * 4 + 2,
        height: Math.random() * 4 + 2,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        background:
          i % 3 === 0 ? '#6366F1' : i % 3 === 1 ? '#8B5CF6' : '#06B6D4',
        dur: 4 + Math.random() * 4,
        delay: Math.random() * 3,
      })),
    []
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  };

  const features = [
    { icon: FiShare2, title: 'Share Resources', desc: 'Upload and share Google Drive links to notes, PDFs, and study materials with your peers.' },
    { icon: FiSearch, title: 'Discover Content', desc: 'Search and browse through a curated library of academic resources across all subjects.' },
    { icon: FiFolder, title: 'Stay Organized', desc: 'Filter by subjects, track your contributions, and keep your study materials in one place.' },
    { icon: FiUsers, title: 'Build Community', desc: 'Join a growing community of students helping each other succeed in academics.' },
  ];

  const subjectsList = Object.entries(SUBJECT_ICONS);

  const testimonials = [
    { name: 'Priya S.', course: 'B.Tech CSE', text: 'StudyBuddy saved me during my DBMS semester. Found amazing notes within minutes!', avatar: 'P' },
    { name: 'Arjun K.', course: 'B.Tech IT', text: 'I love how easy it is to share and find resources. The UI is super clean too.', avatar: 'A' },
    { name: 'Neha R.', course: 'M.Tech AI', text: 'The subject-wise filtering is a game changer. Best platform for academic resources.', avatar: 'N' },
  ];

  const faqs = [
    { q: 'Is StudyBuddy free to use?', a: 'Yes! StudyBuddy is completely free for all students. Sign up and start sharing resources today.' },
    { q: 'What types of resources can I share?', a: 'You can share any academic resource via Google Drive links — notes, PDFs, presentations, code files, and more.' },
    { q: 'How do I share a resource?', a: 'Simply sign up, click "Share Resource", fill in the details, paste your Google Drive link, and submit!' },
    { q: 'Can I edit or delete my resources?', a: 'Yes, you have full control over your resources. Visit "My Resources" to edit or delete any resource you\'ve shared.' },
    { q: 'Is my data safe?', a: 'Absolutely. We use industry-standard encryption and JWT authentication to keep your account secure.' },
  ];

  return (
    <div className="min-h-screen bg-dark-bg overflow-hidden">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center gradient-hero animate-gradient-shift">
        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p, i) => (
            <Particle key={i} style={p} />
          ))}
        </div>

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent/10 rounded-full blur-[100px]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <FiStar className="text-amber-400 text-sm" />
            <span className="text-xs font-medium text-dark-muted">
              Trusted by {stats?.totalUsers || '100'}+ students
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 text-balance"
          >
            Your Academic{' '}
            <span className="gradient-text">Knowledge Hub</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-dark-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Discover, share, and organize study resources with your peers.
            One platform for all your academic materials — powered by Google Drive.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/register" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
              Get Started Free
              <FiArrowRight />
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-4">
              Browse Resources
            </Link>
          </motion.div>

          {/* Stats strip */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto"
            >
              {[
                { value: stats.totalNotes, label: 'Resources', icon: FiBook },
                { value: stats.totalUsers, label: 'Students', icon: FiUsers },
                { value: stats.totalSubjects, label: 'Subjects', icon: FiGrid },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-black gradient-text">
                    {s.value}+
                  </p>
                  <p className="text-xs text-dark-muted mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <FiChevronDown className="text-dark-muted text-2xl" />
        </motion.div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Features
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-black text-dark-text mb-4">
              Everything you need to{' '}
              <span className="gradient-text">ace your studies</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-dark-muted max-w-xl mx-auto">
              A complete toolkit for academic resource sharing — simple, fast,
              and beautiful.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="card p-6 text-center group"
              >
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
                  <f.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-dark-text mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-dark-muted leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ POPULAR SUBJECTS ═══ */}
      <section className="py-24 px-4 bg-gradient-to-b from-dark-bg via-dark-card/20 to-dark-bg">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Subjects
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-black text-dark-text mb-4">
              Explore{' '}
              <span className="gradient-text">popular subjects</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {subjectsList.map(([name, emoji], i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="card p-5 text-center cursor-pointer group"
              >
                <span className="text-3xl block mb-3 group-hover:animate-bounce-gentle">
                  {emoji}
                </span>
                <p className="text-sm font-semibold text-dark-text">{name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">
              Testimonials
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-black text-dark-text mb-4">
              Loved by{' '}
              <span className="gradient-text">students everywhere</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full gradient-accent flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-dark-text">{t.name}</p>
                    <p className="text-xs text-dark-muted">{t.course}</p>
                  </div>
                </div>
                <p className="text-sm text-dark-muted leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex gap-1 mt-3">
                  {Array(5).fill(0).map((_, idx) => (
                    <FiStar
                      key={idx}
                      className="text-amber-400 text-xs fill-current"
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 px-4 bg-gradient-to-b from-dark-bg via-dark-card/20 to-dark-bg">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              FAQ
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-black text-dark-text">
              Frequently asked{' '}
              <span className="gradient-text">questions</span>
            </motion.h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-semibold text-dark-text pr-4">
                    {faq.q}
                  </span>
                  {faqOpen === i ? (
                    <FiChevronUp className="text-primary flex-shrink-0" />
                  ) : (
                    <FiChevronDown className="text-dark-muted flex-shrink-0" />
                  )}
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: faqOpen === i ? 'auto' : 0,
                    opacity: faqOpen === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm text-dark-muted leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center glass rounded-3xl p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
            <FiBookOpen className="text-white text-2xl" />
          </div>
          <h2 className="text-3xl font-black text-dark-text mb-4">
            Ready to boost your studies?
          </h2>
          <p className="text-dark-muted mb-8 max-w-md mx-auto">
            Join thousands of students sharing knowledge. It's free, fast, and
            built for you.
          </p>
          <Link
            to="/register"
            className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
          >
            Get Started Now
            <FiArrowRight />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
