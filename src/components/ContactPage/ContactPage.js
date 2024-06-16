// src/components/ContactPage/ContactPage.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './ContactPage.css'; // Importar o CSS

const ContactPage = () => (
  <Container className="mt-4">
    <h2 className="contact-title">Entre em Contato</h2>
    <Row className="contact-options">
      <Col md={4} className="contact-item">
        <h3>WhatsApp</h3>
        <p>(11) 98765-4321</p>
      </Col>
      <Col md={4} className="contact-item">
        <h3>Instagram</h3>
        <p>@academia_fitness</p>
      </Col>
      <Col md={4} className="contact-item">
        <h3>Facebook</h3>
        <p>AcademiaFitness</p>
      </Col>
    </Row>
  </Container>
);

export default ContactPage;
