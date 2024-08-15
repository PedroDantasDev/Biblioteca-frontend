import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container>
      <h1 className="mt-4 mb-4">Bem-vindo à Biblioteca EloTech</h1>
      <Row className="mb-4">
        <Col md={6}>
          <Button as={Link} to="/livros" variant="primary" block className="mb-2 w-100">
            Gerenciar Livros
          </Button>
        </Col>
        <Col md={6}>
          <Button as={Link} to="/usuarios" variant="secondary" block className="mb-2 w-100">
            Gerenciar Usuários
          </Button>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <Button as={Link} to="/emprestimos" variant="success" block className="mb-2 w-100">
            Gerenciar Empréstimos
          </Button>
        </Col>
        <Col md={6}>
          <Button as={Link} to="/recomendacoes/1" variant="info" block className="mb-2 w-100">
            Recomendações de Livros
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Button as={Link} to="/google-books" variant="warning" block className="mb-2 w-100">
            Buscar no Google Books
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;