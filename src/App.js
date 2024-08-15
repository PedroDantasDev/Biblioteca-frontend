import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import GoogleBooksSearch from './components/GoogleBooksSearch';
import NavBar from './components/Navbar';
import RecomendacaoLivros from './components/RecomendacaoLivros';
import Home from './pages/Home';
import ListaEmprestimos from './pages/ListaEmprestimos';
import ListaLivros from './pages/ListaLivros';
import ListaUsuarios from './pages/ListaUsuarios';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/livros" element={<ListaLivros />} />
            <Route path="/usuarios" element={<ListaUsuarios />} />
            <Route path="/emprestimos" element={<ListaEmprestimos />} />
            <Route path="/recomendacoes/:usuarioId" element={<RecomendacaoLivros />} />
            <Route path="/google-books" element={<GoogleBooksSearch />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;