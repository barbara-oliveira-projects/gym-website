import React, { useRef, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Carousel, Form, FormControl, Button } from 'react-bootstrap';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ContactPage from './components/ContactPage/ContactPage';
import AboutPage from './components/AboutPage/AboutPage';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import './App.css';

const App = () => {
  const navbarRef = useRef(null);

  const handleNavLinkClick = () => {
    if (navbarRef.current) {
      navbarRef.current.click();
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Navigation handleNavLinkClick={handleNavLinkClick} navbarRef={navbarRef} />
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
    </AuthProvider>
  );
};

const Home = () => (
  <div>
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
          alt="Terceiro slide"
        />
        <Carousel.Caption>
          <h3>Terceiro slide do carrossel</h3>
          <p>Mais uma descrição aqui.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    <Container className="mt-4">
      <div className="section">
        <h2>Matrícula na Academia</h2>
        <p>Faça sua matrícula na Academia Fitness e comece a transformar sua vida hoje mesmo!</p>
        <Button as={Link} to="/register" className="custom-button primary">Registrar-se</Button>
      </div>

      <div className="section">
        <h2>Vantagens de Praticar Exercícios</h2>
        <ul>
          <li>Melhora da saúde cardiovascular</li>
          <li>Aumento da resistência física</li>
          <li>Redução do estresse e ansiedade</li>
          <li>Melhora da autoestima e humor</li>
        </ul>
      </div>
    </Container>
  </div>
);

const Navigation = ({ handleNavLinkClick, navbarRef }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <Link to="/" className="navbar-brand custom-navbar-brand">Academia</Link>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" ref={navbarRef} />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto custom-nav">
            <Nav.Link as={Link} to="/" onClick={handleNavLinkClick}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={handleNavLinkClick}>Sobre</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={handleNavLinkClick}>Contato</Nav.Link>
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/register" onClick={handleNavLinkClick}>Registro</Nav.Link>
                <Nav.Link as={Link} to="/login" onClick={handleNavLinkClick}>Login</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            )}
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
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default App;
