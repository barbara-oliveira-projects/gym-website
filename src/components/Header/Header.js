import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import './Header.css'; // Certifique-se de que este arquivo está importando corretamente o estilo CSS

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="custom-navbar bg-dark">
      <Container>
        <Link to="/" className="navbar-brand custom-navbar-brand">
          <img src="../images/logo-fitness.png" alt="Academia Fitness Logo" className="logo-img" />
        </Link>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto custom-nav">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/contact">Fale Conosco</Nav.Link>
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/register">Registro</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Header;
