import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { usuarioService } from '../services/api';

function UsuarioForm({ usuario, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: ''
  });

  useEffect(() => {
    if (usuario) {
      setFormData(usuario);
    }
  }, [usuario]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dados a serem enviados:', formData);
    try {
      let response;
      if (usuario) {
        response = await usuarioService.update(usuario.id, formData);
      } else {
        response = await usuarioService.create(formData);
      }
      console.log('Resposta do servidor:', response.data);
      onSave(response.data);
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" name="nome" value={formData.nome} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Telefone</Form.Label>
        <Form.Control type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Data de Cadastro</Form.Label>
        <Form.Control type="date" name="dataCadastro" value={formData.dataCadastro} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">Salvar</Button>
      <Button variant="secondary" onClick={onCancel} className="ms-2">Cancelar</Button>
    </Form>
  );
}

export default UsuarioForm;