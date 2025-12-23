import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { GitHubRepo } from '../types';
import { TrendingUp, GitFork, Star, Code } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalyticsProps {
  repositories: GitHubRepo[];
}

export function Analytics({ repositories }: AnalyticsProps) {
  const [languageData, setLanguageData] = useState<any>(null);
  const [starsData, setStarsData] = useState<any>(null);
  const [forksData, setForksData] = useState<any>(null);

  useEffect(() => {
    if (repositories.length === 0) return;

    const languageCounts: Record<string, number> = {};
    repositories.forEach((repo) => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });

    const sortedLanguages = Object.entries(languageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);

    const colors = [
      '#3b82f6',
      '#8b5cf6',
      '#ec4899',
      '#f59e0b',
      '#10b981',
      '#06b6d4',
      '#6366f1',
      '#f97316',
    ];

    setLanguageData({
      labels: sortedLanguages.map(([lang]) => lang),
      datasets: [
        {
          data: sortedLanguages.map(([, count]) => count),
          backgroundColor: colors,
          borderWidth: 0,
        },
      ],
    });

    const topReposByStars = [...repositories]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 10);

    setStarsData({
      labels: topReposByStars.map((repo) => repo.name),
      datasets: [
        {
          label: 'Stars',
          data: topReposByStars.map((repo) => repo.stargazers_count),
          backgroundColor: '#3b82f6',
          borderRadius: 8,
        },
      ],
    });

    const topReposByForks = [...repositories]
      .sort((a, b) => b.forks_count - a.forks_count)
      .slice(0, 10);

    setForksData({
      labels: topReposByForks.map((repo) => repo.name),
      datasets: [
        {
          label: 'Forks',
          data: topReposByForks.map((repo) => repo.forks_count),
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    });
  }, [repositories]);

  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);
  const avgStars = Math.round(totalStars / repositories.length);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Repository Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Repos</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{repositories.length}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Stars</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {totalStars.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <GitFork className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Forks</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {totalForks.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <Code className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Avg Stars</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {avgStars.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Top Repositories by Stars
          </h3>
          <div className="h-80">
            {starsData && <Bar data={starsData} options={chartOptions} />}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Programming Languages
          </h3>
          <div className="h-80">
            {languageData && <Doughnut data={languageData} options={doughnutOptions} />}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Fork Trends - Top Repositories
        </h3>
        <div className="h-80">
          {forksData && <Line data={forksData} options={chartOptions} />}
        </div>
      </div>
    </div>
  );
}
