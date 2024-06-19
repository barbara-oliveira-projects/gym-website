import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setExpanded(false); // Fechar o menu após logout
    };

    const handleLinkClick = () => {
        setExpanded(false); // Fechar o menu após clicar em um link
    };

    return (
        <BootstrapNavbar
            bg="dark"
            variant="dark"
            expand="lg"
            className="custom-navbar navbar-dark"
            expanded={expanded}
        >
            <Container>
                <Link to="/" className="navbar-brand custom-navbar-brand">
                    <img src="../images/logo-fitness.png" alt="Academia Fitness Logo" className="logo-img" />
                </Link>
                <BootstrapNavbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(expanded ? false : true)}
                />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto custom-nav navbar-nav">
                        <Nav.Link as={Link} to="/" onClick={handleLinkClick}>Home</Nav.Link>
                        <span className="pipe-divider">|</span>
                        <Nav.Link as={Link} to="/contact" onClick={handleLinkClick}>Fale Conosco</Nav.Link>
                        {!isAuthenticated ? (
                            <>
                                {/* Removendo a opção de registro */}
                                {/* <span className="pipe-divider">|</span> */}
                                {/* <Nav.Link as={Link} to="/register" onClick={handleLinkClick}>Registro</Nav.Link> */}
                                <span className="pipe-divider">|</span>
                                <Nav.Link as={Link} to="/login" onClick={handleLinkClick}>Login</Nav.Link>
                            </>
                        ) : (
                            <>
                                <span className="pipe-divider">|</span>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        )}
                        {/* Novo link para "Plans" */}
                        <span className="pipe-divider">|</span>
                        <Nav.Link as={Link} to="/plans" onClick={handleLinkClick}>Planos</Nav.Link>
                    </Nav>
                    <Button className="close-btn d-block d-lg-none" onClick={() => setExpanded(false)}>
                        &times;
                    </Button>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Header;
