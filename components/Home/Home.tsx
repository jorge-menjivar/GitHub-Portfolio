import { PostsList } from './components/PostsList';

import { Navbar } from '../Common/Navbar';
import { Body, Content } from '../Common/Pages';
import { Title } from '../Common/Text';

const Home = () => {
  return (
    <div>
      <Navbar initialLocation="/" />
      <Body>
        <Title>{"Jorge Menjivar's Space"}</Title>
        <Content>
          <PostsList />
        </Content>
      </Body>
    </div>
  );
};

export default Home;
