export function Hero() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-block mb-4">
          <span className="px-5 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
            Trending Repositories
          </span>
        </div>
        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Discover <span className="text-blue-600 dark:text-blue-400">Open Source</span> Projects
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Explore trending GitHub repositories, bookmark your favorites, and keep track of interesting projects.
        </p>
      </div>
    </div>
  );
}
