import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import {
  getGithubExcludeList,
  getGithubToken,
  getGithubUsername,
} from '@/lib/utils/env-variables/constants';

import { GithubProject } from '@/types/github';

export const dynamic = 'force-dynamic';

export async function GET() {
  revalidatePath('/api/github/projects');
  const ghToken = getGithubToken();
  const ghUsername = getGithubUsername();

  // Using this endpoint because it returns more data than the /user/repos endpoint
  const response = await fetch(
    `https://api.github.com/users/${ghUsername}/repos?per_page=100`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `token ${ghToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'cache-control': 'no-cache',
      },
    },
  );

  let projects: GithubProject[] = [];
  if (response.ok) {
    const json = await response.json();

    projects = json.filter(
      (project: GithubProject) => !project.fork,
    ) as GithubProject[];

    // Drop unnecessary fields
    projects = projects.map((rawProject: GithubProject) => {
      const {
        id,
        name,
        full_name,
        node_id,
        owner,
        private: _private,
        html_url,
        description,
        fork,
        url,
        stargazers_count,
        forks_count,
        open_issues_count,
        updated_at,
        pushed_at,
        language,
        license,
      } = rawProject;

      const project: GithubProject = {
        id,
        name,
        full_name,
        node_id,
        owner,
        private: _private,
        html_url,
        description,
        fork,
        url,
        stargazers_count,
        forks_count,
        open_issues_count,
        updated_at,
        pushed_at,
        language,
        license,
      };
      return project;
    }) as GithubProject[];

    // Drop .github repos
    projects = projects.filter(
      (project: GithubProject) => !project.name.startsWith('.github'),
    ) as GithubProject[];

    // Drop repos that are not mine
    projects = projects.filter(
      (project: GithubProject) => project.owner.login === ghUsername,
    ) as GithubProject[];

    const ghExcludeList = getGithubExcludeList() || '';
    let excludeList = ghExcludeList.split(',');
    // Drop that are in the exclude list
    excludeList = excludeList.map((project) => project.trim());
    projects = projects.filter(
      (project: GithubProject) => !excludeList.includes(project.name),
    ) as GithubProject[];
  }

  return NextResponse.json({ projects });
}
