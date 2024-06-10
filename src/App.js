import React, { useState } from 'react';
import { Navbar, Nav, Container, Modal, Button, Form, Carousel } from 'react-bootstrap';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Academia</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">Sobre</Nav.Link>
              <Nav.Link href="#contact">Contato</Nav.Link>
              <Nav.Link onClick={handleShowRegister}>Registro</Nav.Link>
              <Nav.Link onClick={handleShowLogin}>Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Primeiro Slide</h3>
              <p>Descrição do primeiro slide.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Segundo Slide</h3>
              <p>Descrição do segundo slide.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Terceiro Slide</h3>
              <p>Descrição do terceiro slide.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <section id="about" className="my-5">
          <h2>Sobre Nós</h2>
          <p>Aqui vai um texto explicativo sobre a academia.</p>
        </section>

        <section id="contact" className="my-5">
          <h2>Contato</h2>
          <p>Aqui vão as informações de contato.</p>
        </section>
      </Container>

      {/* Modal de Login */}
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de Registro */}
      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Digite seu nome" />
            </Form.Group>

            <Form.Group controlId="formLastName" className="mb-3">
              <Form.Label>Sobrenome</Form.Label>
              <Form.Control type="text" placeholder="Digite seu sobrenome" />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Digite seu email" />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Digite sua senha" />
            </Form.Group>

            <Form.Group controlId="formUserType" className="mb-3">
              <Form.Label>Tipo de Usuário</Form.Label>
              <Form.Control as="select">
                <option>Aluno</option>
                <option>Professor</option>
                <option>Administrativo</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Registrar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
