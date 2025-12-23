import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  sortOrder: string;
  onSortOrderChange: () => void;
  resultCount: number;
}

const languages = [
  'All languages',
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'Go',
  'Rust',
  'C++',
  'C#',
  'Ruby',
  'PHP',
  'Swift',
  'Kotlin',
];

export function SearchBar({
  searchQuery,
  onSearchChange,
  language,
  onLanguageChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
  resultCount,
}: SearchBarProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-4 items-center mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-colors"
          />
        </div>

        <div className="relative">
          <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="pl-12 pr-10 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer dark:text-white transition-colors min-w-[200px]"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="pl-12 pr-10 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer dark:text-white transition-colors min-w-[160px]"
          >
            <option value="stars">Stars</option>
            <option value="forks">Forks</option>
            <option value="updated">Updated</option>
          </select>
        </div>

        <button
          onClick={onSortOrderChange}
          className="px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          title={sortOrder === 'desc' ? 'Descending' : 'Ascending'}
        >
          <ArrowUpDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <p className="text-right text-sm text-gray-600 dark:text-gray-400">
        {resultCount} repositories found
      </p>
    </div>
  );
}
