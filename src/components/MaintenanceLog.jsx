import React, { useState, useEffect } from 'react';
import MaintenanceEntry from './MaintenanceEntry';

const TagColors = {
  default: 'bg-gray-300 text-gray-800',
  audio: 'bg-indigo-200 text-indigo-800',
  engine: 'bg-red-200 text-red-800',
  suspension: 'bg-green-200 text-green-800',
  electrical: 'bg-yellow-200 text-yellow-800',
  // add your tags here...
};

function Chevron({ open }) {
  return (
    <svg
      className={`mr-3 h-5 w-5 text-blue-600 dark:text-blue-400 transform transition-transform duration-300 ${
        open ? 'rotate-90' : ''
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function MaintenanceLog({ entries }) {
  const [filter, setFilter] = useState('');
  const [openIndexes, setOpenIndexes] = useState({});

  // Debounce search input by 300ms
  const [debouncedFilter, setDebouncedFilter] = useState(filter);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedFilter(filter), 300);
    return () => clearTimeout(handler);
  }, [filter]);

  const filteredEntries = entries.filter(({ title, tags }) => {
    const search = debouncedFilter.toLowerCase();
    return (
      title.toLowerCase().includes(search) ||
      tags.some((tag) => tag.toLowerCase().includes(search))
    );
  });

  const toggleOpen = (index) => {
    setOpenIndexes((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const expandAll = () => {
    const newState = {};
    filteredEntries.forEach((_, i) => (newState[i] = true));
    setOpenIndexes(newState);
  };

  const collapseAll = () => {
    setOpenIndexes({});
  };

  return (
    <div>
      <div className="flex items-center mb-4 gap-4">
        <input
          type="search"
          placeholder="Filter by tag or title..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-grow border rounded px-3 py-2 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter maintenance entries"
        />
        <button
          onClick={expandAll}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
          type="button"
        >
          Expand All
        </button>
        <button
          onClick={collapseAll}
          className="bg-gray-300 text-gray-800 rounded px-4 py-2 hover:bg-gray-400 transition"
          type="button"
        >
          Collapse All
        </button>
      </div>

      {filteredEntries.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No maintenance entries found.
        </p>
      ) : (
        filteredEntries.map(({ date, title, tags, content }, i) => (
          <details
            key={date + title}
            open={!!openIndexes[i]}
            onToggle={() => toggleOpen(i)}
            className="my-4 border rounded-lg p-4 bg-white dark:bg-gray-900 shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <summary
              className="flex items-center cursor-pointer font-semibold text-lg select-none hover:text-blue-600 dark:hover:text-blue-400"
              aria-expanded={openIndexes[i] ? 'true' : 'false'}
            >
              <Chevron open={openIndexes[i]} />
              📅 {date} — {title}
            </summary>
            <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              <div dangerouslySetInnerHTML={{ __html: content }} />
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const classes = TagColors[tag.toLowerCase()] || TagColors.default;
                  return (
                    <span
                      key={tag}
                      className={`${classes} px-2 py-0.5 rounded-full text-xs font-medium select-none`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          </details>
        ))
      )}
    </div>
  );
}
