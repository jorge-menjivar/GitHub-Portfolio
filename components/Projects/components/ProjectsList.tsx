'use client';

import {
  IconGitFork,
  IconLicense,
  IconScale,
  IconStar,
} from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';

import { GithubProject } from '@/types/github';

import { Badge } from '@/components/Common/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/Common/ui/card';

import { format } from 'date-fns';

export const ProjectsList = () => {
  const [projects, setProjects] = useState<GithubProject[]>([]);

  const fetchProjects = useCallback(async () => {
    const response = await fetch('/api/github/projects', {
      method: 'GET',
    });

    if (response.ok) {
      const jsonResp = await response.json();
      const _projects = jsonResp.projects as GithubProject[];
      console.log('projects', _projects);

      // Sort by most recently pushed to.
      _projects.sort((a, b) => {
        return (
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
        );
      });

      setProjects(_projects);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="flex flex-col w-full gap-y-2">
      {projects.map((project) => {
        return (
          <Link key={project.id} href={`/projects/${project.name}`}>
            <Card>
              <CardContent className="py-0">
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="gap-x-6">
                <Badge variant="outline">{project.language}</Badge>
                <div className="flex flex-row text-2xs items-center">
                  <IconScale size={16} className="mr-1" />
                  {project.license?.name}
                </div>

                <div className="flex flex-row text-2xs items-center">
                  <IconStar size={16} className="mr-1" />
                  {project.stargazers_count}
                </div>

                <div className="flex flex-row text-2xs items-center">
                  <IconGitFork size={16} className="mr-1" />
                  {project.forks_count}
                </div>

                <div className="flex flex-row text-2xs items-center">
                  Updated {format(new Date(project.pushed_at), 'MMM dd, yyyy')}
                </div>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
