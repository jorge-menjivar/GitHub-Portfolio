const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
const GITHUB_POSTS_REPO = process.env.NEXT_PUBLIC_GITHUB_POSTS_REPO;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_EXCLUDE_LIST = process.env.GITHUB_EXCLUDE_LIST;

export function getGithubUsername() {
  if (!GITHUB_USERNAME) {
    console.warn('NEXT_PUBLIC_GITHUB_USERNAME is not set');
  }

  return GITHUB_USERNAME;
}

export function getGithubToken() {
  if (!GITHUB_TOKEN) {
    console.warn('GITHUB_TOKEN is not set');
  }

  return GITHUB_TOKEN;
}

export function getGithubExcludeList() {
  if (!GITHUB_EXCLUDE_LIST) {
    console.warn('GITHUB_EXCLUDE_LIST is not set');
  }

  return GITHUB_EXCLUDE_LIST;
}

export function getGithubPostsRepo() {
  if (!GITHUB_POSTS_REPO) {
    console.warn('NEXT_PUBLIC_GITHUB_POSTS_REPO is not set');
  }

  return GITHUB_POSTS_REPO;
}
