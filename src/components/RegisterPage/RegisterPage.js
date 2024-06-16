import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import userPool from '../../services/aws';
import './RegisterPage.css'; // Importe o arquivo de estilos CSS

const RegisterPage = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: registerEmail }),
      new CognitoUserAttribute({ Name: 'preferred_username', Value: registerUsername })
    ];

    userPool.signUp(registerEmail, registerPassword, attributeList, null, (error, result) => {
      if (error) {
        console.error('Registration failed:', error);
        alert('Erro ao registrar: ' + error.message);
        return;
      }
      console.log('Registration successful:', result);
      alert('Registro realizado com sucesso! Por favor, verifique seu email para confirmar sua conta.');
      setIsConfirming(true);
    });
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const userData = {
      Username: registerEmail,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        console.error('Confirmation failed:', err);
        alert('Erro ao confirmar a conta: ' + err.message);
        return;
      }
      console.log('Confirmation successful:', result);
      alert('Conta confirmada com sucesso!');
      setIsConfirming(false);
    });
  };

  return (
    <div className="register-container"> {/* Container principal com fundo fosco */}
      <div className="register-form"> {/* Formulário centralizado */}
        <h2>Registro</h2>
        {!isConfirming ? (
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formBasicUsername" className="form-group">
              <Form.Label className="form-label">Nome</Form.Label>
              <Form.Control type="text" placeholder="Seu nome de usuário" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="form-group">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control type="email" placeholder="Seu email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="form-group">
              <Form.Label className="form-label">Senha</Form.Label>
              <Form.Control type="password" placeholder="Sua senha" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" className="custom-button">
              Registrar
            </Button>
          </Form>
        ) : (
          <Form onSubmit={handleConfirm}>
            <Form.Group controlId="formBasicConfirmationCode" className="form-group">
              <Form.Label className="form-label">Código de Confirmação</Form.Label>
              <Form.Control
                type="text"
                placeholder="Código de confirmação"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="custom-button">
              Confirmar Conta
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
