import { revalidatePath } from 'next/cache';

import {
  getGithubPostsRepo,
  getGithubToken,
  getGithubUsername,
} from '@/lib/utils/env-variables/constants';

import { GithubPost } from '@/types/github';

import { fetchPosts } from '@/helpers/posts';
import { fetchProjects } from '@/helpers/projects';
import { Readable } from 'node:stream';
import { SitemapStream, streamToPromise } from 'sitemap';

export const dynamic = 'force-dynamic';

export async function GET() {
  revalidatePath('/feed.xml');
  const ghToken = getGithubToken();
  const ghUsername = getGithubUsername();
  const ghPostsRepo = getGithubPostsRepo();

  const posts = await fetchPosts();
  const projects = await fetchProjects();

  const postUrls = posts.map((post: GithubPost) => {
    let url = `/posts/${post.raw_name}`;
    url = encodeURI(url);

    return url;
  });

  const projectUrls = projects.map((project: any) => {
    let url = `/projects/${project.name}`;
    url = encodeURI(url);

    return url;
  });

  const otherUrls = ['/', '/projects', '/about'];

  // An array with your links
  const links = [...postUrls, ...projectUrls, ...otherUrls];

  // Create a stream to write to
  const stream = new SitemapStream({ hostname: process.env.SITE_URL });

  // We need to return an xml string
  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream),
  ).then((data) => data.toString());

  return new Response(xmlString, {
    headers: {
      'content-type': 'application/xml;charset=UTF-8',
    },
  });
}
