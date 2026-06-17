import { SUBJECTS, SUBJECT_ICONS } from '../utils/constants';

export default function SubjectFilter({ selected, onSelect }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
      {SUBJECTS.map((subject) => (
        <button
          key={subject}
          onClick={() => onSelect(subject)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            selected === subject
              ? 'chip-active shadow-lg shadow-primary/20'
              : 'chip hover:bg-primary/10'
          }`}
        >
          {subject !== 'All' && (
            <span className="text-sm">{SUBJECT_ICONS[subject]}</span>
          )}
          {subject}
        </button>
      ))}
    </div>
  );
}
