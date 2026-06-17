import { Link } from 'react-router-dom';
import { FiBookOpen, FiGithub, FiTwitter, FiHeart } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark-bg/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                <FiBookOpen className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold gradient-text">
                StudyBuddy
              </span>
            </Link>
            <p className="text-dark-muted text-sm max-w-md leading-relaxed">
              The ultimate platform for college students to share, discover, and
              organize academic resources. Built by students, for students.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-dark-muted hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <FiGithub />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-dark-muted hover:text-accent hover:bg-accent/10 transition-all duration-200"
              >
                <FiTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-dark-text mb-4 uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2">
              {['Browse Resources', 'Share Notes', 'My Resources', 'Profile'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-dark-muted hover:text-primary transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="text-sm font-semibold text-dark-text mb-4 uppercase tracking-wider">
              Popular Subjects
            </h4>
            <ul className="space-y-2">
              {['DSA', 'DBMS', 'Web Development', 'Machine Learning', 'Python'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-dark-muted hover:text-accent transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-muted">
            © {new Date().getFullYear()} StudyBuddy. All rights reserved.
          </p>
          <p className="text-xs text-dark-muted flex items-center gap-1">
            Made with <FiHeart className="text-red-400 text-xs" /> for students
            everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
