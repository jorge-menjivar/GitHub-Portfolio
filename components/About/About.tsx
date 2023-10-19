import { getGithubUsername } from '@/lib/utils/env-variables/constants';

import { GithubMarkdown } from '../Common/GithubReadme';
import { Navbar } from '../Common/Navbar';
import { Body, Content } from '../Common/Pages';
import { Title } from '../Common/Text';

export const About = () => {
  const ghUsername = getGithubUsername();

  return (
    <div>
      <Navbar initialLocation="/about" />
      <Body>
        <Title>About</Title>
        <Content>
          <GithubMarkdown projectName={ghUsername!} />
        </Content>
      </Body>
    </div>
  );
};

export default About;
