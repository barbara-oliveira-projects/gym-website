import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Carousel, Button } from 'react-bootstrap';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ContactPage from './components/ContactPage/ContactPage';
import AboutPage from './components/AboutPage/AboutPage';
import PlansPage from './components/PlansPage/PlansPage'; // Import the PlansPage component
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header/Header';
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
        <Header handleNavLinkClick={handleNavLinkClick} navbarRef={navbarRef} />
        <Container fluid className="p-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/plans" element={<PlansPage />} /> {/* Route for Plans */}
          </Routes>
        </Container>

        {/* Ícone do WhatsApp */}
        <div className="whatsapp-icon">
          <a href="https://api.whatsapp.com/send?phone=5519996391535" target="_blank" rel="noopener noreferrer">
            <img src="/images/whatsapp.png" alt="WhatsApp" />
          </a>
        </div>

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
        <h2 className="centered-title">Matrícula na Academia</h2>
        <p className="centered-text">Faça sua matrícula na Academia Fitness e comece a transformar sua vida hoje mesmo!</p>
        <div className="centered-button">
          <Button as={Link} to="/register" className="custom-button primary">MATRICULE-SE</Button>
        </div>
      </div>

      <hr className="styled-divider" />

      <div className="section">
        <h2 className="about-title">QUEM SOMOS</h2>
        <div className="about-content">
          <div>
            <p>A Academia Fitness foi fundada em 2005 com o objetivo de proporcionar um ambiente acolhedor e motivador para nossos alunos. Ao longo dos anos, nos especializamos em diversos tipos de treinamento, incluindo musculação, pilates, e aeróbica.</p>
            <p>Nossos professores são altamente qualificados e apaixonados por fitness. Cada um deles traz consigo uma vasta experiência em áreas como nutrição esportiva, fisioterapia e condicionamento físico.</p>
          </div>
        </div>
      </div>

      <hr className="styled-divider" />

      <div className="section">
        <h2 className="about-title">A EQUIPE</h2>
        <div className="about-content">
          <div>
            <p>A Academia Fitness foi fundada em 2005 com o objetivo de proporcionar um ambiente acolhedor e motivador para nossos alunos. Ao longo dos anos, nos especializamos em diversos tipos de treinamento, incluindo musculação, pilates, e aeróbica.</p>
            <p>Nossos professores são altamente qualificados e apaixonados por fitness. Cada um deles traz consigo uma vasta experiência em áreas como nutrição esportiva, fisioterapia e condicionamento físico.</p>
          </div>
        </div>
      </div>

      <hr className="styled-divider" />

      <div className="section">
        <h2 className="about-title">A ACADEMIA</h2>
        <div className="about-content">
          <div>
            <p>A Academia Fitness foi fundada em 2005 com o objetivo de proporcionar um ambiente acolhedor e motivador para nossos alunos. Ao longo dos anos, nos especializamos em diversos tipos de treinamento, incluindo musculação, pilates, e aeróbica.</p>
            <p>Nossos professores são altamente qualificados e apaixonados por fitness. Cada um deles traz consigo uma vasta experiência em áreas como nutrição esportiva, fisioterapia e condicionamento físico.</p>
          </div>
        </div>
      </div>

    </Container>
  </div>
);

export default App;
