import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { livroService } from '../services/api';

function LivroForm({ livro, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    isbn: '',
    dataPublicacao: '',
    categoria: ''
  });

  useEffect(() => {
    if (livro) {
      setFormData(livro);
    }
  }, [livro]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dados a serem enviados:', formData);
    try {
      let response;
      if (livro) {
        response = await livroService.update(livro.id, formData);
      } else {
        response = await livroService.create(formData);
      }
      console.log('Resposta do servidor:', response.data);
      onSave(response.data);
    } catch (error) {
      console.error('Erro ao salvar livro:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Autor</Form.Label>
        <Form.Control type="text" name="autor" value={formData.autor} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>ISBN</Form.Label>
        <Form.Control type="text" name="isbn" value={formData.isbn} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Data de Publicação</Form.Label>
        <Form.Control type="date" name="dataPublicacao" value={formData.dataPublicacao} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Categoria</Form.Label>
        <Form.Control type="text" name="categoria" value={formData.categoria} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">Salvar</Button>
      <Button variant="secondary" onClick={onCancel} className="ms-2">Cancelar</Button>
    </Form>
  );
}

export default LivroForm;