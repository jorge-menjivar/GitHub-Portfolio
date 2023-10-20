import { ProjectsList } from './components/ProjectsList';

import { Navbar } from '../Common/Navbar';
import { Body, Content } from '../Common/Pages';
import { Title } from '../Common/Text';

export const Projects = () => {
  return (
    <div>
      <Navbar initialLocation="/projects" />
      <Body>
        <Title>Open-source Projects</Title>
        <Content>
          <ProjectsList />
        </Content>
      </Body>
    </div>
  );
};

export default Projects;
