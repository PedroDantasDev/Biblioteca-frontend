import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

const GOOGLE_BOOKS_API_KEY = 'AIzaSyAzNOI43JqvbjuThKVbBlmuzgYGHp0RF1g';

const livroService = {
  create: async (bookData) => {
    await axios.post('/api/livros', bookData);
  }
};

function GoogleBooksSearch() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const searchBooks = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${GOOGLE_BOOKS_API_KEY}`);
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  const addBookToLibrary = async (book) => {
    try {
      const bookData = {
        titulo: book.volumeInfo.title,
        autor: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Desconhecido',
        isbn: book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers[0].identifier : '',
        dataPublicacao: book.volumeInfo.publishedDate || '',
        categoria: book.volumeInfo.categories ? book.volumeInfo.categories[0] : 'Sem categoria'
      };
      await livroService.create(bookData);
      alert('Livro adicionado à biblioteca com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar livro à biblioteca:', error);
      alert('Erro ao adicionar livro à biblioteca.');
    }
  };

  return (
    <Container>
      <h2 className="mt-4 mb-3">Busca no Google Books</h2>
      <Form onSubmit={searchBooks}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Digite o título do livro"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="mt-2">Buscar</Button>
      </Form>
      <Row className="mt-4">
        {books.map((book) => (
          <Col key={book.id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{book.volumeInfo.title}</Card.Title>
                <Card.Text>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Autor desconhecido'}</Card.Text>
                <Button onClick={() => addBookToLibrary(book)}>Adicionar à Biblioteca</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default GoogleBooksSearch;
