import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar({ onSearch, placeholder = 'Search resources...' }) {
  const [query, setQuery] = useState('');
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      onSearch?.(query.trim());
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <FiSearch className="text-dark-muted text-lg" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-12 pr-10"
        id="search-bar"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-dark-muted hover:text-dark-text transition-colors"
        >
          <FiX className="text-lg" />
        </button>
      )}
    </div>
  );
}
