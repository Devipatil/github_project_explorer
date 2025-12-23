export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
}

export interface Bookmark {
  id: string;
  repo_id: number;
  repo_name: string;
  repo_url: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  created_at: string;
}

export interface Note {
  id: string;
  bookmark_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export type SortOption = 'stars' | 'forks' | 'updated';
export type SortOrder = 'desc' | 'asc';
export type TabType = 'trending' | 'bookmarks' | 'analytics';
