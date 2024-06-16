import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from '../../services/aws';
import './LoginPage.css'; // Importe o arquivo de estilos CSS

const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const authenticationData = {
      Username: loginEmail,
      Password: loginPassword
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: loginEmail,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log('Authentication successful:', result);
        alert('Login realizado com sucesso!');
      },
      onFailure: (error) => {
        console.error('Authentication failed:', error);
        alert('Erro ao fazer login: ' + error.message);
      },
      newPasswordRequired: (userAttributes) => {
        console.log('New password required:', userAttributes);
      }
    });
  };

  return (
    <div className="login-container"> {/* Container principal com fundo fosco */}
      <Container className="login-form"> {/* Formulário centralizado */}
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail" className="form-group">
            <Form.Label className="form-label">Email</Form.Label>
            <Form.Control type="email" placeholder="Seu email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="form-group">
            <Form.Label className="form-label">Senha</Form.Label>
            <Form.Control type="password" placeholder="Sua senha" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" className="custom-button">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default LoginPage;
