import { IconArrowLeft } from '@tabler/icons-react';

import Link from 'next/link';

import { GithubMarkdown } from '@/components/Common/GithubReadme';
import Navbar from '@/components/Common/Navbar';
import { Body, Content } from '@/components/Common/Pages';
import { Subtitle, Title } from '@/components/Common/Text';
import { Button } from '@/components/Common/ui/button';

import { format } from 'date-fns';

export const Post = ({ params }: { params: { postSlug: string } }) => {
  // postSlug is in the format of: "2021-08-01%20My%20Post%20Title"
  // We need to convert it to: "2021-08-01 My Post Title" by decoding all
  // encoded characters.
  let prettyTitle = decodeURIComponent(params.postSlug);
  let date = prettyTitle.slice(0, 10); // Get the date from the title.
  prettyTitle = prettyTitle.slice(11); // Remove the date from the title.

  return (
    <div>
      <Navbar initialLocation="/" />
      <Body>
        <div className="flex flex-row items-center m-4 mb-0">
          <Link href="/">
            <Button className="mr-2">
              <IconArrowLeft size={16} />
            </Button>
          </Link>
          <Title className="m-0">{prettyTitle}</Title>
        </div>
        <Subtitle className="m-0 ml-[76px] mb-3">
          {format(new Date(date), 'MMM dd, yyyy')}
        </Subtitle>
        <Content>
          <GithubMarkdown postName={params.postSlug} />
        </Content>
      </Body>
    </div>
  );
};

export default Post;
