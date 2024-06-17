import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { CognitoUser, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from '../../services/aws';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './RegisterPage.css';

const RegisterPage = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [showEmptyFieldsAlert, setShowEmptyFieldsAlert] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [userType, setUserType] = useState('Aluno');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!registerEmail || !registerPassword || !registerName) {
      setShowEmptyFieldsAlert(true);
      setErrorMessage('Preencha todos os campos antes de prosseguir.');
      return;
    }

    if (!isPasswordValid) {
      return;
    }

    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: registerEmail }),
      new CognitoUserAttribute({ Name: 'name', Value: registerName }),
      new CognitoUserAttribute({ Name: 'custom:user_type', Value: userType })
    ];

    userPool.signUp(registerEmail, registerPassword, attributeList, null, (error, result) => {
      if (error) {
        console.error('Registration failed:', error);
        setErrorMessage('Erro ao registrar: ' + error.message);
        return;
      }
      console.log('Registration successful:', result);
      setErrorMessage('Registro realizado com sucesso! Por favor, verifique seu email para confirmar sua conta.');
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
        setErrorMessage('Erro ao confirmar a conta: ' + err.message);
        return;
      }
      console.log('Confirmation successful:', result);
      setErrorMessage('Conta confirmada com sucesso!');

      // Login automático após confirmação
      const authenticationDetails = new AuthenticationDetails({
        Username: registerEmail,
        Password: registerPassword,
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log('Authentication successful:', result);
          login(); // Altera o estado de autenticação
          navigate('/profile'); // Redireciona para a página de perfil
        },
        onFailure: (error) => {
          console.error('Authentication failed:', error);
          setErrorMessage('Erro ao fazer login: ' + error.message);
        },
      });
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
        <h2>{isConfirming ? 'Confirmar Código' : 'Registro'}</h2>
        <Form onSubmit={isConfirming ? handleConfirm : handleRegister}>
          {!isConfirming ? (
            <>
              <Form.Group controlId="formBasicUsername" className="form-group">
                <Form.Label className="form-label">Nome</Form.Label>
                <Form.Control type="text" placeholder="Seu nome de usuário" value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
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

              <Form.Group controlId="formUserType" className="form-group">
                <Form.Label className="form-label">Tipo de Usuário</Form.Label>
                <Form.Control as="select" value={userType} onChange={(e) => setUserType(e.target.value)}>
                  <option value="Aluno">Aluno</option>
                  <option value="Professor">Professor</option>
                  <option value="Administrativo">Administrativo</option>
                </Form.Control>
              </Form.Group>

              {showEmptyFieldsAlert && (
                <Form.Text className="text-danger">
                  {errorMessage}
                </Form.Text>
              )}
            </>
          ) : (
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

          <Button variant="primary" type="submit" className={`custom-button ${!isPasswordValid && !isConfirming ? 'disabled' : ''}`} disabled={!isPasswordValid && !isConfirming}>
            {isConfirming ? 'Confirmar Conta' : 'Registrar'}
          </Button>
          {errorMessage && !isConfirming && (
            <Form.Text className="text-danger">
              {errorMessage}
            </Form.Text>
          )}
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
