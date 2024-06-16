import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import userPool from '../../services/aws';
import './RegisterPage.css';

const RegisterPage = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [showEmptyFieldsAlert, setShowEmptyFieldsAlert] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const navigate = useNavigate(); // Inicialize useNavigate

  const handleRegister = (e) => {
    e.preventDefault();

    if (!registerEmail || !registerPassword || !registerUsername) {
      setShowEmptyFieldsAlert(true);
      return;
    }

    if (!isPasswordValid) {
      return;
    }

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
      navigate('/profile'); // Redirecione para a página de perfil
    });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setIsPasswordValid(validatePassword(password));
    setRegisterPassword(password);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Registro</h2>
        <Form onSubmit={isConfirming ? handleConfirm : handleRegister}>
          {!isConfirming && (
            <>
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
                <Form.Control
                  type="password"
                  placeholder="Sua senha"
                  value={registerPassword}
                  onChange={handlePasswordChange}
                  className={!isPasswordValid ? 'is-invalid' : ''}
                />
                {!isPasswordValid && (
                  <Form.Text className="text-danger">
                    A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.
                  </Form.Text>
                )}
              </Form.Group>

              {showEmptyFieldsAlert && (
                <Alert variant="danger" className="custom-alert">
                  Preencha todos os campos antes de prosseguir.
                </Alert>
              )}
            </>
          )}

          {isConfirming && (
            <Form.Group controlId="formBasicConfirmationCode" className="form-group">
              <Form.Label className="form-label">Código de Confirmação</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o código de confirmação"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
              />
            </Form.Group>
          )}

          <Button
            variant="primary"
            type="submit"
            className={`custom-button ${!isPasswordValid && !isConfirming ? 'disabled' : ''}`}
            disabled={!isPasswordValid && !isConfirming}
          >
            {isConfirming ? 'Confirmar Conta' : 'Registrar'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
