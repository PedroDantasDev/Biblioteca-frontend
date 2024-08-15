import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { livroService } from '../services/api';

function RecomendacaoLivros({ usuarioId }) {
  const [recomendacoes, setRecomendacoes] = useState([]);

  useEffect(() => {
    const fetchRecomendacoes = async () => {
      try {
        const response = await livroService.getRecomendacoes(usuarioId);
        setRecomendacoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar recomendações:', error);
      }
    };

    fetchRecomendacoes();
  }, [usuarioId]);

  return (
    <Container>
      <h2 className="mt-4 mb-3">Recomendações de Livros</h2>
      <Row>
        {recomendacoes.map((livro) => (
          <Col key={livro.id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{livro.titulo}</Card.Title>
                <Card.Text>{livro.autor}</Card.Text>
                <Card.Text>Categoria: {livro.categoria}</Card.Text>
                <Button variant="primary">Ver Detalhes</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default RecomendacaoLivros;
