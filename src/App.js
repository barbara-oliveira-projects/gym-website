import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Carousel } from 'react-bootstrap';
import LoginPage from '../src/components/LoginPage/LoginPage';
import RegisterPage from '../src/components/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Academia</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">Sobre</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contato</Nav.Link>
              <Nav.Link as={Link} to="/register">Registro</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

const Home = () => (
  <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://via.placeholder.com/800x400"
        alt="Primeiro slide"
      />
      <Carousel.Caption>
        <h3>Primeiro slide do carrossel</h3>
        <p>Alguma descrição aqui.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://via.placeholder.com/800x400"
        alt="Segundo slide"
      />
      <Carousel.Caption>
        <h3>Segundo slide do carrossel</h3>
        <p>Outra descrição aqui.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

export default App;
