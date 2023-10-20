import { NextResponse } from 'next/server';

import {
  getGithubToken,
  getGithubUsername,
} from '@/lib/utils/env-variables/constants';

import { GithubPost } from '@/types/github';

import { format } from 'date-fns';

export async function GET() {
  const ghToken = getGithubToken();
  const ghUsername = getGithubUsername();

  const response = await fetch(
    `https://api.github.com/repos/${ghUsername}/posts/contents/posts`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `token ${ghToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'cache-control': 'no-cache',
      },
    },
  );

  let posts: GithubPost[] = [];
  if (response.ok) {
    const json = await response.json();

    posts = json.filter((post: any) => post.type === 'file');

    // Drop unnecessary fields
    posts = posts.map((rawPost: any) => {
      const { name, path, sha, size, download_url, type, _links } = rawPost;

      if (name.length < 14) {
        console.warn('Skipping post. Invalid name for post', rawPost.name);
        return null;
      }

      const publishDate = rawPost.name.slice(0, 10);

      const tmp = new Date(publishDate);

      if (isNaN(tmp.getTime())) {
        console.warn(
          'Skipping post. Error parsing date for post',
          rawPost.name,
        );
        return null;
      }

      let title = rawPost.name.slice(11).slice(0, -3);

      const post: GithubPost = {
        title,
        publish_date: publishDate,
        raw_name: rawPost.name,
      };

      return post;
    }) as GithubPost[];

    posts = posts.filter((post: GithubPost) => !!post);
  }

  return NextResponse.json({ posts });
}
