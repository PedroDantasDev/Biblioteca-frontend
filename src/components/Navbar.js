import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../imgs/logoelotech.png'; // Corrigido para subir um nível e acessar a pasta imgs

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo EloTech"
            width="40"
            height="40"
            className="d-inline-block align-top"
            style={{ marginRight: '10px' }}
          />
          Biblioteca EloTech
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/livros">Livros</Nav.Link>
            <Nav.Link as={Link} to="/usuarios">Usuários</Nav.Link>
            <Nav.Link as={Link} to="/emprestimos">Empréstimos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
