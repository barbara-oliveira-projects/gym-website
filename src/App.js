import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Carousel, Form, FormControl, Button } from 'react-bootstrap';
import LoginPage from '../src/components/LoginPage/LoginPage';
import RegisterPage from '../src/components/RegisterPage/RegisterPage';
import ProfilePage from '../src/components/ProfilePage/ProfilePage';
import ContactPage from './components/ContactPage/ContactPage';
import AboutPage from './components/AboutPage/AboutPage';
import './App.css';

function App() {
  const navbarRef = useRef(null);

  const handleNavLinkClick = () => {
    if (navbarRef.current) {
      navbarRef.current.click();
    }
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
        <Container>
          <Link to="/" className="navbar-brand custom-navbar-brand">Academia</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" ref={navbarRef} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto custom-nav">
              <Nav.Link as={Link} to="/" onClick={handleNavLinkClick}>Home</Nav.Link>
              <Nav.Link as={Link} to="/about" onClick={handleNavLinkClick}>Sobre</Nav.Link>
              <Nav.Link as={Link} to="/contact" onClick={handleNavLinkClick}>Contato</Nav.Link>
              <Nav.Link as={Link} to="/register" onClick={handleNavLinkClick}>Registro</Nav.Link>
              <Nav.Link as={Link} to="/login" onClick={handleNavLinkClick}>Login</Nav.Link>
            </Nav>
            <Form className="d-flex custom-search-form">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

const Home = () => (
  <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100 carousel-img"
        src="/images/mulher-4.jpg"
        alt="Primeiro slide"
      />
      <Carousel.Caption>
        <h3>Primeiro slide do carrossel</h3>
        <p>Alguma descrição aqui.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100 carousel-img"
        src="/images/mulher-5.jpg"
        alt="Segundo slide"
      />
      <Carousel.Caption>
        <h3>Segundo slide do carrossel</h3>
        <p>Outra descrição aqui.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100 carousel-img"
        src="/images/mulher-6.jpg"
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
