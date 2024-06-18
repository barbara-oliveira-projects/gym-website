import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Carousel, Button } from 'react-bootstrap';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ContactPage from './components/ContactPage/ContactPage';
import AboutPage from './components/AboutPage/AboutPage';
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
      
      <div className="section">
        <h2 className="about-title">Sobre Nós</h2>
        <div className="about-content">
          <div>
            <img src="/images/about-team.jpg" alt="Equipe da Academia" className="about-image" />
          </div>
          <div>
            <p>A Academia Fitness foi fundada em 2005 com o objetivo de proporcionar um ambiente acolhedor e motivador para nossos alunos. Ao longo dos anos, nos especializamos em diversos tipos de treinamento, incluindo musculação, pilates, e aeróbica.</p>
            <p>Nossos professores são altamente qualificados e apaixonados por fitness. Cada um deles traz consigo uma vasta experiência em áreas como nutrição esportiva, fisioterapia e condicionamento físico.</p>
          </div>
        </div>

        <div className="about-content">
          <div>
            <p>Nosso compromisso é oferecer programas de treinamento personalizados para atender às necessidades individuais de cada aluno. Além disso, promovemos um ambiente inclusivo e amigável, onde todos se sintam bem-vindos e motivados a alcançar seus objetivos de saúde e bem-estar.</p>
            <p>Estamos constantemente evoluindo para oferecer as melhores práticas e tecnologias em fitness, garantindo que nossos alunos tenham acesso ao que há de mais atual no mundo do treinamento físico.</p>
          </div>
          <div>
            <img src="/images/inside-gym.jpg" alt="Instalações da Academia" className="about-image" />
          </div>
        </div>
      </div>
    </Container>
  </div>
);

export default App;
