import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal, Table } from 'react-bootstrap';
import UsuarioForm from '../components/UsuarioForm';
import { usuarioService } from '../services/api';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await usuarioService.getAll();
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setAlert({ type: 'danger', message: 'Erro ao carregar usuários. Por favor, tente novamente.' });
    }
  };

  const handleCreate = () => {
    setSelectedUsuario(null);
    setShowModal(true);
  };

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      try {
        await usuarioService.delete(id);
        fetchUsuarios();
        setAlert({ type: 'success', message: 'Usuário deletado com sucesso!' });
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        setAlert({ type: 'danger', message: 'Erro ao deletar usuário. Por favor, tente novamente.' });
      }
    }
  };

  const handleSave = async (savedUsuario) => {
    setShowModal(false);
    await fetchUsuarios();
    setAlert({ type: 'success', message: 'Usuário salvo com sucesso!' });
  };

  return (
    <div>
      <h2>Lista de Usuários</h2>
      {alert && (
        <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}
      <Button variant="primary" onClick={handleCreate} className="mb-3">Adicionar Usuário</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Data de Cadastro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.telefone}</td>
              <td>{usuario.dataCadastro}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleEdit(usuario)} className="me-2">Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(usuario.id)}>Deletar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUsuario ? 'Editar Usuário' : 'Adicionar Usuário'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UsuarioForm
            usuario={selectedUsuario}
            onSave={handleSave}
            onCancel={() => setShowModal(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ListaUsuarios;