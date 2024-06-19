import React from 'react';
import { Container } from 'react-bootstrap';
import './PlansPage.css';
import '../../App.css'; // Importa o CSS principal para reutilizar os estilos

const PlansPage = () => {
    return (
        <div className="plans-background">
            <Container className="plans-page">
                <h2 className="plans-title">NOSSOS PLANOS</h2>
                <div className="plans-description">
                    <p>
                        Conheça nossos planos e valores, visite-nos para conhecer nossa estrutura e faça a sua matrícula na nossa recepção.
                        Será um prazer receber você. Bem vindo à família Itaigara Fitness!
                    </p>
                </div>
                <div className="plans-row">
                    <div className="plan-box">
                        <h3>Plano Mensal</h3>
                        <p>R$ 150,00 por mês</p>
                        <hr className="styled-divider-small" />
                        <div className="plan-description">
                            <ul>
                                <li>Horário livre;</li>
                                <li>Aulas coletivas inclusas;</li>
                                <li>Adesão - R$ 50,00.</li>
                            </ul>
                        </div>
                        <button className="custom-button primary">Quero Este!</button>
                    </div>

                    <div className="plan-box">
                        <h3>Plano Anual</h3>
                        <p>R$ 1500,00 por ano</p>
                        <hr className="styled-divider-small" />
                        <div className="plan-description">
                            <ul>
                                <li>Horário livre;</li>
                                <li>Aulas coletivas inclusas;</li>
                                <li>Acompanhante gratuito 2X por mês;</li>
                                <li>Adesão - R$ 50,00.</li>
                            </ul>
                        </div>
                        <button className="custom-button primary">Quero Este!</button>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default PlansPage;
