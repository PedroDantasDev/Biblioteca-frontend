import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal, Table } from 'react-bootstrap';
import EmprestimoForm from '../components/EmprestimoForm';
import { emprestimoService } from '../services/api';

function ListaEmprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmprestimo, setSelectedEmprestimo] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchEmprestimos();
  }, []);

  const fetchEmprestimos = async () => {
    try {
      const response = await emprestimoService.getAll();
      console.log('Empréstimos recebidos:', response.data);
      setEmprestimos(response.data);
    } catch (error) {
      console.error('Erro ao buscar empréstimos:', error);
      setAlert({ type: 'danger', message: 'Erro ao carregar empréstimos. Por favor, tente novamente.' });
    }
  };

  const handleCreate = () => {
    setSelectedEmprestimo(null);
    setShowModal(true);
  };

  const handleEdit = (emprestimo) => {
    setSelectedEmprestimo(emprestimo);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este empréstimo?')) {
      try {
        await emprestimoService.delete(id);
        fetchEmprestimos();
        setAlert({ type: 'success', message: 'Empréstimo deletado com sucesso!' });
      } catch (error) {
        console.error('Erro ao deletar empréstimo:', error);
        setAlert({ type: 'danger', message: 'Erro ao deletar empréstimo. Por favor, tente novamente.' });
      }
    }
  };

  const handleSave = async (savedEmprestimo) => {
    setShowModal(false);
    await fetchEmprestimos();
    setAlert({ type: 'success', message: 'Empréstimo salvo com sucesso!' });
  };

  return (
    <div>
      <h2>Lista de Empréstimos</h2>
      {alert && (
        <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}
      <Button variant="primary" onClick={handleCreate} className="mb-3">Adicionar Empréstimo</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Livro</th>
            <th>Usuário</th>
            <th>Data de Empréstimo</th>
            <th>Data de Devolução</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map((emprestimo) => (
            <tr key={emprestimo.id}>
              <td>{emprestimo.livro ? emprestimo.livro.titulo : 'N/A'}</td>
              <td>{emprestimo.usuario ? emprestimo.usuario.nome : 'N/A'}</td>
              <td>{emprestimo.dataEmprestimo}</td>
              <td>{emprestimo.dataDevolucao}</td>
              <td>{emprestimo.status}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleEdit(emprestimo)} className="me-2">Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(emprestimo.id)}>Deletar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEmprestimo ? 'Editar Empréstimo' : 'Adicionar Empréstimo'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmprestimoForm
            emprestimo={selectedEmprestimo}
            onSave={handleSave}
            onCancel={() => setShowModal(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ListaEmprestimos;