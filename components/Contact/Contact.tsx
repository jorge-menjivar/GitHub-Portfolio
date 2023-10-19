import { Navbar } from '../Common/Navbar';
import { Body, Content } from '../Common/Pages';
import { Title } from '../Common/Text';

export const Contact = () => {
  return (
    <div>
      <Navbar initialLocation="/contact" />

      <Body>
        <Title>Contact</Title>
        <Content></Content>
      </Body>
    </div>
  );
};

export default Contact;
