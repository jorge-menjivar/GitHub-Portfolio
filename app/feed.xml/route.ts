import { NextResponse } from 'next/server';

import {
  getGithubPostsRepo,
  getGithubToken,
  getGithubUsername,
} from '@/lib/utils/env-variables/constants';

import { GithubPost } from '@/types/github';

import { format } from 'date-fns';
import { Feed } from 'feed';
import { marked } from 'marked';

export async function GET() {
  const ghToken = getGithubToken();
  const ghUsername = getGithubUsername();
  const ghPostsRepo = getGithubPostsRepo();

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

    try {
      const feed = new Feed({
        title: process.env.RSS_FEED_TITLE || 'My Feed',
        description: process.env.RSS_FEED_DESCRIPTION || 'My Feed',
        id: process.env.SITE_URL || 'https://example.com/',
        link: process.env.SITE_URL || 'https://example.com/',
        language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
        image: process.env.SITE_URL + '/favicon-32x32.png',
        favicon: process.env.SITE_URL + '/favicon.ico',
        copyright: `All rights reserved 2023, ${process.env.AUTHOR_NAME}`,
        updated: new Date(2013, 6, 14), // optional, default = today
        generator: 'awesome', // optional, default = 'Feed for Node.js'
        author: {
          name: process.env.AUTHOR_NAME || '',
          email: process.env.AUTHOR_EMAIL || '',
          link: process.env.AUTHOR_LINK || '',
        },
      });

      for (const post of posts) {
        let url = `https://raw.githubusercontent.com/${ghUsername}/${ghPostsRepo}/main/posts/${post.raw_name}`;
        url = encodeURI(url);

        console.log('url', url);

        const response = await fetch(url);

        if (response.ok) {
          const markdownContent = await response.text();

          console.log('content', markdownContent);

          let link =
            process.env.SITE_URL +
            '/posts/' +
            post.publish_date +
            ' ' +
            post.title;

          // URL encode the link
          link = encodeURI(link);

          const htmlContent = marked.parse(markdownContent);

          feed.addItem({
            title: post.title,
            id: link,
            link: link,
            description: htmlContent.slice(0, 500) + '...',
            content: htmlContent,
            author: [
              {
                name: process.env.AUTHOR_NAME || '',
                email: process.env.AUTHOR_EMAIL || '',
                link: process.env.AUTHOR_LINK || '',
              },
            ],
            date: new Date(post.publish_date),
          });
        }
      }

      console.log('feed', feed.rss2());

      const response = new Response(feed.rss2(), {
        headers: {
          'content-type': 'application/rss+xml; charset=utf-8',
        },
      });

      // Using cookies to keep the route from being cached by Vercel
      // https://vercel.com/docs/concepts/functions/edge-caching#cache-control
      response.headers.set(
        'Cache-Control',
        's-maxage=1, stale-while-revalidate',
      );

      return response;
    } catch (e) {
      console.log(e);
      return NextResponse.json(
        { error: 'Error generating feed' },
        { status: 500 },
      );
    }
  }
}
