import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal, Table } from 'react-bootstrap';
import LivroForm from '../components/LivroForm';
import { livroService } from '../services/api';

function ListaLivros() {
  const [livros, setLivros] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLivro, setSelectedLivro] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchLivros();
  }, []);

  const fetchLivros = async () => {
    try {
      const response = await livroService.getAll();
      setLivros(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      setAlert({ type: 'danger', message: 'Erro ao carregar livros. Por favor, tente novamente.' });
    }
  };

  const handleCreate = () => {
    setSelectedLivro(null);
    setShowModal(true);
  };

  const handleEdit = (livro) => {
    setSelectedLivro(livro);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este livro?')) {
      try {
        await livroService.delete(id);
        fetchLivros();
        setAlert({ type: 'success', message: 'Livro deletado com sucesso!' });
      } catch (error) {
        console.error('Erro ao deletar livro:', error);
        setAlert({ type: 'danger', message: 'Erro ao deletar livro. Por favor, tente novamente.' });
      }
    }
  };

  const handleSave = async (savedLivro) => {
    setShowModal(false);
    await fetchLivros();
    setAlert({ type: 'success', message: 'Livro salvo com sucesso!' });
  };

  return (
    <div>
      <h2>Lista de Livros</h2>
      {alert && (
        <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}
      <Button variant="primary" onClick={handleCreate} className="mb-3">Adicionar Livro</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>ISBN</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <tr key={livro.id}>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.isbn}</td>
              <td>{livro.categoria}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleEdit(livro)} className="me-2">Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(livro.id)}>Deletar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedLivro ? 'Editar Livro' : 'Adicionar Livro'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LivroForm
            livro={selectedLivro}
            onSave={handleSave}
            onCancel={() => setShowModal(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ListaLivros;