import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import {
  FiHome,
  FiPlusCircle,
  FiFolder,
  FiUser,
  FiLogOut,
  FiLogIn,
  FiBookOpen,
} from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

  const navLinks = isAuthenticated
    ? [
        { to: '/home', label: 'Home', icon: FiHome },
        { to: '/add-resource', label: 'Share Resource', icon: FiPlusCircle },
        { to: '/my-resources', label: 'My Resources', icon: FiFolder },
        { to: '/profile', label: 'Profile', icon: FiUser },
      ]
    : [
        { to: '/login', label: 'Login', icon: FiLogIn },
        { to: '/register', label: 'Sign Up', icon: FiUser },
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to={isAuthenticated ? '/home' : '/'}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
              <FiBookOpen className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold tracking-tight gradient-text">
              StudyBuddy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? 'bg-primary/20 text-primary-200'
                    : 'text-dark-muted hover:text-dark-text hover:bg-white/5'
                }`}
              >
                <link.icon className="text-base" />
                {link.label}
              </Link>
            ))}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-dark-muted hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 ml-2"
              >
                <FiLogOut className="text-base" />
                Logout
              </button>
            )}
          </div>

          {/* User avatar (desktop) */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-3 ml-4">
              <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center text-xs font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-dark-muted hover:text-dark-text hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden glass-strong border-t border-dark-border"
          >
            <div className="px-4 py-4 space-y-1">
              {isAuthenticated && (
                <div className="flex items-center gap-3 px-3 py-3 mb-3 rounded-xl bg-white/5">
                  <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-sm font-bold text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark-text">
                      {user?.name}
                    </p>
                    <p className="text-xs text-dark-muted">{user?.email}</p>
                  </div>
                </div>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? 'bg-primary/20 text-primary-200'
                      : 'text-dark-muted hover:text-dark-text hover:bg-white/5'
                  }`}
                >
                  <link.icon className="text-lg" />
                  {link.label}
                </Link>
              ))}

              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-dark-muted hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
                >
                  <FiLogOut className="text-lg" />
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
