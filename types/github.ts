export interface GithubProject {
  id: number;
  name: string;
  full_name: string;
  node_id: string;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    url: string;
  };
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  pushed_at: string;
  language?: string;
  license: {
    key: string;
    name: string;
  };
}

export interface GithubPost {
  title: string;
  publish_date: string;
  download_url: string;
}
