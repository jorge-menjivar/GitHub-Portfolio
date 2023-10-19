'use client';

import {
  IconGitFork,
  IconLicense,
  IconScale,
  IconStar,
} from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';

import { GithubPost, GithubProject } from '@/types/github';

import { Badge } from '@/components/Common/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/Common/ui/card';

import { format } from 'date-fns';

export const PostsList = () => {
  const [posts, setPosts] = useState<GithubPost[]>([]);

  const fetchProjects = useCallback(async () => {
    const response = await fetch('/api/github/posts', {
      method: 'GET',
    });

    if (response.ok) {
      const jsonResp = await response.json();
      const _posts = jsonResp.posts as GithubPost[];
      console.log('posts', _posts);

      setPosts(_posts);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="flex flex-col w-full gap-y-2">
      {posts.map((post) => {
        return (
          <Link
            key={post.title + post.publish_date}
            href={`/posts/${post.publish_date}%20${post.title}`}
          >
            <Card>
              <CardContent className="py-0">
                <CardTitle>{post.title}</CardTitle>
              </CardContent>
              <CardFooter className="gap-x-6">
                <Badge variant="outline">
                  {format(new Date(post.publish_date), 'MMM dd, yyyy')}
                </Badge>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
