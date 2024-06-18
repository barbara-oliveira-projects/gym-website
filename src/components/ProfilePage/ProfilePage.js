import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'; // Adicionei esta linha
import userPool from '../../services/aws';
import { AuthContext } from '../../contexts/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = () => {
      const user = userPool.getCurrentUser();

      if (user) {
        user.getSession((err, session) => {
          if (err) {
            console.error('Error getting session:', err);
            return;
          }

          user.getUserAttributes((err, attributes) => {
            if (err) {
              console.error('Error getting user attributes:', err);
              return;
            }

            const data = {};
            attributes.forEach(attribute => {
              data[attribute.Name] = attribute.Value;
            });

            setUserData(data);
            login(); // Alterar o estado de autenticação
          });
        });
      }
    };

    fetchUserData();
  }, [login]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const user = userPool.getCurrentUser();
    const attributeList = [];

    for (let key in userData) {
      attributeList.push(new CognitoUserAttribute({ Name: key, Value: userData[key] }));
    }

    user.updateAttributes(attributeList, (err, result) => {
      if (err) {
        console.error('Error updating attributes:', err);
        return;
      }
      console.log('Attributes updated successfully:', result);
      setIsEditing(false);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  return (
    <Container className="profile-page">
      <Row className="justify-content-md-center">
        <Col md="6">
          <Card className="profile-card">
            <Card.Body>
              <Card.Title>Perfil do Usuário</Card.Title>
              {userData['custom:profile_picture'] && (
                <Image src={userData['custom:profile_picture']} roundedCircle className="profile-picture" />
              )}
              {!isEditing ? (
                <>
                  <Card.Text>
                    <strong>Nome:</strong> {userData.name || 'N/A'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Email:</strong> {userData.email || 'N/A'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Data de Entrada:</strong> {userData.joined || 'N/A'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Tipo de Usuário:</strong> {userData['custom:user_type'] || 'N/A'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Telefone:</strong> {userData.phone_number || 'N/A'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Endereço:</strong> {userData.address || 'N/A'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Gênero:</strong> {userData.gender || 'N/A'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Data de Nascimento:</strong> {userData.birthdate || 'N/A'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Último Login:</strong> {userData['custom:last_login'] || 'N/A'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Biografia:</strong> {userData['custom:bio'] || 'N/A'}
                  </Card.Text>
                  <Button variant="primary" onClick={handleEdit}>Editar</Button>
                </>
              ) : (
                <Form onSubmit={handleSave}>
                  <Form.Group controlId="formName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" name="name" value={userData.name} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="formUserType">
                    <Form.Label>Tipo de Usuário</Form.Label>
                    <Form.Control as="select" name="custom:user_type" value={userData['custom:user_type']} onChange={handleChange}>
                      <option value="Aluno">Aluno</option>
                      <option value="Professor">Professor</option>
                      <option value="Administrativo">Administrativo</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formPhoneNumber">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="text" name="phone_number" value={userData.phone_number} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="formAddress">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control type="text" name="address" value={userData.address} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="formGender">
                    <Form.Label>Gênero</Form.Label>
                    <Form.Control type="text" name="gender" value={userData.gender} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="formBirthdate">
                    <Form.Label>Data de Nascimento</Form.Label>
                    <Form.Control type="date" name="birthdate" value={userData.birthdate} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="formBio">
                    <Form.Label>Biografia</Form.Label>
                    <Form.Control as="textarea" name="custom:bio" value={userData['custom:bio']} onChange={handleChange} />
                  </Form.Group>
                  <Button variant="primary" type="submit">Salvar</Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancelar</Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
