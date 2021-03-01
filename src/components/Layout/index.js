import { Container } from 'reactstrap';

const Layout = ({ children }) => {
  return (
    <Container className="themed-container" fluid={true}>{children}</Container>
  );
}

export default Layout;
