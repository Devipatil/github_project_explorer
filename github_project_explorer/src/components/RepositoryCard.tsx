import { Star, GitFork, Circle, Bookmark, FileText } from 'lucide-react';
import { GitHubRepo } from '../types';

interface RepositoryCardProps {
  repo: GitHubRepo;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onAddNote: () => void;
}

export function RepositoryCard({
  repo,
  isBookmarked,
  onToggleBookmark,
  onAddNote,
}: RepositoryCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'today';
    if (diffInDays === 1) return 'yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <img
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
              {repo.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {repo.owner.login}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onAddNote}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            title="Add note"
          >
            <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={onToggleBookmark}
            className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${
              isBookmarked ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {repo.description || 'No description available'}
      </p>

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{formatNumber(repo.stargazers_count)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <GitFork className="w-4 h-4 text-blue-500" />
            <span className="font-medium">{formatNumber(repo.forks_count)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <Circle className="w-4 h-4 text-green-500 fill-green-500" />
            <span className="font-medium">{repo.open_issues_count}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {repo.language && (
            <div className="flex items-center gap-2">
              <Circle className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400 fill-current" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{repo.language}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-500">
          Updated {getTimeAgo(repo.updated_at)}
        </p>
      </div>
    </div>
  );
}
