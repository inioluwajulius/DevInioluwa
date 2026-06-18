import { useQuery } from '@tanstack/react-query';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  homepage: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
}

const GITHUB_USERNAME = 'inioluwajulius';

const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub repos');
  }
  const repos: GitHubRepo[] = await response.json();
  // Filter out forks and return non-fork repos
  return repos.filter(repo => !repo.fork);
};

export const useGitHubRepos = () => {
  return useQuery({
    queryKey: ['github-repos', GITHUB_USERNAME],
    queryFn: fetchGitHubRepos,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // Auto-refresh every 10 minutes
  });
};
