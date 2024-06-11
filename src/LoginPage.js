import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from './aws';

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
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Seu email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" placeholder="Sua senha" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
