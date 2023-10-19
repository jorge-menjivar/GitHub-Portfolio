import { IconArrowLeft } from '@tabler/icons-react';

import Link from 'next/link';

import { GithubMarkdown } from '@/components/Common/GithubReadme';
import Navbar from '@/components/Common/Navbar';
import { Body, Content } from '@/components/Common/Pages';
import { Title } from '@/components/Common/Text';
import { Button } from '@/components/Common/ui/button';

export const Project = ({ params }: { params: { projectName: string } }) => {
  return (
    <div>
      <Navbar initialLocation="/projects" />
      <Body>
        <div className="flex flex-row items-center m-4 mb-3">
          <Link href="/projects">
            <Button className="mr-2">
              <IconArrowLeft size={16} />
            </Button>
          </Link>
          <Title className="m-0">{params.projectName}</Title>
        </div>
        <Content>
          <GithubMarkdown projectName={params.projectName} />
        </Content>
      </Body>
    </div>
  );
};

export default Project;
