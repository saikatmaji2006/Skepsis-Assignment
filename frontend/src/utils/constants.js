export const SUBJECTS = [
  'All',
  'DSA',
  'DBMS',
  'Operating Systems',
  'Computer Networks',
  'Machine Learning',
  'Artificial Intelligence',
  'Web Development',
  'Java',
  'Python',
  'C++',
  'General',
];

export const SUBJECT_ICONS = {
  'DSA': '🧮',
  'DBMS': '🗄️',
  'Operating Systems': '💻',
  'Computer Networks': '🌐',
  'Machine Learning': '🤖',
  'Artificial Intelligence': '🧠',
  'Web Development': '🌍',
  'Java': '☕',
  'Python': '🐍',
  'C++': '⚡',
  'General': '📚',
};

export const SUBJECT_COLORS = {
  'DSA': 'from-blue-500 to-cyan-500',
  'DBMS': 'from-green-500 to-emerald-500',
  'Operating Systems': 'from-orange-500 to-amber-500',
  'Computer Networks': 'from-purple-500 to-violet-500',
  'Machine Learning': 'from-pink-500 to-rose-500',
  'Artificial Intelligence': 'from-indigo-500 to-blue-500',
  'Web Development': 'from-teal-500 to-green-500',
  'Java': 'from-red-500 to-orange-500',
  'Python': 'from-yellow-500 to-green-500',
  'C++': 'from-sky-500 to-blue-500',
  'General': 'from-gray-500 to-slate-500',
};

export const DRIVE_LINK_REGEX = /^https:\/\/(drive\.google\.com|docs\.google\.com)/;

export const validateDriveLink = (link) => {
  return DRIVE_LINK_REGEX.test(link);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  }
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
};
