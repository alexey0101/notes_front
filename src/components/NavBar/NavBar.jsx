import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { logout } from '../../api/notesApi';

const NavBar = ({authorized}) => {

  const onLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Simple Note</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            {authorized && <Nav.Link onClick={onLogout}>Выйти</Nav.Link>}
            {!authorized && <Nav.Link href="/signin">Войти</Nav.Link>}
            {!authorized && <Nav.Link href="/signup">Регистрация</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;