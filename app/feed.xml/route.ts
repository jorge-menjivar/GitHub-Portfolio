import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import {
  getGithubPostsRepo,
  getGithubUsername,
} from '@/lib/utils/env-variables/constants';

import { fetchPosts } from '@/helpers/posts';
import { Feed } from 'feed';
import { marked } from 'marked';

export const dynamic = 'force-dynamic';

export async function GET() {
  const ghUsername = getGithubUsername();
  const ghPostsRepo = getGithubPostsRepo();

  revalidatePath('/feed.xml');

  const posts = await fetchPosts();

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
        link: process.env.SITE_URL || '',
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
              link: process.env.SITE_URL || '',
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

    return response;
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Error generating feed' },
      { status: 500 },
    );
  }
}
