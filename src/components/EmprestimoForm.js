import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { emprestimoService, livroService, usuarioService } from '../services/api';

function EmprestimoForm({ emprestimo, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    livroId: '',
    usuarioId: '',
    dataEmprestimo: '',
    dataDevolucao: '',
    status: ''
  });
  const [livros, setLivros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    if (emprestimo) {
      setFormData({
        ...emprestimo,
        livroId: emprestimo.livro ? emprestimo.livro.id : '',
        usuarioId: emprestimo.usuario ? emprestimo.usuario.id : ''
      });
    }
    fetchLivros();
    fetchUsuarios();
  }, [emprestimo]);

  const fetchLivros = async () => {
    try {
      const response = await livroService.getAll();
      setLivros(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await usuarioService.getAll();
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emprestimoData = {
      livro: { id: parseInt(formData.livroId) },
      usuario: { id: parseInt(formData.usuarioId) },
      dataEmprestimo: formData.dataEmprestimo,
      dataDevolucao: formData.dataDevolucao,
      status: formData.status
    };
    console.log('Dados do empréstimo a serem enviados:', JSON.stringify(emprestimoData, null, 2));
    try {
      const response = await emprestimoService.create(emprestimoData);
      console.log('Resposta do servidor após criar empréstimo:', response.data);
      onSave(response.data);
    } catch (error) {
      console.error('Erro ao salvar empréstimo:', error);
      if (error.response) {
        console.error('Resposta de erro do servidor:', error.response.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Livro</Form.Label>
        <Form.Select name="livroId" value={formData.livroId} onChange={handleChange} required>
          <option value="">Selecione um livro</option>
          {livros.map((livro) => (
            <option key={livro.id} value={livro.id}>{livro.titulo}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Usuário</Form.Label>
        <Form.Select name="usuarioId" value={formData.usuarioId} onChange={handleChange} required>
          <option value="">Selecione um usuário</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Data de Empréstimo</Form.Label>
        <Form.Control type="date" name="dataEmprestimo" value={formData.dataEmprestimo} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Data de Devolução</Form.Label>
        <Form.Control type="date" name="dataDevolucao" value={formData.dataDevolucao} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select name="status" value={formData.status} onChange={handleChange} required>
          <option value="">Selecione o status</option>
          <option value="PENDENTE">Pendente</option>
          <option value="DEVOLVIDO">Devolvido</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">Salvar</Button>
      <Button variant="secondary" onClick={onCancel} className="ms-2">Cancelar</Button>
    </Form>
  );
}

export default EmprestimoForm;