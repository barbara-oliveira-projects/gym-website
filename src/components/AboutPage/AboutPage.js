// src/components/AboutPage/AboutPage.js

import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './AboutPage.css'; // Importar o CSS

const AboutPage = () => (
  <Container className="mt-4">
    <h2 className="about-title">Sobre Nós</h2>
    <Row className="about-content">
      <Col md={6}>
        <Image src="/images/about-team.jpg" alt="Equipe da Academia" fluid className="about-image" />
      </Col>
      <Col md={6}>
        <p>A Academia Fitness foi fundada em 2005 com o objetivo de proporcionar um ambiente acolhedor e motivador para nossos alunos. Ao longo dos anos, nos especializamos em diversos tipos de treinamento, incluindo musculação, pilates, e aeróbica.</p>
        <p>Nossos professores são altamente qualificados e apaixonados por fitness. Cada um deles traz consigo uma vasta experiência em áreas como nutrição esportiva, fisioterapia e condicionamento físico.</p>
      </Col>
    </Row>

    <Row className="about-content">
      <Col md={6}>
        <p>Nosso compromisso é oferecer programas de treinamento personalizados para atender às necessidades individuais de cada aluno. Além disso, promovemos um ambiente inclusivo e amigável, onde todos se sintam bem-vindos e motivados a alcançar seus objetivos de saúde e bem-estar.</p>
        <p>Estamos constantemente evoluindo para oferecer as melhores práticas e tecnologias em fitness, garantindo que nossos alunos tenham acesso ao que há de mais atual no mundo do treinamento físico.</p>
      </Col>
      <Col md={6}>
        <Image src="/images/about-facilities.jpg" alt="Instalações da Academia" fluid className="about-image" />
      </Col>
    </Row>
  </Container>
);

export default AboutPage;
