import { GitHubRepo } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

export async function searchRepositories(
  query: string = '',
  language: string = '',
  sort: string = 'stars',
  order: string = 'desc',
  perPage: number = 30
): Promise<{ items: GitHubRepo[]; total_count: number }> {
  let searchQuery = 'stars:>1000';

  if (query) {
    searchQuery = `${query} ${searchQuery}`;
  }

  if (language) {
    searchQuery += ` language:${language}`;
  }

  const url = new URL(`${GITHUB_API_BASE}/search/repositories`);
  url.searchParams.append('q', searchQuery);
  url.searchParams.append('sort', sort);
  url.searchParams.append('order', order);
  url.searchParams.append('per_page', perPage.toString());

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getTrendingRepositories(
  language: string = '',
  since: string = 'daily'
): Promise<GitHubRepo[]> {
  const dateRange = getDateRange(since);
  const searchQuery = `created:>${dateRange} stars:>100${language ? ` language:${language}` : ''}`;

  const url = new URL(`${GITHUB_API_BASE}/search/repositories`);
  url.searchParams.append('q', searchQuery);
  url.searchParams.append('sort', 'stars');
  url.searchParams.append('order', 'desc');
  url.searchParams.append('per_page', '30');

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.items;
}

function getDateRange(since: string): string {
  const date = new Date();
  switch (since) {
    case 'daily':
      date.setDate(date.getDate() - 1);
      break;
    case 'weekly':
      date.setDate(date.getDate() - 7);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() - 1);
      break;
    default:
      date.setDate(date.getDate() - 1);
  }
  return date.toISOString().split('T')[0];
}

export async function getRepositoryStats(owner: string, repo: string) {
  const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json();
}
