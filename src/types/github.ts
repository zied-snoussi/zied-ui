// GitHub API Response Types

export interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
    name: string;
    company: string | null;
    blog: string;
    location: string;
    email: string | null;
    bio: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    // Private counts (only available with 'repo' scope)
    total_private_repos?: number;
    owned_private_repos?: number;
    private_gists?: number;
    disk_usage?: number;
    collaborators?: number;
}

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    language: string | null;
    topics: string[];
    created_at: string;
    updated_at: string;
    pushed_at: string;
    private: boolean; // true if repo is private
    size: number; // repo size in KB
}

export interface LanguageStats {
    [language: string]: number;
}

export interface ContributionDay {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionStats {
    totalContributions: number;
    weeks: Array<{
        days: ContributionDay[];
    }>;
}

export interface GitHubStats {
    user: GitHubUser;
    repos: GitHubRepo[];
    totalStars: number;
    totalForks: number;
    languages: LanguageStats;
    contributions: ContributionStats;
    topRepos: GitHubRepo[];
}

export interface GitHubError {
    message: string;
    status?: number;
    documentation_url?: string;
}
