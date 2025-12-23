import { Github, Moon, Sun } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Header({ activeTab, onTabChange, isDark, onToggleTheme }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gray-900 dark:bg-gray-100 rounded-xl p-2.5">
              <Github className="w-6 h-6 text-white dark:text-gray-900" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                GitHub Explorer
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Discover trending repos
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <button
              onClick={() => onTabChange('trending')}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'trending'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => onTabChange('bookmarks')}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'bookmarks'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              Bookmarks
            </button>
            <button
              onClick={() => onTabChange('analytics')}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === 'analytics'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              Analytics
            </button>
          </nav>

          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
