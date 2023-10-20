import { PostsList } from './components/PostsList';

import { Navbar } from '../Common/Navbar';
import { Body, Content } from '../Common/Pages';
import { Title } from '../Common/Text';

const Home = () => {
  return (
    <div className="flex min-h-full">
      <Navbar initialLocation="/" />
      <Body>
        <Title>{process.env.NEXT_PUBLIC_HOME_TITLE}</Title>
        <Content>
          <PostsList />
        </Content>
      </Body>
    </div>
  );
};

export default Home;
